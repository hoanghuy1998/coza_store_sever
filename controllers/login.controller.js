const User = require("../modules/login.modules");

exports.login = (req, res) => {
  User.postUser(req.body, (reqnse) => res.send(reqnse));
};
exports.addUser = (req, res) => {
  User.adduser(req.body, (reqnse) => {
    res.send(reqnse);
  });
};
exports.getUser_detail = (req, res) => {
  User.getById(req.params.id, (reqnse) => {
    res.send(reqnse);
  });
};
exports.updateUser = (req, res) => {
  User.update(req.body, req.params.id, (reqnse) => {
    res.send(reqnse);
  });
};
exports.deleteUser = (req, res) => {
  User.remove(req.params.id, (reqnse) => {
    res.send(reqnse);
  });
};
