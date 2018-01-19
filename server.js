const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug');
const compression = require('compression');

// routers
var user = require('./server/routes/user');

// app
var app = express();
app.use(compression())

// load env variables
require('dotenv').load()

// connect to MongoDB with mongoose
require('./server/config/database');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:', req.query);
  debug('body:', req.body);
  next();
}
app.use(debugReq);

app.use('/users', user);

module.exports = app;
