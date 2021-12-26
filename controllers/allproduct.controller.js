const Allproduct = require("../modules/allproduct.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getAllProduct = (req, res) => {
  Allproduct.get_all((datas) => payload(res, datas));
};
exports.allproduct_detail = (req, res) => {
  Allproduct.getById(req.params.id, (reqnse) => payload(res, reqnse));
};
exports.getProductQuery = (req, res) => {
  Allproduct.getByParam(req.query, (reqnse) => payload(res, reqnse));
};
exports.getProductFilterQuery = (req, res) => {
  Allproduct.productFilterQuery(req.query, (reqnse) => payload(res, reqnse));
};
exports.getProductSortQuery = (req, res) => {
  Allproduct.productSortQuery(req.query, (reqnse) => payload(res, reqnse));
};
exports.getProductFullSearchQuery = (req, res) => {
  Allproduct.productFullSearchQuery(req.query, (reqnse) =>
    payload(res, reqnse)
  );
};
exports.getProductFullSearch = (req, res) => {
  Allproduct.getFullSearch(req.query, (reqnse) => payload(res, reqnse));
};
exports.getProductPaging = (req, res) => {
  Allproduct.getPaging(req.query, (reqnse) => payload(res, reqnse));
};
exports.getProductPagingAndSearch = (req, res) => {
  Allproduct.getPagingSearch(req.query, (reqnse) => payload(res, reqnse));
};
exports.add_allproduct = (req, res) => {
  Allproduct.create(req.body, (reqnse) => payload(res, reqnse));
};
exports.update_allproduct = (req, res) => {
  Allproduct.update(req.body, req.params.id, (reqnse) => payload(res, reqnse));
};
exports.remove_allproduct = (req, res) => {
  Allproduct.remove(req.params.id, (resp) => payload(res, reqnse));
};
