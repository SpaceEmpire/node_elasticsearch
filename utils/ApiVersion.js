var Version = function() {};
var errors = require('../errors');

Version.prototype.use = function(options) {
  this._header = options.header.toLowerCase() || 'accept';
  this._grab = options.grab || /vnd.mycompany.com\+json; version=(\d+)(,|$)/;
  this._error = options.error || 406;
};

var has_matching_route = function (router, path, method) {
  return router.stack.some(function(layer) {
    if (layer.name === 'router' && layer.match(path)) {
      var layer_path = layer.regexp.exec(path)[0];
      var sub_path = path.substr(layer_path.length);
      return has_matching_route(layer.handle, sub_path, method);
    }

    if (!layer.route) {
      return false;
    }

    var matches_method = layer.route.methods._all || Boolean(layer.route.methods[method]);
    return layer.match(path) && matches_method;
  });
};

Version.prototype.reroute = function(min_version, reroute_map) {
  var header = this._header;
  var grab = this._grab;
  var error = this._error;

  return function(req, res, next) {
    var header_value = req.headers[header];
    //兼容旧版本 旧版本没有传Accept头部
    if(typeof header_value === 'undefined'){
    	header_value = '1.0';
    }
    if (header_value < min_version){
      return next(new errors.BadRequestError('版本号过低, 请下载最新版本', {
        version: header_value
      }))
    }

    var match = grab.exec(header_value);
    var path = req.path;
    var method = req.method.toLowerCase();
    var route_handler_exist = false;

    var versions = Object.keys(reroute_map).reverse();
    for (var i=0; i<versions.length; i++) {
      var version = versions[i];
      var router = reroute_map[version];

      if (has_matching_route(router, path, method)) {
        route_handler_exist = true;

        if (match && match[1] >= version) {
          return router(req, res, next);
        }
      }
    }

    if (route_handler_exist) {
      return next(error);
    }
    return next();
  };
};

exports = module.exports = new Version();