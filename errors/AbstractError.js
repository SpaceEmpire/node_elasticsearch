function AbstractError(message, detail){
	Error.captureStackTrace(this, this);
	this.message = message;
	if(detail){
		this.detail = detail;
	}
}

AbstractError.prototype.code = '未知代码';
module.exports = AbstractError;



