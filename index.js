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
	
	model: null,
	controller: null,

	init: function(app) {
		this.app = app;

		this.config = require(path.join(__dirname, 'lib', 'config.js'))(this);
		this.db = require(path.join(__dirname, 'lib', 'db.js'))(this);
		this.load = require(path.join(__dirname, 'lib', 'load.js'))(this);

		this.model = require(path.join(__dirname, 'lib', 'model.js'))(this);
		this.controller = require(path.join(__dirname, 'lib', 'controller.js'))(this);
	}

});

////////////////////////////////////////
// export
module.exports = function(app) {
	return new __main__(app);
};