/* Embedded TEST minigames. Same-origin packaged resources, no external window/server. */
(()=>{if(window.finkaClassic)return;let active=null;
function close(notify=true){if(!active)return;const old=active;active=null;try{old.frame.contentWindow.classicShutdown?.();old.frame.contentWindow.dispatchEvent(new Event('pagehide'));}catch{}old.root.remove();document.querySelector('canvas')?.focus();if(notify)old.done('closed');}
window.finkaClassic={close,open(game,lang,done){
if(!['tysiac','poker','ajedrez'].includes(game)){done('invalid');return;}close(false);
const root=document.createElement('section');root.id='finka-classic-session';root.style='position:fixed;inset:0;z-index:2147483000;background:#38241d;display:flex;flex-direction:column';
const bar=document.createElement('div');bar.style='display:flex;align-items:center;justify-content:space-between;padding:8px;background:#e8c68c;color:#392419;font:700 16px sans-serif';
const title=document.createElement('span');title.textContent='Classic Games · '+({tysiac:'Tysiąc',poker:'Texas Hold’em',ajedrez:lang==='pl'?'Szachy':'Ajedrez'})[game];bar.append(title);
const exit=document.createElement('button');exit.textContent=lang==='pl'?'Wróć do Classic Games':'Volver a Classic Games';exit.style='min-height:40px;font:inherit';exit.onclick=()=>{if(confirm(lang==='pl'?'Wyjść? Ta gra nie zostanie zapisana.':'¿Salir? Esta partida no se guardará.'))close();};bar.append(exit);root.append(bar);
const frame=document.createElement('iframe');frame.title=title.textContent;frame.style='width:100%;flex:1;border:0;background:#38241d';frame.setAttribute('sandbox','allow-scripts allow-same-origin');frame.src=new URL('classic_games/'+game+'/index.html?lang='+(lang==='pl'?'pl':'es'),document.baseURI).href;root.append(frame);document.body.append(root);active={root,frame,done};frame.focus();
}};window.addEventListener('pagehide',()=>close(false));})();
