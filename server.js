var express = require('express')
var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var sioufu = require('socketio-file-upload');
app.use(sioufu.router).use(express.static(__dirname+'/public/'))



io.on('connection', function(socket){
  console.log("Abierta conexion")  
  var uploader = new sioufu();
  uploader.dir = "./public/files";

  uploader.on("complete",function(e){
    console.log("Envia archivo "+e.file.name)
    io.emit('archivo',e)
  })
  uploader.listen(socket)

  

  socket.on('usuario', function(usuario){
        console.log('a user connected');
        io.emit('conectado', usuario);

         if (usuario != ''){
            socket.on('chat', function(msg){
                console.log('message: ' + msg);
                var datos = {
                    autor: usuario, 
                    mensajes: msg,
                    id: usuario
                  
                };

                io.emit('chat', datos, usuario);

            });
            socket.on('disconnect', function(){
              console.log("Desconectado"+usuario);  
                io.emit('disconnect',usuario)
          });
        }

    });


    socket.on('escribiendo', function(usuario){
      console.log("escribiendo");
      io.emit("estaescribiendo",usuario)
    });

    socket.on('noescribiendo', function(usuario){
      console.log("noescribiendo");
      io.emit("noestaescribiendo",usuario)
    });

});

/* SUBIDA ARCHIVOS */




http.listen(3000, function(){
  console.log('listening on *:3000');
});