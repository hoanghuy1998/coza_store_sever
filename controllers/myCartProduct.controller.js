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
exports.getMyProduct_detail = (req, res) => {
  MyCart.getById(req.params.id, (reqnse) => {
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
  MyCart.getQuery(req.query, (reqnse) => {
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
  MyCart.create(req.body, (reqnse) => {
    if(!reqnse){
      res.send({
        errorCode:1,
        errorMessage:'add fail'
      })
    }else  res.send({
      errorCode:0,
      data:reqnse
    });
   
  });
};
exports.updateMyCartProduct = (req, res) => {
  MyCart.update(req.body, req.params.id, (reqnse) => {
    if(!reqnse){
      res.send({
        errorCode:1,
        errorMessage:'update fail'
      })
    }else{
    res.send({
      errorCode:0,
      data:reqnse
    })  
    }
    
  });
};
exports.removeMyCartProduct = (req, res) => {
  MyCart.remove(req.params.id, (resp) => {
    res.send({ result: resp });
  });
};
