var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var path = require('path');
var expressValidator = require('express-validator');


/**
 * Create Express server.
 */

var app = express();

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * Load controllers.
 */
var API = require('./controllers/api');

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));


/**
 * Application routes.
 */

app.get('/', API.index);

app.get('/api/', API.index);

app.get('/api/v1', API.getAll);

app.get('/api/v1/callingcode/:callingCode', API.callingCode)

app.get('/api/v1/region/:regionName', API.region)

app.get('/api/v1/currency/:currency_code', API.currency)

/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end, after all routes.
 */

app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});

module.exports = app;
