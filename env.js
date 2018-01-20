module.exports = {
  default: {
    // 端口号
    port: 8080,

    https_port: 8080,

    is_master: true
  },
  development: {
    mysql: {
      host: '',
      port: 3306,
      user: '',
      password: '',
      database: '',
    },
    redis: {
      host: '127.0.0.1', // 主机
      port: 6379, // 端口
      password: '', // 密码
      session_ttl: 30 * 24 * 3600,
    }
  },
  production: {
    mysql: {
      host: '',
      port: 3306,
      user: '',
      password: '',
      database: '',
    },
    redis: {
      host: '',
      port: 6379,
      password: '',
      session_ttl: 30,
    }
  },
  local: {
    mysql: {
      host: '',
      port: 3306,
      user: '',
      password: '',
      database: '',
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      session_ttl: 30 * 24 * 3600,
    }
  }
}
