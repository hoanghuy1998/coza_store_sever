const Allproduct = require("../modules/allproduct.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getAllProduct = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.get_all((datas) => payload(res, datas,host));
};
exports.allproduct_detail = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.getById(req.params.id, (reqnse) => payload(res, reqnse,host));
};
exports.getProductQuery = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.getByParam(req.query, (reqnse) => payload(res, reqnse,host));
};
exports.getProductFilterQuery = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.productFilterQuery(req.query, (reqnse) => payload(res, reqnse,host));
};
exports.getProductSortQuery = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.productSortQuery(req.query, (reqnse) => payload(res, reqnse,host));
};
exports.getProductFullSearchQuery = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.productFullSearchQuery(req.query, (reqnse) =>
    payload(res, reqnse, host)
  );
};
exports.getProductFullSearch = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.getFullSearch(req.query, (reqnse) => payload(res, reqnse,host));
};
exports.getProductPaging = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.getPaging(req.query, (reqnse) => payload(res, reqnse,host));
};
exports.getProductPagingAndSearch = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.getPagingSearch(req.query, (reqnse) => payload(res, reqnse,host));
};
exports.add_allproduct = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.create(req, (reqnse) => payload(res, reqnse,host));
};
exports.update_allproduct = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  Allproduct.update(req.body, req.params.id, (reqnse) => payload(res, reqnse,host));
};
exports.remove_allproduct = (req, res) => {
  Allproduct.remove(req.params.id, (reqnse) => payload(res, reqnse));
};
