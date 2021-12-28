const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const nowDate = x.getDate;
const convertSrc = x.convertSrc;
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
    (this.age = User.age),
    (this.userId = User.userId),
    (this.avata = User.avata),
    (this.gender = this.gender),
    (this.email = User.email),
    (this.phone = User.phone),
    (this.password = User.password),
    (this.create_at = User.create_at),
    (this.update_at = User.update_at),
    (this.listProductLike = User.listProductLike),
    (this.dress = User.dress),
    (this.ward = User.ward),
    (this.distrist = User.distrist),
    (this.city = User.city);
};
User.getAll = (result) => {
  let newData = [];
  db.query("SELECT * FROM user", (err, user) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (user.length === 0) result(null);
    else {
      user.map((u) => {
        newData = [
          ...newData,
          {
            id: u.id,
            userId: u.userId,
            userName: u.userName,
            email: u.email,
            password: u.password,
          },
        ];
      });
      convertSrc(user);
      result(newData);
    }
  });
};
User.postUser = (data, result) => {
  console.log("do login");
  db.query("SELECT * FROM user", data, (err, user) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else {
      const x = user.filter((u) => u.email === data.email);
      if (x && x.length > 0) {
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
          result({ code: 406 });
        }
      } else {
        result(null);
      }
    }
  });
};

User.adduser = (data, result) => {
  // data = {
  //   userName,
  //   email,
  //   password,
  //   dress,
  //   ward,
  //   district,
  //   city,
  //   age,
  // };
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
      avata: data.avata
        ? data.avata
        : "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      create_at: nowDate(),
      update_at: nowDate(),
      dress: data.dress ? data.dress : "số 2 đinhh tiên hoàn",
      ward: data.ward ? data.ward : "phường 7",
      distrist: data.district ? data.district : "quận 4",
      city: data.city ? data.city : "TP HCM",
    };
    console.log("newdata", newData);
    const e = user.filter((u) => u.email === data.email);
    if (e.length > 0) result({ code: 406 });
    else {
      newData.listProductLike = JSON.stringify(newData.listProductLike);
      console.log(typeof newData.listProductLike);
      db.query("INSERT INTO user SET ?", newData, (err, x) => {
        if (err) {
          console.log("err", err);
          result({
            code: err.errno,
            message: err.message,
          });
        } else {
          newData.listProductLike = JSON.parse(newData.listProductLike);
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
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (user.length === 0) result(null);
    else {
      user[0].listProductLike = parse(user[0]);
      result(user);
    }
  });
};
User.remove = (id, result) => {
  db.query("DELETE  FROM user WHERE id=?", id, (err, user) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else result("xóa thành công phần tử tại id là" + " " + id);
  });
};
User.update = (array, id, result) => {
  db.query("SELECT * FROM user WHERE id=?", id, (err, user) => {
    console.log("user trong db", user);
    let newData = {};
    user.map((user) => {
      newData = {
        ...user,
        email: array.email ? array.email : user.email,
        userName: array.userName ? array.userName : user.userName,
        password: array.password ? array.password : user.password,
        update_at: nowDate(),
        listProductLike: array.listProductLike
          ? JSON.stringify(array.listProductLike)
          : user.listProductLike,
        avata: array.avata ? array.avata : user.avata,
        dress: array.dress ? array.dress : user.dress,
        ward: array.ward ? array.ward : user.ward,
        distrist: array.distrist ? array.distrist : user.distrist,
        city: array.city ? array.city : user.city,
      };
    });
    if (newData) {
      // newData.listProductLike = JSON.stringify(newData.listProductLike);
      db.query(
        `UPDATE user SET userName=?,userId=?,avata=?,gender=?,email=?,dress=?,create_at=?,update_at=?,age=?,password=?,listProductLike=?,ward=?,distrist=?,city=?,phone=?  WHERE id=?`,
        [
          newData.userName,
          newData.userId,
          newData.avata,
          newData.gender,
          newData.email,
          newData.dress,
          newData.create_at,
          newData.update_at,
          newData.age,
          newData.password,
          newData.listProductLike,
          newData.ward,
          newData.distrist,
          newData.city,
          newData.phone,
          id,
        ],
        (err, updateUser) => {
          console.log("err", err);
          if (err) {
            result({
              code: err.errno,
              message: err.message,
            });
          } else if (updateUser.length === 0) result(null);
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
