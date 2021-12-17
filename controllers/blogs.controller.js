const Allblog = require("../modules/blogs.modules");
exports.getblog = (req, res) => {
  Allblog.get_all((reqnse) => {
    res.send(reqnse);
  });
};
exports.getblog_detail = (req, res) => {
  Allblog.getById(req.params.id, (reqnse) => {
    res.send(reqnse);
  });
};
exports.getPaging = (req, res) => {
  console.log(req.query);
  Allblog.paging(req.query, (reqnse) => {
    res.send(reqnse);
  });
};
exports.add_blog = (req, res) => {
  Allblog.create(req.body, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.update_blog = (req, res) => {
  Allblog.update(req.body, req.params.id, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.remove_blog = (req, res) => {
  Allblog.remove(req.params.id, (resp) => {
    res.send({ result: reqnse });
  });
};
