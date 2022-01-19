const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const nowDate = x.getDate;
const convertSrc = x.convertSrc;
const parse = x.parse;
const stringify = x.stringify;
console.log(nowDate());
const MyCart = (MyCart) => {
  (this.id = MyCart.id),
    (this.userId = MyCart.userId),
    (this.productId = MyCart.productId),
    (this.name = MyCart.name),
    (this.srcImg = MyCart.srcImg),
    (this.create_at = MyCart.create_at),
    (this.update_at = MyCart.update_at),
    (this.quantity = MyCart.quantity),
    (this.price = MyCart.price),
    (this.total = MyCart.total);
};
MyCart.get_all = (result) => {
  db.query("SELECT * FROM mycart", (err, MyCart) => {
    convertSrc(MyCart);
    console.log(MyCart);
    if (err) result({ code: 400 });
    else if (MyCart.length === 0) result(null);
    else result(MyCart);
  });
};
MyCart.getById = (id, result) => {
  db.query("SELECT * FROM mycart WHERE id=?", id, (err, MyCart) => {
    convertSrc(MyCart);
    if (err) result({ code: 400 });
    else if (MyCart.length === 0) result(null);
    else result(MyCart);
  });
};
MyCart.getQuery = (query, result) => {
  console.log("query", query);
  db.query("SELECT * FROM mycart", (err, MyCart) => {
    if (err) result({ code: 400 });
    else if (MyCart.length === 0) result(null);
    else {
      convertSrc(MyCart);
      if (query.search) {
        const results = MyCart.filter(
          (p) => p.userId === parseInt(query.search)
        );
        result(results);
      } else result(MyCart);
    }
  });
};
MyCart.create = (data, result) => {
  //data={id,quantity,userId}
  console.log("data", data);
  let newData = {};
  db.query("SELECT * FROM products WHERE id=?", data.id, (err, product) => {
    if (err) result({ code: 400 });
    else if (MyCart.length === 0) result(null);
    else {
      product.map((p) => {
        newData = {
          userId: data.userId,
          name: p.name,
          productId: p.productId,
          srcImg: p.srcImg,
          price: p.price,
          quantity: data.quantity,
          total: parseInt(data.quantity) * p.price,
          create_at: nowDate(),
          update_at: nowDate(),
        };
      });
      if (newData) {
        db.query("INSERT INTO mycart SET ?", newData, (err, MyCart) => {
          if (err) result({ code: 400 });
          else if (MyCart.length === 0) result(null);
          else {
            newData.id = MyCart.inserId;
            result(newData);
          }
        });
      } else result(null);
    }
  });
};
MyCart.remove = (id, result) => {
  console.log("do delete");
  db.query("DELETE  FROM mycart WHERE id=?", id, (err, MyCart) => {
    if (err) result({ code: 400 });
    else result("xóa thành công phần tử tại id là" + id);
  });
};
MyCart.update = (data, id, result) => {
  // array={quantity}
  console.log(data);
  db.query("SELECT * FROM mycart WHERE id=?", id, (err, MyCart) => {
    if (err) result({ code: 400 });
    else {
      MyCart.map((m) => {
        m.quantity = data.quantity;
        m.total = data.quantity * m.price;
        m.update_at = nowDate();
        db.query(
          `UPDATE mycart SET name=?,srcImg=?,price=?,create_at=?,update_at=?,quantity=?,total=?,userId=?,productId=?  WHERE id=?`,
          [
            m.name,
            m.srcImg,
            m.price,
            m.create_at,
            m.update_at,
            m.quantity,
            m.total,
            m.userId,
            m.productId,
            id,
          ],
          (err, MyCart) => {
            if (err) {
              console.log(err);
              result({
                code: err.errno,
                errorMessage: err.message,
              });
            } else {
              result(m);
            }
          }
        );
      });
    }
  });
};

module.exports = MyCart;
