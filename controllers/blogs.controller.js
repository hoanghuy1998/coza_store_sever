const Allblog = require("../modules/blogs.modules");
const x = require("../returnAPI");
const payload = x.payload;
exports.getblog = (req, res) => {
  Allblog.get_all((reqnse) => payload(res, reqnse));
};
exports.getblog_detail = (req, res) => {
  Allblog.getById(req.params.id, (reqnse) => payload(res, reqnse));
};
exports.getblogQuery = (req, res) => {
  Allblog.getQuery(req.query, (reqnse) => payload(res, reqnse));
};
exports.getPaging = (req, res) => {
  console.log(req.query);
  Allblog.paging(req.query, (reqnse) => payload(res, reqnse));
};
exports.add_blog = (req, res) => {
  Allblog.create(req.body, (reqnse) => payload(res, reqnse));
};
exports.update_blog = (req, res) => {
  Allblog.update(req.body, req.params.id, (reqnse) => payload(res, reqnse));
};
exports.remove_blog = (req, res) => {
  Allblog.remove(req.params.id, (reqnse) => payload(res, reqnse));
};
