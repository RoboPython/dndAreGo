module.exports = function(io) {
    var app = require('express');
    var router = app.Router();

    io.on('connection', function(socket) { 
		console.log("boooop")
    });

	router.get('/', function(req, res, next) {
	  res.render('index');
	});


    return router;
}

