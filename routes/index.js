const version = require('../utils/ApiVersion');
const express = require('express');
const errors = require('../errors');

version.use({
  'header': 'Api-Version',
  'grab': /(\d+\.\d+)/,
  'error': new errors.BadRequestError('版本号错误'),
});

const route_app = require('./v1.0/route_app');

const app_version_router = express.Router().use(version.reroute("1.0", {
  "1.0": require('./v1.0/route_app')
}));

module.exports = function (app) {
  app.use(app_version_router);
};