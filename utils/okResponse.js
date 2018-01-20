module.exports = function (express) {
  express.response.ok = function (msg, data) {
    this.json({
      code: 200,
      msg: msg,
      data: data
    })
  },
  express.response.fail = function (msg, data) {
    this.json({
      code: 0,
      msg: msg,
      data: data
    })
  }
};