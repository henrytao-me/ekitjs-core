require('ekit-util');

module.exports = function(app){
	app.get('/', function(req, res, next){
		res.json({
			status: 'ok'
		});
	});
};