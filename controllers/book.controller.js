const Book = require("../modules/book.mudule");
const x = require("../returnAPI");
const payload = x.payload;
exports.book = (req, res) => {
  Book.get_all((reqnse) => payload(res, reqnse));
};
exports.book_detail = (req, res) => {
  Book.getById(req.params.id, (reqnse) => payload(res, reqnse));
};
exports.add_book = (req, res) => {
  console.log("req", req);
  Book.create(req.body, (reqnse) => payload(res, reqnse));
};
exports.update_book = (req, res) => {
  Book.update(req.body, req.params.id, (reqnse) => payload(res, reqnse));
};
exports.remove_book = (req, res) => {
  Book.remove(req.params.id, (reqnse) => payload(res, reqnse));
};
