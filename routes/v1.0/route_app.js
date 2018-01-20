const express = require('express');
const router = express.Router();
const loadApiController = function (controllerName) {
  return require('../../controllers/v1.0/' + controllerName);
};
const BookController = loadApiController('BookController');


//根据作者查询书籍
router.get('/essearch/book/queryBooksByAuthor', BookController.queryBooksByAuthor);

//根据id查询书籍
router.get('/essearch/book/queryBooksById', BookController.queryBooksById);

//根据id查询书籍
router.get('/essearch/book/queryBooksByTitle', BookController.queryBooksByTitle);

module.exports = router;
