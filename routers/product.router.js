const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const upload = multer({
  dest: "temp/",
  limit: { fileSize: maxSize },
});
module.exports = (router) => {
  const allproduct = require("../controllers/product.controller");
  router.get("/ticker/all", allproduct.getAllProduct);
  router.get("/ticker/all/filter", allproduct.getProductQuery);
  router.get("/ticker/all/filterQuery", allproduct.getProductFilterQuery);
  router.get("/ticker/all/filterSortQuery", allproduct.getProductSortQuery);
  router.get("/ticker/all/fullSearch", allproduct.getProductFullSearch);
  router.get(
    "/ticker/all/fullSearchQuery",
    allproduct.getProductFullSearchQuery
  );
  router.get("/ticker/all/get-paging", allproduct.getProductPaging);
  router.get(
    "/ticker/all/searchAndGet-paging",
    allproduct.getProductPagingAndSearch
  );
  router.get("/ticker/all/:id", allproduct.allproduct_detail);
  // router.post("/ticker/allproduct/list",upload.single('srcImg'),upload.array('imgDescription',20) , allproduct.add_allproduct);
  router.post(
    "/ticker/all",
    upload.fields([
      { name: "srcImg", maxCount: 1 },
      { name: "imgDescription", maxCount: 20 },
    ]),
    allproduct.add_allproduct
  );
  router.put("/ticker/all/:id", allproduct.update_allproduct);
  router.delete("/ticker/all/:id", allproduct.remove_allproduct);
};
