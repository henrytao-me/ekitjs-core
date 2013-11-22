////////////////////////////////////////
// general
var config = {
	
};

////////////////////////////////////////
// main class
var __main__ = _.Class.extend({

	instance: null,

	init: function(instance){
		this.instance = instance;
	},

	get: function(key){
		return config[key];
	},

	set: function(key, value){
		config[key] = value;
	}

});

////////////////////////////////////////
// export
module.exports = function(instance) {
	return new __main__(instance);
};