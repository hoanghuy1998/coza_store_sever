const MyCart = require("../modules/myCart.modules");
exports.getMyProduct = (req, res) => {
  MyCart.get_all((datas) => {
    if (res.statusCode === 200) {
      res.send({
        errorCode: 0,
        data: datas,
      });
    } else {
      res.send({
        errorCode: res.statusCode,
        errorMessage: res.statusMessage,
      });
    }
  });
};
exports.addMyProduct = (req, res) => {
  MyCart.create(req.body, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.updateMyCartProduct = (req, res) => {
  MyCart.update(req.body, req.params.id, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.removeMyCartProduct = (req, res) => {
  MyCart.remove(req.params.id, (resp) => {
    res.send({ result: resp });
  });
};
