const db = require("../common/connectAllProductMysql");

const MyCart = (MyCart) => {
  (this.id = MyCart.id),
    (this.name = MyCart.name),
    (this.srcImg = MyCart.srcImg),
    (this.status = MyCart.status),
    (this.description = this.description),
    (this.price = MyCart.price),
    (this.sale = MyCart.sale),
    (this.create_at = MyCart.create_at),
    (this.update_at = MyCart.update_at),
    (this.quantity = MyCart.quantity),
    (this.total=MyCart.total),
    (this.userId=MyCart.userId)
};
MyCart.get_all = (result) => {
  db.query("SELECT * FROM mycart", (err, MyCart) => {
    if (err) result(null);
    else result(MyCart);
  });
};
MyCart.getById = (id, result) => {
  db.query(
    "SELECT * FROM mycart WHERE id=?",
    id,
    (err, MyCart) => {
      if (err || MyCart.length === 0) result(err);
      else result(MyCart);
    }
  );
};
MyCart.getQuery = (query, result) => {
  db.query("SELECT * FROM mycart",(err, MyCart) => {
      if (err || MyCart.length === 0) result(err);
      else {
        if(query.search){
          const results = MyCart.filter(
          (p) =>
            p.color === query.search ||
            p.theme === query.search ||
            p.type === query.search ||
            p.tag === query.search ||
            p.sorfby === query.search ||
            p.status === parseInt(query.search)||
            p.sale===query.search||
            p.new===query.search ||
            p.seller===query.search||
            p.feature===query.search||
            p.userId===parseInt(query.search)
            );
          result(results)
        }
      }
    }
  );
};
MyCart.create = (data, result) => {
  db.query("INSERT INTO mycart SET ?", data, (err, MyCart) => {
    if (err) {
      result(null);
    }else{
       result({ id: MyCart.inserId, ...data });
    }
  });
};
MyCart.remove = (id, result) => {
  db.query("DELETE  FROM mycart WHERE id=?", id, (err, MyCart) => {
    if (err) result(null);
    else result("xóa thành công phần tử tại id là" + id);
  });
};
MyCart.update = (array, id, result) => {
  db.query(
    `UPDATE mycart SET name=?,srcImg=?,status=?, description=?,price=?,sale=?,create_at=?,update_at=?,quantity=?,total=?,userId=?  WHERE id=?`,
    [
      array.name,
      array.srcImg,
      array.status,
      array.description,
      array.price,
      array.sale,
      array.create_at,
      array.update_at,
      array.quantity,
      array.total,
      array.userId,
      id,
    ],
    (err, MyCart) => {
      if (err) {
        result(null);
      } else {
        result({ id: id, ...array });
      }
    }
  );
};

module.exports = MyCart;
