////////////////////////////////////////
// general
require('ekit-util');
var path = require('path');

////////////////////////////////////////
// main class
var __main__ = Class.extend({

	app: null,

	config: null,
	db: null,
	load: null,

	pool: null,
	model: null,
	controller: null,

	addon: null,

	init: function(app) {
		var self = this;
		this.app = app;

		this.addon = [];
		
		_.each(['config', 'db', 'load', 'pool', 'Model', 'Controller'], function(value) {
			this[value] = require(path.join(__dirname, 'lib', value.toLowerCase() + '.js'))(this);
		}, null, this);
	}

});

////////////////////////////////////////
// export
module.exports = function(app) {
	return new __main__(app);
};