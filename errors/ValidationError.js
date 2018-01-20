var AbstractError = require('./AbstractError');

function ValidationError(message, detail) {
    AbstractError.call(this, message, detail);
}

ValidationError.prototype = Object.create(AbstractError.prototype);
ValidationError.prototype.code = 422;

module.exports = ValidationError;