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

	get: function(name){
		
	},

	set: function(name, obj){
		
	}

});

////////////////////////////////////////
// export
module.exports = function(instance) {
	return new __main__(instance);
};