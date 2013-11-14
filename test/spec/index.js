// get express app
var app = require('../lib/app.js');

// require ekitjs-core
require('../../index.js')(app);

// require test library
var should = require('should');
var superagent = require('superagent');

////////////////////////////////////////
// 
describe('', function() {

	before(function(done){
		app.startServer(done);
	});

	after(function(done){
		app.stopServer(done);
	});

	describe('Server', function() {
		it('should run on port ' + app.get('port'), function(done) {
			var agent = superagent.agent();
			agent.get(app.url()).end(function(err, res){
				res.should.have.status(200);
				res.body.should.be.an.instanceOf(Object).and.have.property('status', 'ok');
				done();
			});
		});
	});
});