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

	describe('mongodb', function(){
		it('should connect with collection test', function(done){
			instance.db.collection('test', function(err, collection){
				(collection != null).should.be.true;
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

	describe('model - create', function(){
		it('should work', function(done){
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

	describe('model - read', function(){
		it('should work', function(done){
			var demo = new (instance.Model.extend({
				_name: 'demo'
			}))();

			var success = _.success(4, function(){
				done();
			});

			demo.read(function(err, cursor){
				cursor.toArray(function(e, data){
					(data.length > 0).should.be.true;
					success.success();
				});
			});

			demo.read({}, function(err, cursor){
				cursor.toArray(function(e, data){
					(data.length > 0).should.be.true;
					success.success();
				});
			});

			demo.read({}, {}, function(err, cursor){
				cursor.toArray(function(e, data){
					(data.length > 0).should.be.true;
					success.success();
				});
			});

			demo.findOne(function(err, data){
				(_.isObject(data, true)).should.be.true;
				success.success();
			});
		});
	});

	describe('model - update', function(){
		it('should work', function(done){
			var demo = new (instance.Model.extend({
				_name: 'demo'
			}))();

			demo.findOne({
				hello: 'moto'
			}, function(err, doc){
				(doc != null).should.be.true;
				if(doc){
					demo.update({
						_id: doc._id
					}, {
						$set: {
							test: 'ok'
						}
					}, function(e, d){
						demo.findOne({
							_id: doc._id
						}, function(e, d){
							d.test.should.equal('ok');
						});
					});
				};
				return done();
			});			
		});
	});
});


function test() {

	describe('model - read', function(){
		it('should support read', function(done){
			var demo = new (instance.Model.extend({
				_name: 'demo'
			}))();
			
			demo.find({}, {}, function(err, cursor){
				cursor.toArray(function(e, data){
					// console.log(data);
				});
			});

			return;

			return done();
			
			demo.connect(function(e, collection){

				collection.__find = (function(collection, func){
					return function(){
						return func.apply(collection, arguments);
					};
				})(collection, collection.find);

				collection.find = (function(collection, func){
					return function(){
						var res = collection.__find.apply(collection, arguments);
						res.each = function(f){
							f(false, 'OK Man');
						};
						return res;
					};
				})(collection, collection.find);

				collection.find({}).each(function(e, doc){
					console.log('--- ', doc);
				});
				done();

				return;
				var tmp = collection.find({}, function(e, doc){
					console.log('aaaaaaaaa');
					doc.each(function(e, doc){
						console.log('--- ', doc);
					});
					// doc.toArray(function(e, doc){
					// 	console.log('---', doc);
					// });
				});
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