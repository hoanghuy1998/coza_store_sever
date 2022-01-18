const multer = require("multer")
const maxSize = 2 * 1024 * 1024;
const upload = multer({
  dest: "temp/",
  limit: { fileSize: maxSize },
});
module.exports = (router) => {
  const allproduct = require("../controllers/allproduct.controller");
  router.get("/allproduct/list", allproduct.getAllProduct);
  router.get("/allproduct/filter", allproduct.getProductQuery);
  router.get("/allproduct/filterQuery", allproduct.getProductFilterQuery);
  router.get("/allproduct/filterSortQuery", allproduct.getProductSortQuery);
  router.get("/allproduct/fullSearch", allproduct.getProductFullSearch);
  router.get("/allproduct/fullSearchQuery",allproduct.getProductFullSearchQuery);
  router.get("/allproduct/get-paging", allproduct.getProductPaging);
  router.get("/allproduct/searchAndGet-paging", allproduct.getProductPagingAndSearch);
  router.get("/allproduct/list/:id", allproduct.allproduct_detail);
  // router.post("/allproduct/list",upload.single('srcImg'),upload.array('imgDescription',20) , allproduct.add_allproduct);
  router.post("/allproduct/list",upload.fields([{ name: 'srcImg', maxCount: 1 }, { name: 'imgDescription', maxCount: 20 }]) , allproduct.add_allproduct);
  router.put("/allproduct/list/:id", allproduct.update_allproduct);
  router.delete("/allproduct/list/:id", allproduct.remove_allproduct);
};
