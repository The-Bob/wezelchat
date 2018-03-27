const express = require('express');
var app = express();
var serv = require('http').Server(app);
var port = process.env.PORT || 8080

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(port);
console.log("Server started");

var io = require('socket.io')(serv, {});

var socketList = new Map();

io.sockets.on('connection', (socket) => {
   console.log("YOU HAVE A USER!!!!!! \n\n\nNow that I think of it, it's probably you...\n");

   socket.id = Math.random();
   socketList.set(socket.id, null);

   socket.on('nameSubmit', (data) =>{
      socketList.set(socket.id, data);
      console.log(socketList.get(socket.id));
   });
});
