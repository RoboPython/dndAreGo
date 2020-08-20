var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var socket_io = require("socket.io");



var app = express();

var io           = socket_io();
app.io           = io;




var indexRouter = require('./routes/index')(app.io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function Room(name) {
	this.name = name
	this.positions = {}
}





// socket.io events
rooms = {};

app.io.on( "connection", function( socket )
{
	var roomCode = 0;

	socket.on('createRoom', () => {
		randomCode = Math.floor(Math.random() * 1000) + 1;
		roomCode = randomCode;
		//rooms[roomCode] = {"id":{"x":10,"y":11}}
		rooms[roomCode] = {}

		console.log(rooms);
		socket.leave('waitingRoom');
		socket.emit('roomCode',{'roomCode':randomCode})
		socket.join(randomCode,function(){
			io.to(randomCode).emit('join',{})
		})

	});

	socket.on('joinRoom', (value) => {
		roomCode = value
		socket.join(roomCode, function(){
			io.to(roomCode).emit('join',rooms[roomCode])
		});

	})


	socket.on('updatePosition', (path,playerId) => {
				
		x = path[path.length-1][0]
		y = path[path.length-1][1]
		
		if (playerId in rooms[roomCode]){
			rooms[roomCode][playerId]["x"] = x
			rooms[roomCode][playerId]["y"] = y
		}else{
			rooms[roomCode][playerId] = {}
			rooms[roomCode][playerId]["x"] = x
			rooms[roomCode][playerId]["y"] = y
		}
		console.log(rooms);
		io.to(roomCode).emit('newPath',{'path':path,"playerId":playerId})
	});

});


module.exports = app;
