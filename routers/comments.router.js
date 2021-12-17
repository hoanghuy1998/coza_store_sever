module.exports = (router) => {
  const comment = require("../controllers/comments.controller");
  router.get("/comment", comment.getcomment);
  router.get("/comment/filter", comment.getcommentfilter);
  //   router.get("/comment/get-paging", comment.getProductPaging);
  router.get("/comment/:id", comment.getcommnet_detail);
  router.post("/comment", comment.add_comment);
  router.put("/comment/:id", comment.update_comment);
  router.delete("/comment/:id", comment.remove_comment);
};
