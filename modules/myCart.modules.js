const db = require("../common/connectAllProductMysql");

const MyCart = (MyCart) => {
  (this.id = MyCart.id),
    (this.name = MyCart.name),
    (this.image = MyCart.image),
    (this.description = this.description),
    (this.price = MyCart.price),
    (this.sale = MyCart.sale),
    (this.create_at = MyCart.create_at),
    (this.update_at = MyCart.update_at);
};
MyCart.get_all = (result) => {
  db.query("SELECT * FROM mycart", (err, MyCart) => {
    if (err) result(null);
    else result(MyCart);
  });
};
MyCart.create = (data, result) => {
  db.query("INSERT INTO mycart SET ?", data, (err, MyCart) => {
    if (err) {
      console.log("err", err);
      result(null);
    }
    result({ id: MyCart.inserId, ...data });
  });
};
MyCart.remove = (id, result) => {
  db.query("DELETE  FROM mycart WHERE id=?", id, (err, MyCart) => {
    if (err) result(null);
    else result("xóa thành công phần tử tại id là" + id);
  });
};
MyCart.update = (array, id, result) => {
  console.log("id", id);
  db.query(
    "UPDATE mycart SET name=?,image=?, description=?,price=?,sale=?,create_at=?,update_at WHERE id=?",
    [
      array.name,
      array.image,
      array.description,
      array.price,
      array.sale,
      array.create_at,
      array.update_at,
      id,
    ],
    (err, MyCart) => {
      result({ id: id, ...array });
    }
  );
};

module.exports = MyCart;
