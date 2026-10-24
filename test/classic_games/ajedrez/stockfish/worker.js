// Adaptador de errores; el motor Stockfish se conserva sin cambios.
function falloMotor(event){event.preventDefault();postMessage({errorMotor:'IA_FALLO'});}
self.addEventListener('unhandledrejection',falloMotor);
self.addEventListener('error',falloMotor);
try{importScripts('stockfish-19-lite-single.js')}catch(e){postMessage({errorMotor:'IA_FALLO'})}
