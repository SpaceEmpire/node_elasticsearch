var AbstractError = require('./AbstractError'),
	ValidationError = require('./ValidationError'),
	BadRequestError = require('./BadRequestError'),
	NotFoundError   = require('./NotFoundError'),
	UnauthorizedError = require('./UnauthorizedError'),
	PermissonDeniedError = require('./PermissonDeniedError'),
	InternalServerError = require('./InternalServerError');

module.exports = {
	//错误抽象接口
	AbstractError: AbstractError,
	//参数验证错误
	ValidationError: ValidationError,
	//请求错误
	BadRequestError: BadRequestError,
	//没有对应路由
	NotFoundError: NotFoundError,
	//未登录
	UnauthorizedError: UnauthorizedError,
	//没有权限操作
	PermissonDeniedError: PermissonDeniedError,
	//服务器内部错误
	InternalServerError: InternalServerError
};