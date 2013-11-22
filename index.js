////////////////////////////////////////
// general
require('ekit-util');
var path = require('path');

////////////////////////////////////////
// main class
var __main__ = _.Class.extend({

	// express app
	app: null,

	// 	
	config: null,
	db: null,

	// for CRUD
	pool: null,
	model: null,
	controller: null,

	init: function(app) {
		var self = this;
		this.app = app;

		this.addon = [];
		
		_.each(['config', 'db', 'pool', 'Model', 'Controller'], function(value) {
			this[value] = require(path.join(__dirname, 'lib', value.toLowerCase() + '.js'))(this);
		}, null, this);
	},

	start: function(){
		var self = this;
		// get all controller and init route
		_.each(this.pool.export(), function(addon){
			if(addon.__type != 'controller'){
				return;
			};
			controller = new addon();
			_.each(controller.export(), function(route){
				if(route.url === '*') {
					self.app.use((function(obj, callback) {
						return function(req, res, next) {
							// // split request path
							// var req_path = req.path.split('/');
							// // check static url
							// if(self.addons[req_path[1]] && req_path[2] == 'static') {
							// 	return next();
							// };
							// callback
							callback.call(obj, req, res, next);
						};
					})(controller, route.callback));
				} else {
					self.app[route.method](route.url, (function(obj, callback) {
						return function(req, res, next) {
							callback.call(obj, req, res, next);
						};
					})(controller, route.callback));
				};
			});
		});
	}

});

////////////////////////////////////////
// export
module.exports = function(app) {
	return new __main__(app);
};