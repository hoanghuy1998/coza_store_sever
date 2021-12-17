module.exports = (router) => {
  const comment = require("../controllers/comments.controller");
  router.get("/comment/list", comment.getcomment);
  router.get("/comment/filter", comment.getcommentfilter);
  //   router.get("/comment/get-paging", comment.getProductPaging);
  router.get("/comment/list/:id", comment.getcommnet_detail);
  router.post("/comment/list", comment.add_comment);
  router.put("/comment/list/:id", comment.update_comment);
  router.delete("/comment/list/:id", comment.remove_comment);
};
