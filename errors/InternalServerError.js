var AbstractError = require('./AbstractError');

function InternalServerError(detail) {
    AbstractError.call(this, '服务器内部错误', detail);
}

InternalServerError.prototype = Object.create(AbstractError.prototype);
InternalServerError.prototype.code = 500;

module.exports = InternalServerError;