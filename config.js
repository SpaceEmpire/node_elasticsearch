var env = require('./env');
module.exports = (function(){
	// 区分NODE的运行环境 Product 或 Development
	var node_env = process.env.NODE_ENV || 'development';
	// 默认的配置
	var defaultConfig = env['default'];
	// 如果是开发环境 则加载开发环境的配置 ， 生产环境则 加载生产环境ed配置
	for(var key in env[node_env]){
		defaultConfig[key] = env[node_env][key];
	}
	//返回配置项
	return defaultConfig;
})();