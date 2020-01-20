let express = require('express');
let app = express();
let socket=require('socket.io')
let server = app.listen(3000, function(){
	console.log ('Server listening on 3000')
});

let io = require('socket.io').listen(server);
connections = [];


app.use(express.static('public'));

io.sockets.on('connection', function(socket){

	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);


	socket.on('disconnect', function(data){
	connections.splice(connections.indexOf(socket), 1);
	console.log('Disconnected! %s sockets connected', connections.length);


	});

	socket.on('chat', function(data){
		io.sockets.emit('chat',  data)
	});
	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});
	
});


//io.on('connection', function(socket){
//	console.log('made socket connection',socket.id);
//	socket.on('chat', function(data){
//		io.sockets.emit('chat', data);
//
//	});
//
//	socket.on('typing', function(data){
//		socket.broadcast.emit('typing', data);
//	});
//});