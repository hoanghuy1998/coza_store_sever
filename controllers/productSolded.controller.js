const ProductSolded = require("../modules/productSolded.modules");
exports.getMyProduct = (req, res) => {
  ProductSolded.get_all((datas) => {
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
exports.getMyProduct_detail = (req, res) => {
  ProductSolded.getById(req.params.id, (reqnse) => {
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
exports.getMyProduct_query = (req, res) => {
  ProductSolded.getQuery(req.query, (reqnse) => {
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
exports.addMyProduct = (req, res) => {
  ProductSolded.create(req.body, (reqnse) => res.send(reqnse));
};
// exports.updateMyCartProduct = (req, res) => {
//   ProductSolded.update(req.body, req.params.id, (reqnse) => {
//     if (!reqnse) {
//       res.send({
//         errorCode: 1,
//         errorMessage: "update fail",
//       });
//     } else {
//       res.send({
//         errorCode: 0,
//         data: reqnse,
//       });
//     }
//   });
// };
// exports.removeMyCartProduct = (req, res) => {
//   ProductSolded.remove(req.params.id, (resp) => {
//     if (!resp) {
//       res.send({
//         errorCode: 1,
//         errorMessage: "delete fail",
//       });
//     } else {
//       res.send({
//         errorCode: 0,
//         data: resp,
//       });
//     }
//   });
// };
