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
	before(function(done) {
		app.startServer(done);
	});

	after(function(done) {
		app.stopServer(done);
	});

	describe('should run', function() {
		it('on port ' + app.get('port'), function(done) {
			agent.get(app.url()).end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.an.instanceOf(Object).and.have.property('status', 'ok');
				done();
			});
		});
	});
});

////////////////////////////////////////
// all-in-one
describe('all-in-one test:', function() {
	this.timeout(10000);

	before(function(done) {
		app.startServer(done);
	});

	after(function(done) {
		app.stopServer(done);
	});

	describe('mongodb', function() {
		it('should connect', function(done) {
			instance.db.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
				(err == null).should.be.true;
				done();
			});
		});
	});

	describe('model', function() {
		it('can be connected twice times', function(done) {
			var A = instance.Model.extend({
				_name: 'hello'
			});
			a = new A();
			var success = _.success(2, function(){
				done();
			});
			a.connect(function(err, collection){
				success.success();
			});
			a.connect(function(err, collection){
				success.success();
			});
		});
	});

	describe('model', function(){
		it('should support create', function(done){
			var demo = new (instance.Model.extend({
				_name: 'demo'
			}))();
			demo.create({
				hello: 'moto'
			}, function(err, doc){
				(err == null).should.be.true;
				done();
			});
		});
	});

	describe('model', function(){
		it('should support read', function(done){
			var demo = new (instance.Model.extend({
				_name: 'demo'
			}))();

			demo.connect(function(e, collection){
				var tmp = collection.find({}, function(e, doc){
					console.log('aaa', doc.count);
					// console.log('aaaa', doc);
				});
				console.log('bbb', tmp.count);
				done();
			});

			return;
			demo.read(function(err, docs){
				// docs.each(function(err, doc){
				// 	console.log(doc);
				// 	console.log('a');
				// });
				// _.isArray(docs).should.be.true;
				done();
			});
		});
	});
});


function test() {
	describe('tmp', function() {

		before(function(done) {
			app.startServer(done);
		});

		after(function(done) {
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
					'get://index': function(req, res, next) {
						this.pool.get('base.document').read();
					}
				});

				instance.addon.base.ctlIndex.include({
					'get://index': function(req, res, next) {

					}
				});


			});
		});
	});
};