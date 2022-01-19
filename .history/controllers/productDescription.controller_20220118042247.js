const product = require("../modules/productDescription.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getproductfilter = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  product.productfilter(host,req.query, (reqnse) => payload(res, reqnse));
};
