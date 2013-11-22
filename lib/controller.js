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
	}

});

////////////////////////////////////////
// export
module.exports = function(instance) {
	// return object
	return new __main__(instance);
};