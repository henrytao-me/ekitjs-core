////////////////////////////////////////
// general
var config = {
	instance: null
};

////////////////////////////////////////
// main class
var __main__ = _.Class.extend({

	instance: null,
	pool: null,

	_name: '',
	_column: {},
	_collection: null,

	init: function() {
		this.instance = config.instance;
		this.pool = this.instance.pool;
	},

	// get collection in database
	connect: function(callback) {
		var self = this;
		if (!self._collection) {
			return self.instance.db.collection(self._name, function(err, collection) {
				self._collection = collection;
				callback(err, collection);
			});
		};
		callback(null, self._collection);
	},

	/* ***********************************************
	 * CRUD support
	 */

	create: function(docs, options, callback) {
		return this.insert.apply(this, arguments);
	},

	read: function(query, options, callback) {
		return this.find.apply(this, arguments);
	},

	update: function(selector, doc, options, callback) {
		var args = this.__fixParams(arguments, [{}, {}, {}, this.__callback]);
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.update.apply(collection, args);
		});
	},

	'delete': function(selector, options, callback) {
		return this.remove.apply(this, arguments);
	},

	/* ***********************************************
	 * inherit default mongodb native function
	 */

	find: function(query, options, callback) {
		var args = this.__fixParams(arguments, [{}, {}, this.__callback]);
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.find.apply(collection, args);
		});
	},

	findOne: function(query, options, callback) {
		var args = this.__fixParams(arguments, [{}, {}, this.__callback]);
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.findOne.apply(collection, args);
		});
	},

	insert: function(docs, options, callback) {
		var args = this.__fixParams(arguments, [[{},[]], {}, this.__callback]);
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.insert.apply(collection, args);
		});
	},

	remove: function(selector, options, callback) {
		var args = this.__fixParams(arguments, [{}, {}, this.__callback]);
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.remove.apply(collection, args);
		});
	},

	/* ***********************************************
	 * util
	 */

	__callback: function(e, data) {},

	__fixParams: function(args, def) {
		var self = this;
		// def (array) is default value
		def = def || [];
		var res = [];		
		var i = 0;
		_.each(def, function(value) {
			if(!_.isArray(value)){
				value = [value];
			};
			var v = null;
			_.each(value, function(value){
				if(typeof args[i] == typeof value && v == null && args[i].push == value.push){
					v = args[i];
				};
			});
			if(v != null){
				res.push(v);
				i++;
			}else{
				res.push(value[0]);
			};
		});
		// check _id
		if(_.isObject(res[0], true)){
			if(res[0]._id){
				res[0]._id = self.instance.db.getObjectID(res[0]._id);
			};
		};
		// return
		return res;
	}
});

__main__.extend = (function(extend){
	return function(){
		var res = extend.apply(__main__, arguments);
		res.__type = 'model';
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