const MyCart = require("../modules/myCart.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getMyProduct = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  MyCart.get_all(host,(reqnse) => payload(res, reqnse));
};
exports.getMyProduct_detail = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  MyCart.getById(host,req.params.id, (reqnse) => payload(res, reqnse));
};
exports.getMyProduct_query = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  MyCart.getQuery(host,req.query, (reqnse) => payload(res, reqnse));
};
exports.addMyProduct = (req, res) => {
  MyCart.create(req.body, (reqnse) => payload(res, reqnse));
};
exports.updateMyCartProduct = (req, res) => {
  MyCart.update(req.body, req.params.id, (reqnse) => payload(res, reqnse));
};
exports.removeMyCartProduct = (req, res) => {
  MyCart.remove(req.params.id, (reqnse) => payload(res, reqnse));
};
