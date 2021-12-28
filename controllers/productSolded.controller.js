const ProductSolded = require("../modules/productSolded.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getMyProduct = (req, res) => {
  ProductSolded.get_all((reqnse) => payload(res, reqnse));
};
exports.getMyProduct_detail = (req, res) => {
  ProductSolded.getById(req.params.id, (reqnse) => {
    console.log(req.params.id);
    payload(res, reqnse);
  });
};
exports.getMyProduct_query = (req, res) => {
  ProductSolded.getQuery(req.query, (reqnse) => {
    console.log(req.query);
    payload(res, reqnse);
  });
};
exports.addMyProduct = (req, res) => {
  ProductSolded.create(req.body, (reqnse) => payload(res, reqnse));
};
// exports.updateMyCartProduct = (req, res) => {
//   ProductSolded.update(req.body, req.params.id, (reqnse) =>  payload(res, reqnse));
// };
// exports.removeMyCartProduct = (req, res) => {
//   ProductSolded.remove(req.params.id, (resp) =>  payload(res, reqnse));
// };
