var AbstractError = require('./AbstractError');

function UnauthorizedError(message, detail) {
    AbstractError.call(this, message, detail);
}

UnauthorizedError.prototype = Object.create(AbstractError.prototype);
UnauthorizedError.prototype.code = 401;

module.exports = UnauthorizedError;