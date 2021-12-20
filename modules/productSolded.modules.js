const db = require("../common/connectAllProductMysql");

const ProductSolded = (ProductSolded) => {
  (this.id = ProductSolded.id),
    (this.userName = ProductSolded.userName),
    (this.userId = ProductSolded.userId),
    (this.codeOrder = ProductSolded.codeOrder),
    (this.productName = this.productName),
    (this.price = ProductSolded.price),
    (this.dress = ProductSolded.dress),
    (this.create_at = ProductSolded.create_at),
    (this.update_at = ProductSolded.update_at),
    (this.quantity = ProductSolded.quantity),
    (this.total = ProductSolded.total),
    (this.status = ProductSolded.status),
    (this.phone = ProductSolded.phone),
    (this.ward = ProductSolded.ward),
    (this.district = ProductSolded.district),
    (this.city = ProductSolded.city);
};
ProductSolded.get_all = (result) => {
  db.query("SELECT * FROM productsolded", (err, ProductSolded) => {
    if (err) result(null);
    else result(ProductSolded);
  });
};
ProductSolded.getById = (id, result) => {
  db.query(
    "SELECT * FROM productsolded WHERE id=?",
    id,
    (err, ProductSolded) => {
      if (err || ProductSolded.length === 0) result(err);
      else result(ProductSolded);
    }
  );
};
ProductSolded.getQuery = (query, result) => {
  db.query("SELECT * FROM productsolded", (err, ProductSolded) => {
    if (err || ProductSolded.length === 0) result(err);
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
        result(results);
      }
    }
  });
};
ProductSolded.create = (data, result) => {
  console.log(typeof data);
  if (typeof data === "object") {
    console.log("do 1");
    let newCode;
    const makeid = (l) => {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < l; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    db.query("SELECT * FROM productsolded", (err, ProductSolded) => {
      if (ProductSolded) {
        const code = ProductSolded.filter((p) => p.codeOrder);
        do {
          newCode = makeid(10);
        } while (code.forEach((e) => e.code === newCode));
        console.log(newCode);
        data.forEach((d) => {
          d.codeOrder = newCode;
          console.log("data", d);
          db.query(
            "INSERT INTO productsolded SET ?",
            d,
            (err, ProductSolded) => {
              if (err) {
                result(null);
              } else {
                result({
                  errorCode: 0,
                  data: { id: ProductSolded.inserId, ...data },
                  codeOrder: newCode,
                });
              }
            }
          );
        });
      } else {
        result({
          errorCode: 3,
          errorMessage: "no database",
        });
      }
    });
  } else if (data.length === 0) {
    result({
      errcode: 1,
      errorMessage: "no data",
    });
  } else {
    result({
      errcode: 2,
      errorMessage: "data invalid",
    });
  }
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
//     `UPDATE productsolded SET userName=?,userId=?,codeOrder=?, productName=?,price=?,dress=?,create_at=?,update_at=?,quantity=?,total=?,status=?,phone=?,ward=?,district=?,city=?  WHERE id=?`,
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
