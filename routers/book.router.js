module.exports = (router) => {
  const bookController = require("../controllers/book.controller");
  router.get("/book/list", bookController.book);
  router.get("/book/list/:id", bookController.book_detail);
  router.post("/book/list", bookController.add_book);
  router.put("/book/list/:id", bookController.update_book);
  router.delete("/book/list/:id", bookController.remove_book);
};
