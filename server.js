var Sequelize = require('sequelize')
	, sequelize = new Sequelize('lawyer_scoreboard', 'root', null, {
		host: 'localhost'
	});
var express = require('express'),
		app = express();

sequelize
	.authenticate()
	.complete(function(err){
		if(!!err) {
			console.log('Unable to connect to the database: ', err);
		} else {
			console.log('Connection has been established successfully.');
		}
	});

var Lawyer = sequelize.define('Lawyer', {
	name: Sequelize.STRING,
	location: Sequelize.STRING,
	record: Sequelize.FLOAT,
	hourly_rate: Sequelize.FLOAT(5, 2)
});

//Sync the Lawyer model
sequelize.sync();

app.get('/lawyers', function(req, res){
	Lawyer.all().success(function(lawyers) {
	  // lawyers will be an array of all Lawyer instances
	  res.json(lawyers);
	});
})

app.listen('3000');