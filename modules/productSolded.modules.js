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
    (this.adress = ProductSolded.adress),
    (this.create_at = ProductSolded.create_at),
    (this.update_at = ProductSolded.update_at),
    (this.status = ProductSolded.status),
    (this.phone = ProductSolded.phone),
    (this.ward = ProductSolded.ward),
    (this.district = ProductSolded.district),
    (this.city = ProductSolded.city),
    (this.details = ProductSolded.details),
    (this.coupon = ProductSolded.coupon),
    (this.transportFee = ProductSolded.transportFee);
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
  console.log("data", data);
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
  db.query("SELECT * FROM productsolded", async (err, ProductSolded) => {
    if (err) {
      // await Promise.reject((x = false));
      result({
        code: err.errno,
        message: err.message,
      });
    } else {
      const code = ProductSolded.filter((p) => p.codeOrder);
      if (!code) newCode = makeid(10);
      else {
        do {
          newCode = makeid(10);
        } while (code.forEach((e) => e.code === newCode));
      }

      let newData = {
        ...data,
        codeOrder: newCode,
        create_at: nowDate(),
        update_at: nowDate(),
        details: data.details,
        status: 0,
      };
      console.log("newData", newData);

      let mycart = [];
      isstringify(newData);
      db.query(
        "INSERT INTO productsolded   SET ?",
        newData,
        (err, productsolded) => {
          if (err) {
            result({
              code: err.errno,
              message: err.message,
            });
          } else {
            isparse(newData);
            const id = data.details;
            console.log(id);
            for (let i = 0; i < id.length; i++) {
              db.query(
                "SELECT * FROM mycart WHERE id=?",
                id[i],
                (err, MyCart) => {
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
                    newData.id = productsolded.inserId;
                    const newDataForDetail = {
                      productId: MyCart[0].productId,
                      srcImg: MyCart[0].srcImg,
                      name: MyCart[0].name,
                      codeOrder: newCode,
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
                            id[i],
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
                                  console.log("newdata kp", newData);
                                  result(newData);
                                }
                                console.log(
                                  `???? x??a id l?? ${id} trong mycart vui l??ng ki???m tra`
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
            // newData.id = productsolded.inserId;
            // newDataForDetail = {
            //   productId: MyCart[0].productId,
            //   srcImg: MyCart[0].srcImg,
            //   name: MyCart[0].name,
            //   codeOrder: newCode,
            //   create_at: nowDate(),
            //   update_at: nowDate(),
            //   total: MyCart[0].total,
            //   price: MyCart[0].price,
            //   quantity: MyCart[0].quantity,
            // };
          }
        }
      );
      // const p = async () => {
      //   let x = true;
      //   let datamycart = [];
      //   try {
      //     for (let i = 0; i < id.length; i++) {
      //       db.query(
      //         "SELECT * FROM mycart WHERE id=?",
      //         id[i],
      //         (err, MyCart) => {
      //           if (err) {
      //             if (i === id.length - 1) {
      //               Promise.reject((x = false));
      //               // result({
      //               //   code: err.errno,
      //               //   message: err.message,
      //               // });
      //             } else return;
      //           } else if (MyCart.length === 0) {
      //             if (i === id.length - 1) Promise.reject((x = false));
      //             else return;
      //           } else {
      //             isstringify(newData);
      //             Promise.resolve(datamycart.push(mycart[0]));
      //           }
      //         }
      //       );
      //     }
      //     console.log("datamycart", datamycart);
      //   } catch {
      //     console.log("co loi");
      //   }
      //   console.log("datamycart", datamycart);
      // };
      // p();
      // result(null);
    }
  });
};
//MyCart
// db.query("SELECT * FROM mycart WHERE id=?", id[i], (err, MyCart) => {
//   if (err) {
//     if (i === id.length - 1) {
//       result({
//         code: err.errno,
//         message: err.message,
//       });
//     } else return;
//   } else if (MyCart.length === 0) {
//     if (i === id.length - 1) result(null);
//     else return;
//   } else {
//     isstringify(newData);
//     console.log("Mycart ", MyCart);
//   }
// });

//
// ProductSolded
// db.query("INSERT INTO productsolded   SET ?", newData, (err, productsolded) => {
//   if (err) {
//     if (i === id.length - 1) {
//       result({
//         code: err.errno,
//         message: err.message,
//       });
//     } else return;
//   } else {
//     isparse(newData);
//     newData.id = productsolded.inserId;
//     newDataForDetail = {
//       productId: MyCart[0].productId,
//       srcImg: MyCart[0].srcImg,
//       name: MyCart[0].name,
//       codeOrder: newCode,
//       create_at: nowDate(),
//       update_at: nowDate(),
//       total: MyCart[0].total,
//       price: MyCart[0].price,
//       quantity: MyCart[0].quantity,
//     };
//   }
// });
//
//
// add product_details
// db.query(
//   "INSERT INTO productsolded_detail SET ?",
//   newDataForDetail,
//   (err, product) => {
//     if (err) {
//       if (i === id.length - 1) {
//         result({
//           code: err.errno,
//           message: err.message,
//         });
//       } else return;
//     } else {
//       //delete product id mycart
//       db.query("DELETE  FROM mycart WHERE id=?", id[i], (err, MyCart) => {
//         if (err) {
//           if (i === id.length - 1) {
//             result({
//               code: err.errno,
//               message: err.message,
//             });
//           } else return;
//         } else {
//           if (i === id.length - 1) {
//             result(newData);
//           }
//           console.log(`???? x??a id l?? ${id} trong mycart vui l??ng ki???m tra`);
//         }
//       });
//     }
//   }
// );
//
ProductSolded.remove = (id, result) => {
  console.log("do delete");
  setTimeout(() => {
    db.query(
      "DELETE  FROM productsolded WHERE id=?",
      id,
      (err, ProductSolded) => {
        if (err)
          result({
            code: err.errno,
            errorMessage: err.message,
          });
        else result("x??a th??nh c??ng ph???n t??? t???i id l??" + id);
      }
    );
  }, 300);
};
ProductSolded.update = (data, id, result) => {
  console.log("data", data);
  console.log("id", id);
  let newData = {};
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
        newData = {
          ...ProductSolded[0],
          update_at: nowDate(),
          status: data.status,
          update_at: nowDate(),
        };
        console.log("newData", typeof newData.details);
        db.query(
          `UPDATE productsolded SET userName=?,userId=?,codeOrder=?,adress=?,create_at=?,update_at=?,status=?,phone=?,ward=?,district=?,city=?,details=?  WHERE id=?`,
          [
            newData.userName,
            newData.userId,
            newData.codeOrder,
            newData.adress,
            newData.create_at,
            newData.update_at,
            newData.status,
            newData.phone,
            newData.ward,
            newData.district,
            newData.city,
            newData.details,
            id,
          ],
          (err, ProductSolded) => {
            if (err) {
              result({
                code: err.errno,
                message: err.message,
              });
            } else {
              result({ id: id, ...newData });
            }
          }
        );
      }
    }
  );
};

module.exports = ProductSolded;
