////////////////////////////////////////
// general
var config = {
	instance: null
};

////////////////////////////////////////
// main class
var __main__ = Class.extend({

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
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.update(selector, doc, options, callback);
		});
	},

	'delete': function(selector, options, callback) {
		return this.remove.apply(this, arguments);
	},

	/* ***********************************************
	 * inherit default mongodb native function
	 */

	find: function(query, options, callback) {
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			var cursor = collection.find(query);
			cursor.nextObject(function(e, item){
				console.log(item);
			});
		});
	},

	insert: function(docs, options, callback) {
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.insert(docs, options, callback);
		});
	},

	remove: function(selector, options, callback) {
		this.connect(function(err, collection) {
			if (err) {
				return callback(err, null);
			};
			return collection.remove(selector, options, callback);
		});
	}


});

////////////////////////////////////////
// export
module.exports = function(instance) {
	config.instance = instance;
	return __main__;
};