var winston = require('winston'),
	moment = require('moment');

var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'error',
			filename: './log/error.log',
			handleExceptions: true,
			json: false,
			colorize: true,
			timestamp: function() {
				return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
			}
		}),
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true,
			timestamp: function() {
				return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
			}
		})
	],
	exitOnError: false
});

const emptyLogger = {
	error: () => {}
};

const env = process.env.NODE_ENV;

if (env === 'test') {
	// 自动化测试取消log
  module.exports = emptyLogger;
} else {
  module.exports = logger;
}
