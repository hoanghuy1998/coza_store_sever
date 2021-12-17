const Allblog = require("../modules/comments.modules");
exports.getblog = (req, res) => {
  Allblog.get_all((datas) => {
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
exports.getblog_detail = (req, res) => {
  Allblog.getById(req.params.id, (reqnse) => {
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
exports.getblogfilter = (req, res) => {
  Allblog.getByParam(req.query, (reqnse) => {
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
//   Allblog.getPagingSearch(req.query, (reqnse) => {
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
exports.add_blog = (req, res) => {
  Allblog.create(req.body, (reqnse) => {
    res.send({ result: reqnse });
  });
};
exports.update_blog = (req, res) => {
  Allblog.update(req.body, req.params.id, (reqnse) => {
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
exports.remove_blog = (req, res) => {
  Allblog.remove(req.params.id, (resp) => {
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
