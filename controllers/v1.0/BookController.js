const elasticsearch = require('elasticsearch');
const Validate = require("../../utils/Validate");

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

module.exports = {
  /**
   * 根据作者查询书籍
   * @param req
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  queryBooksByAuthor: async function (req, res, next) {

    let author = req.query.author;

    let page = parseInt(req.query.page);

    let page_size = parseInt(req.query.page_size);

    if (Validate.isEmpty(author)) {
      return res.ok("ok", []);
    }

    if (!Validate.isInteger(page) || page < 1) {
      page = 1;
    }

    if (!Validate.isInteger(page_size) || page_size < 1) {
      page_size = 5;
    }

    esClient.search({
      index: "book_db", type: "book", body: {
        size: page_size,
        from: (page - 1),
        query: {
          match: {
            author: {
              query: author,
              type: 'phrase'
            }
          }
        }
      }
    }).then(function (resp) {
      let result = resp.hits.hits;
      console.log("------------------命中结果数量：" + result.length);
      let bookList = [];
      for (let i = 0; i < result.length; i++) {
        let book = result[i]._source;
        let authorList = JSON.parse(book.author);
        let flag = false;
        for (let j = 0; j < authorList.length; j++) {
          if (authorList[j] == author) {
            flag = true;
          }
        }
        if (flag) {
          book.author = JSON.parse(book.author);
          bookList.push(book);
        }
      }
      return res.ok("ok", bookList);
    }).catch(function (err) {
      return res.ok("ok", []);
    });
  },
  /**
   * 根据id查询书籍
   * @param req
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  queryBooksById: async function (req, res, next) {

    let book_id = req.query.book_id;

    esClient.search({
      index: "book_db", type: "book", body: {
        size: 100,
        from: 0,
        "query": {
          "constant_score": {
            "filter": {
              "term": {
                "id": book_id,
              }
            }
          }
        }
      }
    }).then(function (resp) {
      return res.ok("ok", resp.hits.hits);
    }).catch(function (err) {
      console.log(err);
      return res.ok("ok", []);
    });
  },
  /**
   * 根据书籍名查询书籍
   * @param req
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  queryBooksByTitle: async function (req, res, next) {

    let title = req.query.title;

    esClient.search({
      index: "book_db", type: "book", body: {
        size: 100,
        from: 0,
        query: {
          match: {
            title: {
              query: title,
              minimum_should_match: 2
            }
          }
        }
      }
    }).then(function (resp) {
      return res.ok("ok", resp.hits.hits);
    }).catch(function (err) {
      return res.ok("ok", []);
    });
  }
}