////////////////////////////////////////
// general
var config = {
	
};

////////////////////////////////////////
// main class
var __main__ = Class.extend({

	instance: null,

	init: function(instance){
		this.instance = instance;
	}

});

////////////////////////////////////////
// export
module.exports = function(instance) {
	return new __main__(instance);
};