module.exports = (router) => {
  const myCartProduct = require("../controllers/myCartProduct.controller");
  router.get("/myCartProduct/list", myCartProduct.getMyProduct);
  router.get("/myCartProduct/list/:id", myCartProduct.getMyProduct_detail);
  router.get("/myCartProduct/query", myCartProduct.getMyProduct_query);
  router.post("/myCartProduct/list", myCartProduct.addMyProduct);
  router.put("/myCartProduct/list/:id", myCartProduct.updateMyCartProduct);
  router.delete("/myCartProduct/list/:id", myCartProduct.removeMyCartProduct);
};
