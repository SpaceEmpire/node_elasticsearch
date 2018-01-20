var AbstractError = require('./AbstractError');

function NotFoundError(message, detail) {
    AbstractError.call(this, message, detail);
}

NotFoundError.prototype = Object.create(AbstractError.prototype);
NotFoundError.prototype.code = 404;

module.exports = NotFoundError;