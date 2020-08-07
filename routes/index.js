module.exports = function(io) {
    var app = require('express');
    var router = app.Router();

    io.on('connection', function(socket) { 
    });

	router.get('/', function(req, res, next) {
	  res.render('index');
	});


    return router;
}

