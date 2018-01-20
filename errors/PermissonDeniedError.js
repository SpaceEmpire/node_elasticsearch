var AbstractError = require('./AbstractError');

function PermissonDeniedError(message, detail) {
    AbstractError.call(this, message, detail);
}

PermissonDeniedError.prototype = Object.create(Error.prototype);
PermissonDeniedError.prototype.code = 403;

module.exports = PermissonDeniedError;