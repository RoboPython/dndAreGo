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
console.log("random")

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



// socket.io events
app.io.on( "connection", function( socket )
{
	console.log("new player joined")
	socket.on('updatePosition', (path) => {
		console.log('path:',path);
		io.emit('newPath',{'path':path})
	});

});


module.exports = app;
