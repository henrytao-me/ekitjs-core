////////////////////////////////////////
// main class
var __main__ = Class.extend({

	instance: null,

	init: function(instance){
		this.instance = instance;
	},

	connect: function(url){
		return true;
	}

});

////////////////////////////////////////
// export
module.exports = function(instance) {
	return new __main__(instance);
};