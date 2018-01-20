const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const session = require('express-session');
const cors = require('cors');
const route = require('./routes');
const logger = require('./utils/Logger');
const config = require('./config');
const errors = require('./errors');
const okResponse = require('./utils/okResponse');

okResponse(express);
let app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Api-Version');
  res.header('Access-Control-Expose-Headers', 'set-cookie');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

let env = process.env.NODE_ENV;

if (env !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
app.get('/ping', (req, res) => res.json('pong'));

route(app);

app.use(function (req, res, next) {
  next(new errors.NotFoundError('未找到对应的url:' + req.method + ':' + req.url));
});

app.use(function (err, req, res, next) {
  let startDate = new Date();
  if (env !== 'test') {
    logger.error('method:', req.method);
    logger.error('url:', req.url);
    logger.error('statusCode:', err.code || 500);
    logger.error('request headers:', req.headers);
    logger.error('error message:', err.message);
    if (err.hasOwnProperty('detail')) {
      logger.error('error detail:', err.detail);
    }
    logger.error(err);
    res.on('finish', function () {
      let duration = new Date() - startDate;
      logger.error('Completed -' + duration + ' ms');
    });
  }
  res.json({
    code: err.code ? err.code : 500,
    msg: err.code ? err.message : '服务器内部错误'
  })
});

module.exports = app;
