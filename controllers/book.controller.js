const Book = require("../modules/book.mudule");
exports.book = (req, res) => {
  Book.get_all((datas) => {
    res.send({ result: datas });
  });
};
exports.book_detail = (req, res) => {
  Book.getById(req.params.id, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.add_book = (req, res) => {
  console.log("req", req);
  Book.create(req.body, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.update_book = (req, res) => {
  Book.update(req.body, req.params.id, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.remove_book = (req, res) => {
  Book.remove(req.params.id, (resp) => {
    res.send({ result: resp });
  });
};
