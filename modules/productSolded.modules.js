const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const convertSrc = x.convertSrc;
const parse = x.parse;
const stringify = x.stringify;
const nowDate = x.getDate;
const isparse = (a) => {
  a.details = JSON.parse(a.details);
};
const isstringify = (a) => {
  a.details = JSON.stringify(a.details);
};

const ProductSolded = (ProductSolded) => {
  (this.id = ProductSolded.id),
    (this.userName = ProductSolded.userName),
    (this.userId = ProductSolded.userId),
    (this.codeOrder = ProductSolded.codeOrder),
    (this.dress = ProductSolded.dress),
    (this.create_at = ProductSolded.create_at),
    (this.update_at = ProductSolded.update_at),
    (this.status = ProductSolded.status),
    (this.phone = ProductSolded.phone),
    (this.ward = ProductSolded.ward),
    (this.district = ProductSolded.district),
    (this.city = ProductSolded.city),
    (this.details = ProductSolded.details);
};

ProductSolded.get_all = (result) => {
  console.log("do all");
  db.query("SELECT * FROM productsolded", (err, ProductSolded) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (ProductSolded.length === 0) result(null);
    else {
      parse(ProductSolded);
      result(ProductSolded);
    }
  });
};
ProductSolded.getById = (id, result) => {
  console.log("doid");
  db.query(
    "SELECT * FROM productsolded WHERE id=?",
    id,
    (err, ProductSolded) => {
      if (err) {
        result({
          code: err.errno,
          message: err.message,
        });
      } else if (ProductSolded.length === 0) result(null);
      else {
        parse(ProductSolded);
        result(ProductSolded);
      }
    }
  );
};
ProductSolded.getQuery = (query, result) => {
  console.log("query.search", query);
  db.query("SELECT * FROM productsolded", (err, ProductSolded) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (ProductSolded.length === 0) result(null);
    else {
      if (query.search) {
        const results = ProductSolded.filter(
          (p) =>
            p.codeOrder === query.search ||
            p.userId === parseInt(query.search) ||
            p.city === query.search ||
            p.userName === query.search ||
            p.ward === query.search ||
            p.district === query.search ||
            p.phone === parseInt(query.search)
        );
        if (results.length > 0) {
          parse(results);
          result(results);
        } else result(null);
      }
    }
  });
};
ProductSolded.create = async (data, result) => {
  // data.details=[id1,id2,id3]
  console.log("do 1");
  let newCode;
  const makeid = (l) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < l; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  db.query("SELECT * FROM productsolded", (err, ProductSolded) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (ProductSolded.length === 0) result(null);
    else {
      const code = ProductSolded.filter((p) => p.codeOrder);
      do {
        newCode = makeid(10);
      } while (code.forEach((e) => e.code === newCode));
      let newData = {
        ...data,
        codeOrder: newCode,
        create_at: nowDate(),
        update_at: nowDate(),
        details: data.details,
        status: 0,
      };
      let newDataForDetail = [];
      const id = newData.details;
      for (let i = 0; i < id.length; i++) {
        db.query("SELECT * FROM mycart WHERE id=?", id[i], (err, MyCart) => {
          if (err) {
            if (i === id.length - 1) {
              result({
                code: err.errno,
                message: err.message,
              });
            } else return;
          } else if (MyCart.length === 0) {
            if (i === id.length - 1) result(null);
            else return;
          } else {
            isstringify(newData);
            db.query(
              "INSERT INTO productsolded SET ?",
              newData,
              (err, productsolded) => {
                if (err) {
                  if (i === id.length - 1) {
                    result({
                      code: err.errno,
                      message: err.message,
                    });
                  } else return;
                } else {
                  isparse(newData);
                  newData.id = productsolded.inserId;
                  newDataForDetail = {
                    productId: MyCart[0].productId,
                    srcImg: MyCart[0].srcImg,
                    name: MyCart[0].name,
                    codeOrder: newData.codeOrder,
                    create_at: nowDate(),
                    update_at: nowDate(),
                    total: MyCart[0].total,
                    price: MyCart[0].price,
                    quantity: MyCart[0].quantity,
                  };
                  db.query(
                    "INSERT INTO productsolded_detail SET ?",
                    newDataForDetail,
                    (err, product) => {
                      if (err) {
                        if (i === id.length - 1) {
                          result({
                            code: err.errno,
                            message: err.message,
                          });
                        } else return;
                      } else {
                        //delete product id mycart
                        db.query(
                          "DELETE  FROM mycart WHERE id=?",
                          id,
                          (err, MyCart) => {
                            if (err) {
                              if (i === id.length - 1) {
                                result({
                                  code: err.errno,
                                  message: err.message,
                                });
                              } else return;
                            } else {
                              if (i === id.length - 1) {
                                result(newData);
                              }
                              console.log(
                                `đã xóa id là ${id} trong mycart vui lòng kiểm tra`
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  });
};
// ProductSolded.remove = (id, result) => {
//   console.log("do delete");
//   db.query(
//     "DELETE  FROM productsolded WHERE id=?",
//     id,
//     (err, ProductSolded) => {
//       if (err) result(null);
//       else result("xóa thành công phần tử tại id là" + id);
//     }
//   );
// };
// ProductSolded.update = (array, id, result) => {
//   db.query(
//     `UPDATE productsolded SET userName=?,userId=?,codeOrder=?, productName=?,price=?,dress=?,create_at=?,update_at=?,quantity=?,total=?,status=?,phone=?,ward=?,district=?,city=?,srcImg=?  WHERE id=?`,
//     [
//       array.userName,
//       array.userId,
//       array.codeOrder,
//       array.productName,
//       array.price,
//       array.dress,
//       array.create_at,
//       array.update_at,
//       array.quantity,
//       array.total,
//       array.status,
//       array.phone,
//       array.ward,
//       array.district,
//       array.city,
//       array.srcImg,
//       id,
//     ],
//     (err, ProductSolded) => {
//       if (err) {
//         result(null);
//       } else {
//         result({ id: id, ...array });
//       }
//     }
//   );
// };

module.exports = ProductSolded;
