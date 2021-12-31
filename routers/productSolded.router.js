module.exports = (router) => {
  const ProductSolded = require("../controllers/productSolded.controller");
  router.get("/productSolded", ProductSolded.getMyProduct);
  router.get("/productSolded/:id", ProductSolded.getMyProduct_detail);
  router.get("/productSoldedQuery", ProductSolded.getMyProduct_query);
  router.post("/productSolded", ProductSolded.addMyProduct);
  //   router.put("/productSolded/:id", ProductSolded.updateMyCartProduct);
  router.delete("/productSolded/:id", ProductSolded.removeMyCartProduct);
};
