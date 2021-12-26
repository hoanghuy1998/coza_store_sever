const product = require("../modules/productDescription.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getproductfilter = (req, res) => {
  product.productfilter(req.query, (reqnse) => payload(res, reqnse));
};
