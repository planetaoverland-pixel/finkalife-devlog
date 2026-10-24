/* Python/WASM inside TEST; no HTTP server, no external service. */
importScripts('runtime/pyodide.js');
let py, queue=Promise.resolve();
async function init(game){
 if(!['tysiac','poker'].includes(game))throw Error('GAME_INVALID');
 py=await loadPyodide({indexURL:new URL('runtime/',self.location).href});
 const bundle=await(await fetch(game+'/python_bundle.json')).json();
 for(const [path,b64]of Object.entries(bundle)){
  py.FS.mkdirTree(path.slice(0,path.lastIndexOf('/')));
  py.FS.writeFile(path,Uint8Array.from(atob(b64),c=>c.charCodeAt(0)));
 }
 py.globals.set('GAME',game);
 py.runPython(await(await fetch('python_dispatch.py')).text());
}
self.onmessage=({data:m})=>{queue=queue.then(async()=>{
 try{if(m.init){await init(m.init);postMessage({id:m.id,result:{status:200,data:{ready:true}}});}
 else{py.globals.set('_request',JSON.stringify(m.request));const result=JSON.parse(py.runPython('dispatch(_request)'));postMessage({id:m.id,result});}}
 catch(e){postMessage({id:m.id,error:String(e)});}
});};
