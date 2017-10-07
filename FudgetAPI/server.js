var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Item = require('./api/models/fudgetModel'), //created model loading here
  bodyParser = require('body-parser'),
  mongoUri = process.env.MONGOURI || 'mongodb://adithya:developer@ds145389.mlab.com:45389/fudget';

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '5mb'}));

var routes = require('./api/routes/fudgetRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);