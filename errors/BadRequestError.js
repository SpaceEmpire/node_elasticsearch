var AbstractError = require('./AbstractError');

function BadRequestError(message, detail) {
    AbstractError.call(this, message, detail);
}

BadRequestError.prototype = Object.create(AbstractError.prototype);
BadRequestError.prototype.code = 400;

module.exports = BadRequestError;