const db = require("../common/connectMyspl");

const Book = (book) => {
  (this.id = book.id),
    (this.title = book.title),
    (this.image = book.image),
    (this.description = this.description);
};
Book.get_all = (result) => {
  db.query("SELECT * FROM newbooks", (err, book) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (book.length === 0) result(null);
    else {
      result(book);
    }
  });
};
Book.getById = (id, result) => {
  db.query("SELECT * FROM newbooks WHERE id=?", id, (err, book) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (book.length === 0) result(null);
    else result(book[0]);
  });
};
Book.create = (data, result) => {
  db.query("INSERT INTO newbooks SET ?", data, (err, book) => {
    console.log("data", { data });
    console.log("book", book);
    console.log("error", err);
    if (err) {
      result(null);
    }
    result({ ...data });
  });
};
Book.remove = (id, result) => {
  db.query("DELETE  FROM newbooks WHERE id=?", id, (err, book) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else result("xóa thành công phần tử tại id là" + id);
  });
};
Book.update = (array, id, result) => {
  console.log("id", id);
  db.query(
    "UPDATE newbooks SET title=?,image=?, description=?  WHERE id=?",
    [array.title, array.image, array.description, id],
    (err, book) => {
      console.log("err", err);
      console.log("arr", array);
      if (err) {
        result({
          code: err.errno,
          message: err.message,
        });
      } else {
        array.id = id;
        result(array);
      }
    }
  );
};
module.exports = Book;
