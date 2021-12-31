const db = require("../common/connectAllProductMysql");
const fs = require("fs");
const path = require("path");
const __basedir = path.join(__dirname, "../resoure/upload/");
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
    (this.district = User.district),
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
User.postUser = (host, data, result) => {
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
        console.log("results", results);
        if (results.length === 0) result({ code: 406 });
        else {
          console.log("do ele");
          results.forEach((e) => {
            data.userName = e.userName;
            data.email = e.email;
            data.listProductLike = JSON.parse(e.listProductLike);
            data.id = e.id;
            data.userId = e.userId;
            data.avata =
              // e.avata = `https://hoanghuy1998.herokuapp.com/data/${e.avata}`;
              data.avata =
              e.avata =
                `http://localhost:5000/data/${e.avata}`;
          });
          console.log(data.listProductLike);
          console.log("data", data);
          result(data);
        }
      } else {
        result(null);
      }
    }
  });
};

User.adduser = (host, req, result) => {
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
  const makeid = (l) => {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < l; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  let newUserId;
  let newData = {};
  if (req.file) {
    const x = req.file.originalname;
    const file = x.slice(0, x.lastIndexOf("."));
    const type = x.slice(x.lastIndexOf("."));
    let fileName = file + "-" + Date.now() + type;
    let newFile = __basedir + fileName;
    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(newFile, data, function (err) {
        if (err) {
          result({
            code: err.errno,
            message: err.message,
          });
        } else {
          fs.unlink(req.file.path, function (err) {
            if (!err) {
              const data = req.body;
              console.log("data", data);
              if (!data.listProductLike) data.listProductLike = [];
              else data.listProductLike = JSON.stringify(data.listProductLike);
              db.query("SELECT * FROM user", (err, user) => {
                if (err || user.length != 0)
                  do {
                    newUserId = makeid(5);
                  } while (user.forEach((e) => e.userId === newUserId));
                else newUserId = makeid(5);
                newData = {
                  ...data,
                  userId: newUserId,
                  avata: fileName
                    ? fileName
                    : "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
                  create_at: nowDate(),
                  update_at: nowDate(),
                  dress: data.dress ? data.dress : "số 2 đinhh tiên hoàn",
                  ward: data.ward ? data.ward : "phường 7",
                  district: data.district ? data.district : "quận 4",
                  city: data.city ? data.city : "TP HCM",
                };
                const e = user.filter((u) => u.email === data.email);
                if (e.length > 0) result({ code: 406 });
                else {
                  newData.listProductLike = JSON.stringify(
                    newData.listProductLike
                  );
                  db.query("INSERT INTO user SET ?", newData, (err, x) => {
                    if (err) {
                      result({
                        code: err.errno,
                        message: err.message,
                      });
                    } else {
                      newData.listProductLike = JSON.parse(
                        newData.listProductLike
                      );
                      newData.id = x.insertId;
                      // newData.avata = `https://hoanghuy1998.herokuapp.com/data/${newData.avata}`;
                      newData.avata = `http://localhost:5000/data/${newData.avata}`;
                      //hoanghuy1998.herokuapp.com/data/
                      https: result(newData);
                    }
                  });
                }
              });
            } else result({ code: 400 });
          });
        }
      });
    });
  } else result({ code: 400 });
};
User.getById = (host, id, result) => {
  db.query("SELECT * FROM user WHERE id=?", id, (err, user) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (user.length === 0) result(null);
    else {
      user[0].listProductLike = parse(user[0]);
      // user[0].avata = `https://hoanghuy1998.herokuapp.com/data/${user[0].avata}`;
      user[0].avata = `http://localhost:5000/data/${user[0].avata}`;
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
User.update = (host, array, id, result) => {
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
        avata: array.avata ? array.avata : `${host}/data/${user.avata}`,
        dress: array.dress ? array.dress : user.dress,
        ward: array.ward ? array.ward : user.ward,
        district: array.district ? array.district : user.district,
        city: array.city ? array.city : user.city,
      };
    });
    if (newData) {
      // newData.listProductLike = JSON.stringify(newData.listProductLike);
      db.query(
        `UPDATE user SET userName=?,userId=?,avata=?,gender=?,email=?,dress=?,create_at=?,update_at=?,age=?,password=?,listProductLike=?,ward=?,district=?,city=?,phone=?  WHERE id=?`,
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
          newData.district,
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
            // newData.avata =
            result(newData);
          }
        }
      );
    }
  });
};
module.exports = User;
