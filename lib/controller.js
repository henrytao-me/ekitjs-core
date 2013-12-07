////////////////////////////////////////
// general
var config = {
	
};

////////////////////////////////////////
// main class
var __main__ = _.Class.extend({

	instance: null,
	pool: null,

	init: function(){
		this.instance = config.instance;
		this.pool = this.instance.pool;
	},

	export: function() {
		var self = this;
		var res = {};
		_.each(_.keys(this.__keys), function(key) {
			var method = '*';
			var url = null;
			var callback = self[key];
			if(!_.isFunction(callback)) {
				return;
			};
			if(key === '*' || key === 'get://*') {
				key = '*';
				url = '*';
			} else if(key.indexOf('get://') === 0) {
				method = 'get';
				url = key.replace('get://', '/');
			} else if(key.indexOf('post://') === 0) {
				method = 'post';
				url = key.replace('post://', '/');
			} else if(key.indexOf('put://') === 0) {
				method = 'put';
				url = key.replace('put://', '/');
			} else if(key.indexOf('delete://') === 0) {
				method = 'delete';
				url = key.replace('delete://', '/');
			} else {
				return;
			}
			res[key] = {
				method: method,
				url: url,
				callback: callback
			};
		});
		return res;
	}

});
__main__.extend = (function(extend){
	return function(){
		var res = extend.apply(__main__, arguments);
		res.__type = 'controller';
		return res;
	};
})(__main__.extend);

////////////////////////////////////////
// export
module.exports = function(instance) {
	config.instance = instance;
	// return Class
	return __main__;
};