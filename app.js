/**
 * Module dependencies
 */

var express = require('express');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');

var _ = require('lodash');
var flash = require('express-flash');
var path = require('path');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/**
 * Controllers
 */

var homeController = require('./controllers/home');
var apiController = require('./controllers/api')();

/**
 * Create Express server
 */

var app = express();

/**
 * Express configuration
 */

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')],
  helperContext: app.locals
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */

app.get('/', homeController.index);

/**
 * API Routes
 */

app.get('/api', apiController.index);

app.get('/api/monitor/:stop/:numresults', apiController.monitorNum);
app.get('/api/monitor/:stop', apiController.monitor);

app.get('/api/route/:origin/:destination/:year/:month/:day/:hour/:minute/:deparr', apiController.fullRoute);
app.get('/api/route/:origin/:destination/:year/:month/:day/:hour/:minute', apiController.fullRoute);

app.get('/api/route/:origin/:destination/:hour/:minute/:deparr', apiController.timeRoute);
app.get('/api/route/:origin/:destination/:hour/:minute', apiController.timeRoute);

app.get('/api/route/:origin/:destination/:deparr', apiController.route);
app.get('/api/route/:origin/:destination', apiController.route);

app.get('/api/find/:stop', apiController.find);

/**
 * 500 Error Handler.
 */

app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log('Express server listening on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
