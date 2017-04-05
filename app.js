var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var config = require('./lib/config')

var app = express();

mongoose.createConnection(config.database)
//mongoose.connect(config.database)

var auth_middleware = require('./lib/middleware/auth')
var index = require('./routes/index')
var auth = require('./routes/auth')
var movie = require('./routes/movie')
var user = require('./routes/user')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas Inseguras
app.use('/', index)
app.use('/auth', auth)
app.use('/user', user)

//Middleware
app.use(auth_middleware)

//Rutas Seguras
app.use('/movie', movie)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
