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
exports.getProductQuery = (req, res) => {
  Allproduct.getByParam(req.query, (reqnse) => {
    res.send(reqnse);
  });
};
exports.getProductFilterQuery = (req, res) => {
  Allproduct.productFilterQuery(req.query, (reqnse) => {
    res.send(reqnse);
  });
};
exports.getProductSortQuery = (req, res) => {
  Allproduct.productSortQuery(req.query, (reqnse) => {
    res.send(reqnse);
  });
};
exports.getProductFullSearchQuery = (req, res) => {
  Allproduct.productFullSearchQuery(req.query, (reqnse) => {
    res.send(reqnse);
  });
};
exports.allproduct_detail = (req, res) => {
  Allproduct.getById(req.params.id, (reqnse) => {
    if (!reqnse) {
      res.status("404").json({
        errorCode: 1,
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
exports.getProductFullSearch = (req, res) => {
  Allproduct.getFullSearch(req.query, (reqnse) => {
    if (!reqnse) {
      res.status("404").json({
        errorCode: 1,
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
    console.log("req.query", req.query);
    if (!reqnse) {
      res.status("404").json({
        errorCode: 1,
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
exports.getProductPagingAndSearch = (req, res) => {
  Allproduct.getPagingSearch(req.query, (reqnse) => {
    console.log("req.query", req.query);
    if (!reqnse) {
      res.status("404").json({
        errorCode: 1,
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
  Allproduct.update(req.body, req.params.id, (reqnse) => {
    if (!reqnse) {
      res.send({
        errorCode: 1,
        errorMessage: "update fail",
      });
    } else {
      res.send({
        errorCode: 0,
        data: reqnse,
      });
    }
  });
};
exports.remove_allproduct = (req, res) => {
  Allproduct.remove(req.params.id, (resp) => {
    if (!resp) {
      res.send({ errorCode: 1, errorMessage: "delete fail" });
    } else {
      res.send({
        errorCode: 0,
        data: resp,
      });
    }
  });
};
