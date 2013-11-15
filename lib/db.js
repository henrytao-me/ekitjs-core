////////////////////////////////////////
// general
var config = {
	connection_string: 'mongodb://127.0.0.1:27017/test'
};

////////////////////////////////////////
// main class
var __main__ = Class.extend({

	instance: null,

	db: null,

	init: function(instance){
		this.instance = instance;
	},

	connect: function(connection_string, callback){
		var self = this;
		connection_string = connection_string || config.connection_string;
		self.db = null;
		require('mongodb').MongoClient.connect(connection_string, function(err, db){
			if(!err){
				self.db = db;
			};
			callback(err, db);
		});
		return true;
	},

	collection: function(name, callback){
		if(!this.db){
			return callback(true, null);
		};
		this.db.collection(name, callback);
	}

});

////////////////////////////////////////
// export
module.exports = function(instance) {
	return new __main__(instance);
};