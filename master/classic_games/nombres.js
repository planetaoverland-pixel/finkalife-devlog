/* Nombres de los rivales por idioma (copia de datos/nombres_rivales.json; Chris 5 nov). Elegidos al azar por sesión. */
window.FINKA_NOMBRES={"es": ["Lucía", "Marcos", "Carmen", "Pablo", "Elena", "Sergio", "Nuria", "Javier", "Laura", "Andrés", "Rosa", "Miguel", "Pilar", "Vicente", "Amparo", "Toni"], "pl": ["Zofia", "Kuba", "Ola", "Bartek", "Kasia", "Wojtek", "Magda", "Piotr", "Ania", "Tomek", "Ewa", "Michał", "Gosia", "Paweł", "Basia", "Marek"], "en": ["Olivia", "Jack", "Emily", "Harry", "Sophie", "George", "Amelia", "Oliver", "Grace", "Thomas", "Lily", "James", "Ella", "William", "Chloe", "Henry"]};
window.finkaRivales=function(lang,n){const L=(window.FINKA_NOMBRES[lang]||window.FINKA_NOMBRES.es).slice();let semilla=null;try{semilla=sessionStorage.getItem('finkaRivales_'+lang)}catch(e){}
let orden;try{orden=semilla?JSON.parse(semilla):null}catch(e){orden=null}
if(!orden||orden.length!==L.length){orden=L.map((_,i)=>i);for(let i=orden.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[orden[i],orden[j]]=[orden[j],orden[i]]}try{sessionStorage.setItem('finkaRivales_'+lang,JSON.stringify(orden))}catch(e){}}
return orden.slice(0,n).map(i=>L[i])};
