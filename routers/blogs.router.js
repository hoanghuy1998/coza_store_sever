module.exports = (router) => {
  const blogs = require("../controllers/blogs.controller");
  router.get("/blogs", blogs.getblog);
  router.get("/blogs/get-paging", blogs.getPaging);
  //   router.get("/blogs/get-paging", blogs.getProductPaging);
  router.get("/blogsQuery", blogs.getblogQuery);
  router.get("/blogs/:id", blogs.getblog_detail);
  router.post("/blogs", blogs.add_blog);
  router.put("/blogs/:id", blogs.update_blog);
  router.delete("/blogs/:id", blogs.remove_blog);
};
