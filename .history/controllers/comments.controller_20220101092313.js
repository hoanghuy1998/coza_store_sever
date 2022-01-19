const Allcomment = require("../modules/comments.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getcomment = (req, res) => {
  Allcomment.get_all((reqnse) => payload(res, reqnse));
};
exports.getcommnet_detail = (req, res) => {
  Allcomment.getById(req.params.id, (reqnse) => payload(res, reqnse));
};
exports.getcommentfilter = (req, res) => {
  Allcomment.getByParam(req.query, (reqnse) => payload(res, reqnse));
};
// exports.getProductPagingAndSearch = (req, res) => {
//   Allcomment.getPagingSearch(req.query, (reqnse) => payload(res, reqnse)  );
// };
exports.add_comment = (req, res) => {
  Allcomment.create(req.body, (reqnse) => payload(res, reqnse));
};
exports.update_comment = (req, res) => {
  Allcomment.update(req.body, req.params.id, (reqnse) => payload(res, reqnse));
};
exports.remove_comment = (req, res) => {
  Allcomment.remove(req.params.id, (reqnse) => payload(res, reqnse));
};
