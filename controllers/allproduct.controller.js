const Allproduct = require("../modules/allproduct.modules");
exports.getAllProduct = (req, res) => {
  Allproduct.get_all((datas) => {
    console.log("res.status", res.statusCode);
    res.send(
      JSON.stringify({
        status: res.statusCode,
        data: datas,
      })
    );
  });
};
exports.allproduct_detail = (req, res) => {
  Allproduct.getById(req.params.id, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.add_allproduct = (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  console.log("req.body", req.body);
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
