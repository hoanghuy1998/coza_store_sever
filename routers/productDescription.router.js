module.exports = (router) => {
  const productDescription = require("../controllers/productDescription.controller");
  router.get("/productDesription/filter", productDescription.getproductfilter);
};
