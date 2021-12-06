const db = require("../common/connectAllProductMysql");

const Allproduct = (allproduct) => {
  (this.id = allproduct.id),
    (this.name = allproduct.name),
    (this.image = allproduct.image),
    (this.description = this.description),
    (this.price = allproduct.price),
    (this.sale = allproduct.sale),
    (this.create_at = allproduct.create_at),
    (this.update_at = allproduct.update_at);
};
Allproduct.get_all = (result) => {
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err) {
      console.log("fail connect");
      result(null);
    } else {
      console.log("succcses connect");
      result(allproduct);
    }
  });
};

Allproduct.getById = (id, result) => {
  db.query("SELECT * FROM allproduct WHERE id=?", id, (err, allproduct) => {
    if (err || allproduct.length === 0) result(null);
    else result(allproduct[0]);
  });
};
Allproduct.create = (data, result) => {
  db.query("INSERT INTO allproduct SET ?", data, (err, allproduct) => {
    // console.log("allproduct.inserId", allproduct.inserId);
    // console.log("allproduct", allproduct);
    console.log("err", err);
    // console.log("data", data);
    if (err) {
      console.log("err", err);
      result(null);
    }
    result({ id: allproduct.inserId, ...data });
  });
};
Allproduct.remove = (id, result) => {
  db.query("DELETE  FROM allproduct WHERE id=?", id, (err, allproduct) => {
    if (err) result(null);
    else result("xóa thành công phần tử tại id là" + id);
  });
};
Allproduct.update = (array, id, result) => {
  console.log("id", id);
  db.query(
    "UPDATE allproduct SET name=?,image=?, description=?,price=?,sale=?,create_at=?,update_at WHERE id=?",
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
    (err, allproduct) => {
      result({ id: id, ...array });
    }
  );
};

module.exports = Allproduct;
