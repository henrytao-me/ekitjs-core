////////////////////////////////////////
// general
var config = {
	
};

////////////////////////////////////////
// main class
var __main__ = _.Class.extend({

	instance: null,
	__addons: {},

	init: function(instance){
		this.instance = instance;
	},

	get: function(name){
		if(!this.__addons[name]){
			return null;
		};
		return new (this.__addons[name])();
	},

	set: function(name, _class){
		this.__addons[name] = _class;
	},

	export: function(){
		return this.__addons;
	}

});

////////////////////////////////////////
// export
module.exports = function(instance) {
	return new __main__(instance);
};