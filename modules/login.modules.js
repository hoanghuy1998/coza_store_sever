const db = require("../common/connectAllProductMysql");
const User = (User) => {
  (this.id = User.id),
    (this.userName = User.userName),
    (this.userId = User.userId),
    (this.avata = User.avata),
    (this.gender = this.gender),
    (this.email = User.email),
    (this.dress = User.dress),
    (this.create_at = User.create_at),
    (this.update_at = User.update_at),
    (this.date = User.date),
    (this.password = User.password);
};
User.postUser = (data, result) => {
  console.log("do login");
  db.query("SELECT * FROM user", data, (err, user) => {
    if (err) {
      console.log("err", err);
      result(null);
    } else {
      const x = user.filter((u) => u.email === data.email);

      if (x && x.length > 0) {
        const results = x.filter((x) => x.password === parseInt(data.password));
        console.log("results", results);
        if (results) {
          result({
            errorCode: 0,
            data: results[0],
          });
        } else {
          result({
            errorCode: 2,
            errorMessage: "Email or Password wrong",
          });
        }
      } else {
        result({
          errorCode: 1,
          errorMessage: "Invalid Email",
        });
      }
    }
  });
};

User.adduser = (data, result) => {
  let newUserId;
  db.query("SELECT * FROM user", (err, user) => {
    if (!err && user.length != 0) {
      newUserId = parseInt(user[user.length - 1].userId) + 1;
    } else newUserId = 12345;
    data = {
      ...data,
      userId: newUserId,
    };
    const e = user.filter((u) => u.email === data.email);
    if (e.length > 0) {
      result({
        errorCode: 1,
        errorMessage: "Email already exists",
      });
    } else {
      db.query("INSERT INTO user SET ?", data, (err, x) => {
        if (err) {
          result({
            errorCode: 1,
            errorMessage: "add fail",
          });
        } else {
          result({
            errorCode: 0,
            data: { id: x.inserId, ...data },
          });
        }
      });
    }
  });
};
User.getById = (id, result) => {
  db.query("SELECT * FROM user WHERE id=?", id, (err, user) => {
    if (err) {
      result({
        errorCode: 1,
        errorMessage: "get fail",
      });
    } else if (user.length === 0) {
      result({
        errorCode: 1,
        errorMessage: "not found",
      });
    } else result(user);
  });
};
User.remove = (id, result) => {
  db.query("DELETE  FROM user WHERE id=?", id, (err, user) => {
    if (err) {
      result({
        errorCode: 1,
        errorMessage: "delte fail",
      });
    } else result("xóa thành công phần tử tại id là" + id);
  });
};
User.update = (array, id, result) => {
  db.query(
    `UPDATE user SET userName=?,userId=?,avata=?, gender=?,email=?,create_at=?,update_at=?,date=?,password=?  WHERE id=?`,
    [
      array.userName,
      array.userId,
      array.avata,
      array.gender,
      array.email,
      array.create_at,
      array.update_at,
      array.date,
      array.password,
      id,
    ],
    (err, user) => {
      if (err || user.length === 0) {
        result({
          errorCode: 1,
          errorMessage: "update fail",
        });
      } else {
        result({
          errorCode: 0,
          data: { id: id, ...array },
        });
      }
    }
  );
};
module.exports = User;
