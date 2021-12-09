module.exports = (router) => {
  const myCartProduct = require("../controllers/myCartProduct.controller");
  router.get("/myCartProduct/list", myCartProduct.getMyProduct);
  router.post("/myCartProduct/list", myCartProduct.addMyProduct);
  router.put("/myCartProduct/list/:id", myCartProduct.updateMyCartProduct);
  router.delete("/myCartProduct/list/:id", myCartProduct.removeMyCartProduct);
};
