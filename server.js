var express = require('express')
var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var sioufu = require('socketio-file-upload');
app.use(sioufu.router).use(express.static(__dirname+'/public/'))



io.on('connection', function(socket){
  var uploader = new sioufu();
  uploader.dir = "./public/files";

  uploader.on("complete",function(e){
    io.emit('archivo',e)
  })
  uploader.listen(socket)

  

  socket.on('usuario', function(usuario){
        io.emit('conectado', usuario);

         if (usuario != ''){
            socket.on('chat', function(msg){
                var datos = {
                    autor: usuario, 
                    mensajes: msg,
                    id: usuario
                  
                };

                io.emit('chat', datos, usuario);

            });
            socket.on('disconnect', function(){
                io.emit('disconnect',usuario)
          });
        }

    });


    socket.on('escribiendo', function(usuario){
      io.emit("estaescribiendo",usuario)
    });

    socket.on('noescribiendo', function(usuario){
      io.emit("noestaescribiendo",usuario)
    });

});

/* SUBIDA ARCHIVOS */




http.listen(3000, function(){
  console.log('listening on *:3000');
});