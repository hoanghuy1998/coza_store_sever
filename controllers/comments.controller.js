const Allcomment = require("../modules/comments.modules");
exports.getcomment = (req, res) => {
  Allcomment.get_all((datas) => {
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
exports.getcommnet_detail = (req, res) => {
  Allcomment.getById(req.params.id, (reqnse) => {
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
exports.getcommentfilter = (req, res) => {
  Allcomment.getByParam(req.query, (reqnse) => {
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

// exports.getProductPagingAndSearch = (req, res) => {
//   Allcomment.getPagingSearch(req.query, (reqnse) => {
//     console.log("req.query", req.query);
//     if (!reqnse) {
//       res.status("404").json({
//         errorCode: 1,
//         errorMessage: "not found",
//       });
//     } else {
//       res.send({
//         errorCode: 0,
//         data: reqnse,
//       });
//     }
//   });
// };
exports.add_comment = (req, res) => {
  Allcomment.create(req.body, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.update_comment = (req, res) => {
  Allcomment.update(req.body, req.params.id, (reqnse) => {
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
exports.remove_comment = (req, res) => {
  Allcomment.remove(req.params.id, (resp) => {
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
