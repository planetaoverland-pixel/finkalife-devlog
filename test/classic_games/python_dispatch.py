import json,io,time,sys,os
os.chdir('/game');sys.path.insert(0,'/game')
import servidor
if GAME=='poker':
 def programar(self):
  if self._closed or self.modo!='ia' or self.m.turno in (None,0) or self.ai_job or self.ai_error:return
  self.ai_job=(self.epoca,self.m.revision,self.m.turno);self._due=time.monotonic()+self.pausa
 servidor.Sesion._programar=programar
 session=servidor.Sesion(modo='ia')

def dispatch(raw):
 request=json.loads(raw);path=request['path'];body=request.get('body');method=request.get('method','GET')
 try:
  if GAME=='poker':
   if session.ai_job and time.monotonic()>=session._due:session._ejecutar(session.ai_job)
   if path.startswith('/estado') and method=='GET':data=session.vista()
   elif path=='/accion' and method=='POST':data=session.accion(json.loads(body))
   else:raise ValueError('RUTA_INVALIDA')
   return json.dumps({'status':200,'data':data})
  class Request:
   def __init__(self):
    self.path=path;payload=(body or '').encode();self.rfile=io.BytesIO(payload);self.headers={'Content-Length':str(len(payload))};self.result=None
   def responder(self,data,status=200):self.result={'status':status,'data':data}
  obj=Request()
  if path.startswith('/estado') and method=='GET':servidor.H.do_GET(obj)
  elif path=='/accion' and method=='POST':servidor.H.do_POST(obj)
  else:raise ValueError('RUTA_INVALIDA')
  return json.dumps(obj.result)
 except Exception as error:return json.dumps({'status':400,'data':{'error':str(error)}})
