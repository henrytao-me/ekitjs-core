/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path');

var app = express();
var server = null;

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

server = http.createServer(app);

app.get('/', function(req, res, next) {
	res.json({
		status: 'ok'
	});
});

app.startServer = function(done){
	server.listen(app.get('port'), function() {
		// console.log('Test server listening on port ' + app.get('port'));
		done();
	});
};

app.stopServer = function(done){
	server.close();
	done();
};

app.url = function(url){
	return 'http://127.0.0.1:' + app.get('port') + '/' + (url || '');
}

module.exports = app;



