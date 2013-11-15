// get express app
var app = require('../lib/app.js');

// require ekitjs-core
var instance = require('../../index.js')(app);

// require test library
var should = require('should');
var superagent = require('superagent');
var agent = superagent.agent();

////////////////////////////////////////
// server
describe('server', function() {

	before(function(done){
		app.startServer(done);
	});

	after(function(done){
		app.stopServer(done);
	});

	describe('should run', function() {
		it('on port ' + app.get('port'), function(done) {
			agent.get(app.url()).end(function(err, res){
				res.should.have.status(200);
				res.body.should.be.an.instanceOf(Object).and.have.property('status', 'ok');
				done();
			});
		});
	});
});

////////////////////////////////////////
// model
describe('model', function(){
	
	before(function(done){
		app.startServer(done);
	});

	after(function(done){
		app.stopServer(done);
	});

	describe('create model', function() {
		it('should be passed', function(done) {
			return done();

			instance.config({
				
			});

			instance.db.connect('mongodb://localhost/test');

			instance.load.addon(addonDir, addonName);

			var test = instance.model.extend({

			});

			instance.addon.base.document = instance.model.extend({

			});

			instance.addon.base.ctlIndex = instance.controller.extend({
				'get://index': function(req, res, next){
					this.pool.get('base.document').read();
				}
			});

			instance.addon.base.ctlIndex.include({
				'get://index': function(req, res, next){

				}
			});

			



			

			
		});
	});
});



