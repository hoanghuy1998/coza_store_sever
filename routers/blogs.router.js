module.exports = (router) => {
  const blogs = require("../controllers/blogs.controller");
  router.get("/blogs/list", blogs.getblog);
  router.get("/blogs/filter", blogs.getblogfilter);
  //   router.get("/blogs/get-paging", blogs.getProductPaging);
  router.get("/blogs/list/:id", blogs.getblog_detail);
  router.post("/blogs/list", blogs.add_blog);
  router.put("/blogs/list/:id", blogs.update_blog);
  router.delete("/blogs/list/:id", blogs.remove_blog);
};
