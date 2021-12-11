const Allproduct = require("../modules/allproduct.modules");
exports.getAllProduct = (req, res) => {
  Allproduct.get_all((datas) => {
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
exports.allproduct_detail = (req, res) => {
  Allproduct.getById(req.params.id, (reqnse) => {
    if (!reqnse) {
      res.status("404").json({
        errorMessage: "not found",
      });
    } else {
      res.send({
        errorCode: 0,
        data: reqnse,
      });
    }
  });
};
exports.getProductQuery = (req, res) => {
  Allproduct.getByParam(req.query, (reqnse) => {
    console.log("req.query",req.query)
    if (!reqnse) {
      res.status("404").json({
        errorMessage: "not found",
      });
    } else {
      res.send({
        errorCode: 0,
        data: reqnse,
      });
    }
  });
};
exports.getProductPaging = (req, res) => {
  Allproduct.getPaging(req.query, (reqnse) => {
    console.log("req.query",req.query)
    if (!reqnse) {
      res.status("404").json({
        errorMessage: "not found",
      });
    } else {
      res.send({
        errorCode: 0,
        data: reqnse,
      });
    }
  });
};
exports.add_allproduct = (req, res) => {
  Allproduct.create(req.body, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.update_allproduct = (req, res) => {
  // res.send("Content-Type", "application/json");

  Allproduct.update(req.body, req.params.id, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.remove_allproduct = (req, res) => {
  Allproduct.remove(req.params.id, (resp) => {
    res.send({ result: resp });
  });
};
