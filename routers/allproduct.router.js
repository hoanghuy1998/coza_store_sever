module.exports = (router) => {
  const allproduct = require("../controllers/allproduct.controller");
  router.get("/allproduct/list", allproduct.getAllProduct);
  router.get("/allproduct/filter", allproduct.getProductQuery);
  router.get("/allproduct/filterQuery", allproduct.getProductFilterQuery);
  router.get("/allproduct/filterSortQuery", allproduct.getProductSortQuery);
  router.get("/allproduct/fullSearch", allproduct.getProductFullSearch);
  router.get(
    "/allproduct/fullSearchQuery",
    allproduct.getProductFullSearchQuery
  );
  router.get("/allproduct/get-paging", allproduct.getProductPaging);
  router.get(
    "/allproduct/searchAndGet-paging",
    allproduct.getProductPagingAndSearch
  );
  router.get("/allproduct/list/:id", allproduct.allproduct_detail);
  router.post("/allproduct/list", allproduct.add_allproduct);
  router.put("/allproduct/list/:id", allproduct.update_allproduct);
  router.delete("/allproduct/list/:id", allproduct.remove_allproduct);
};
