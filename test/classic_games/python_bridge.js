/* Adapter for original UI fetch calls, entirely local to this iframe. */
(()=>{
 const game=location.pathname.includes('/poker/')?'poker':'tysiac';
 const original=window.fetch.bind(window),worker=new Worker('../python_worker.js');
 let seq=0,closed=false;const waiting=new Map();
 const rpc=m=>new Promise((resolve,reject)=>{if(closed)return reject(Error('CLOSED'));const id=++seq;waiting.set(id,{resolve,reject});worker.postMessage({...m,id});});
 worker.onmessage=({data:m})=>{const p=waiting.get(m.id);if(!p)return;waiting.delete(m.id);m.error?p.reject(Error(m.error)):p.resolve(m.result);};
 worker.onerror=e=>{for(const p of waiting.values())p.reject(Error(e.message));waiting.clear();};
 const ready=rpc({init:game});
 window.fetch=async(input,options={})=>{
  const url=new URL(typeof input==='string'?input:input.url,location.href);
  if(url.origin===location.origin&&['/estado','/accion'].includes(url.pathname)){
   await ready;const result=await rpc({request:{path:url.pathname+url.search,method:options.method||'GET',body:options.body||null}});
   return new Response(JSON.stringify(result.data),{status:result.status,headers:{'Content-Type':'application/json'}});
  }
  return original(input,options);
 };
 window.classicShutdown=()=>{closed=true;worker.terminate();for(const p of waiting.values())p.reject(Error('CLOSED'));waiting.clear();};window.addEventListener('pagehide',window.classicShutdown);
})();
