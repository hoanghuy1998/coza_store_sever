const db = require("../common/connectAllProductMysql");
// var pbkdf2 = require("pbkdf2");
// const bcrypt = require("bcrypt");
// const saltRounds = 5;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "s0//P4$$w0rD";
// const x = bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//   // Store hash in your password DB.
//   bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
//     console.log(result);
//   });
//   console.log(hash);
//   return hash;
// });
// var derivedKey = pbkdf2.pbkdf2Sync("hello", "salt", 1, 15, "sha512");

const parse = (a) => {
  a.listProductLike = JSON.parse(a.listProductLike);
};
const stringify = (a) => {
  a.listProductLike = JSON.stringify(a.listProductLike);
};
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
    (this.password = User.password),
    (this.listProductLike = User.listProductLike);
};

User.postUser = (data, result) => {
  console.log("do login");
  db.query("SELECT * FROM user", data, (err, user) => {
    if (err) result(null);
    else {
      const x = user.filter((u) => u.email === data.email);
      if (x && x.length > 0) {
        let dataUser = {};
        const results = x.filter((x) => x.password === parseInt(data.password));
        if (results) {
          results.forEach((e) => {
            data.userName = e.userName;
            data.email = e.email;
            data.listProductLike = JSON.parse(e.listProductLike);
            data.id = e.id;
            data.userId = e.userId;
          });
          console.log(data.listProductLike);
          console.log("data", data);
          result(data);
        } else {
          result({ code: 2 });
        }
      } else {
        result({ code: 1 });
      }
    }
  });
};

User.adduser = (data, result) => {
  let newUserId;
  let newData = {};
  if (!data.listProductLike) data.listProductLike = [];
  // else data.listProductLike = JSON.stringify(data.listProductLike);
  db.query("SELECT * FROM user", (err, user) => {
    if (!err && user.length != 0) {
      newUserId = parseInt(user[user.length - 1].userId) + 1;
    } else newUserId = 12345;
    console.log("data", data);
    newData = {
      ...data,
      userId: newUserId,
    };
    const e = user.filter((u) => u.email === data.email);
    if (e.length > 0) {
      result(2);
    } else {
      newData.listProductLike = JSON.stringify(newData.listProductLike);
      db.query("INSERT INTO user SET ?", newData, (err, x) => {
        if (err) {
          console.log(err);
          result(1);
        } else {
          // data.listProductLike = parse(data);
          console.log("x", x);
          newData.id = x.insertId;
          console.log("data", newData);
          result(newData);
        }
      });
    }
  });
};
User.getById = (id, result) => {
  db.query("SELECT * FROM user WHERE id=?", id, (err, user) => {
    if (err) {
      result(1);
    } else if (user.length === 0) {
      result(2);
    } else {
      user[0].listProductLike = parse(user[0]);
      result(user);
    }
  });
};
User.remove = (id, result) => {
  db.query("DELETE  FROM user WHERE id=?", id, (err, user) => {
    if (err) {
      result(1);
    } else result("xóa thành công phần tử tại id là" + " " + id);
  });
};
User.update = (array, id, result) => {
  array.listProductLike = JSON.stringify(array.listProductLike);
  db.query("SELECT * FROM user WHERE id=?", id, (err, user) => {
    console.log("user trong db", user);
    let newData = {};
    user.map((user) => {
      newData = {
        ...user,
        email: array.email ? array.email : user.email,
        userName: array.userName ? array.userName : user.userName,
        password: array.password ? array.password : user.password,
        update_at: array.update_at ? array.update_at : user.update_at,
        listProductLike: array.listProductLike
          ? array.listProductLike
          : user.listProductLike,
        avata: array.avata ? array.avata : user.avata,
      };
    });
    if (newData) {
      db.query(
        `UPDATE user SET userName=?,userId=?,avata=?, gender=?,email=?,dress=?,create_at=?,update_at=?,date=?,password=?,listProductLike=?  WHERE id=?`,
        [
          newData.userName,
          newData.userId,
          newData.avata,
          newData.gender,
          newData.email,
          newData.dress,
          newData.create_at,
          newData.update_at,
          newData.date,
          newData.password,
          newData.listProductLike,
          id,
        ],
        (err, updateUser) => {
          console.log("err", err);
          if (err || user.length === 0) result(1);
          else {
            console.log("newData", newData);
            newData.listProductLike = JSON.parse(newData.listProductLike);
            result(newData);
          }
        }
      );
    }
  });
};
module.exports = User;
