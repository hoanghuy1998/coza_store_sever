const db = require("../common/connectAllProductMysql");
const fs = require("fs");
const path = require("path");
const __basedir = path.join(__dirname, "../resoure/upload/");
const x = require("../returnAPI");
const nowDate = x.getDate;
const convertSrc = x.convertSrc;
const avataConvertSrc = (r) => `http://localhost:5000/data/${r}`;
var pbkdf2 = require("pbkdf2");
const saltRounds = 10;

//test get username
// db.query(
//   "select * from user where userName='" + "hoang huy" + "'     ",
//   function (err, user) {
//     console.log("err", err);
//     console.log("user", user);
//   }
// );

//
const parse = (a) => {
  a.listProductLike = JSON.parse(a.listProductLike);
};
const stringify = (a) => {
  a.listProductLike = JSON.stringify(a.listProductLike);
};
const makeid = (l) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < l; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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
    (this.city = User.city),
    (this.role = User.role);
};
User.getAll = (host, result) => {
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
            avata: `${host}${u.avata}`,
            phone: u.phone,
            dress: u.dress,
            ward: u.ward,
            district: u.district,
            city: u.city,
            age: u.age,
            role: u.role,
          },
        ];
      });
      convertSrc(user);
      result(newData);
    }
  });
};
User.checkUser = (host, data, result) => {
  const chekcNewDataAsnyc = new Promise((resolve, reject) => {
    db.query(
      "select * from user where userName='" + data.displayName + "'     ",
      (err, user) => {
        if (err || user.length === 0) reject(data);
        else resolve(user[0]);
      }
    );
  });
  chekcNewDataAsnyc
    .then((data) => {
      const newDataUser = { ...data };
      const payload = {
        id: newDataUser.id,
        userId: newDataUser.userId,
        userName: newDataUser.userName,
        email: newDataUser.email,
        avata: `${host}Avatar-Facebook.jpg`,
        phone: newDataUser.phone,
        dress: newDataUser.dress,
        ward: newDataUser.ward,
        district: newDataUser.district,
        city: newDataUser.city,
        age: newDataUser.age,
        role: newDataUser.role,
        listProductLike: [],
      };
      result(payload);
    })
    .catch((err) => {
      console.log("err", err);
      const newDataUser = {
        userName: err?.displayName || err?.username,
        email: err.email ? err.email : "example@gmail.com",
        userId: err.id,
        phone: err.phone ? err.phone : 0909090909,
        age: err.age ? err.age : 18,
        create_at: nowDate(),
        update_at: nowDate(),
        dress: err.dress ? err.dress : "số 2 đinhh tiên hoàn",
        ward: err.ward ? err.ward : "phường 7",
        district: err.district ? err.district : "quận 4",
        city: err.city ? err.city : "TP HCM",
      };
      console.log(newDataUser);
      db.query("INSERT INTO user SET ?", newDataUser, (err, x) => {
        if (err) {
          result({
            code: err.errno,
            message: err.message,
          });
        } else {
          const payload = {
            id: newDataUser.id,
            userId: newDataUser.userId,
            userName: newDataUser.userName,
            email: newDataUser.email,
            avata: `${host}Avatar-Facebook.jpg`,
            phone: newDataUser.phone,
            dress: newDataUser.dress,
            ward: newDataUser.ward,
            district: newDataUser.district,
            city: newDataUser.city,
            age: newDataUser.age,
            role: newDataUser.role,
            listProductLike: [],
          };
          result(payload);
        }
      });
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
        const hashPasswordAnsyc = new Promise((resolve, reject) => {
          const y = pbkdf2
            .pbkdf2Sync(data.password, "salt", 1, saltRounds, "sha512")
            .toString("hex");
          if (x[0].password === y) {
            const dataPayload = {
              userName: x[0].userName,
              email: x[0].email,
              listProductLike: JSON.parse(x[0].listProductLike),
              id: x[0].id,
              userId: x[0].userId,
              avata: `${host}${x[0].avata}`,
              dress: x[0].dress,
              ward: x[0].ward,
              district: x[0].district,
              city: x[0].city,
              role: x[0].role,
              phone: x[0].phone,
            };
            resolve(dataPayload);
          } else {
            reject({
              code: 200,
              message: "password wront",
            });
          }
        });
        hashPasswordAnsyc
          .then((data) => {
            console.log("data", data);
            result(data);
          })
          .catch((err) => result(err));
      } else
        result({
          code: 200,
          message: "email invalid",
        });
    }
  });
};

User.adduser = (headers, req, result) => {
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

  if (req.file) {
    const x = req.file.originalname;
    const file = x.slice(0, x.lastIndexOf("."));
    const type = x.slice(x.lastIndexOf("."));
    let fileName = file + "-" + Date.now() + type;
    let newFile = __basedir + fileName;
    const readFileAsnyc = new Promise((resolve, reject) => {
      fs.readFile(req.file.path, (err, data) => {
        if (err) reject(err);
        else {
          fs.writeFile(newFile, data, (err2) => {
            if (err2) reject(err2);
            else {
              fs.unlink(req.file.path, (err3) => {
                if (err3) reject(err3);
                else resolve(req.body);
              });
            }
          });
        }
      });
    });
    readFileAsnyc
      .then((data) => {
        const getUserIdAsnyc = new Promise((resolve, reject) => {
          if (!data.listProductLike) data.listProductLike = [];
          else data.listProductLike = JSON.stringify(data.listProductLike);
          db.query("SELECT * FROM user", (err, user) => {
            if (err) {
              reject({
                code: err.errno,
                message: err.message,
              });
            } else {
              let newUserId;
              if (user.length === 0) newUserId = makeid(5);
              else {
                do newUserId = makeid(5);
                while (user.forEach((u) => u.userId === newUserId));
              }
              resolve({ data, newUserId, user });
            }
          });
        });
        return getUserIdAsnyc;
      })
      .then(({ data, newUserId, user }) => {
        const hashPasswordAnsyc = new Promise((resolve, reject) => {
          const x = pbkdf2
            .pbkdf2Sync(data.password, "salt", 1, saltRounds, "sha512")
            .toString("hex");
          console.log(" x;", x);
          data.password = x;
          console.log("data", data);
          resolve({ data, newUserId, user });
        });
        return hashPasswordAnsyc;
      })
      .then(({ data, newUserId, user }) => {
        const createNewDataUserAnsyc = new Promise((resolve, reject) => {
          const newDataUser = {
            ...data,
            userId: newUserId,
            avata: fileName,
            create_at: nowDate(),
            update_at: nowDate(),
            dress: data.dress ? data.dress : "số 2 đinhh tiên hoàn",
            ward: data.ward ? data.ward : "phường 7",
            district: data.district ? data.district : "quận 4",
            city: data.city ? data.city : "TP HCM",
          };
          if (newDataUser) resolve({ newDataUser, user });
          else reject(null);
        });
        return createNewDataUserAnsyc;
      })
      .then(({ newDataUser, user }) => {
        const checkEmailAnsyc2 = new Promise((resolve, reject) => {
          const check = user.filter((u) => u.email === newDataUser.email);
          if (check.length > 0) {
            fs.unlink(`${__basedir}${newDataUser.avata}`, (err3) => {});
            reject({
              code: 200,
              message: "Email already exists",
            });
          } else resolve(newDataUser);
        });
        return checkEmailAnsyc2;
      })
      .then((data) => {
        const addUserAsnyc = new Promise((resolve, reject) => {
          data.listProductLike = JSON.stringify(data.listProductLike);
          db.query("INSERT INTO user SET ?", data, (err, x) => {
            if (err) {
              reject({
                code: err.errno,
                message: err.message,
              });
            } else {
              const payload = {
                userName: data.userName,
                email: data.email,
              };
              resolve(payload);
            }
          });
        });
        return addUserAsnyc;
      })
      .then((data) => result(data))
      .catch((err) => result(err));
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
      const payload = {
        id: user[0].id,
        userId: user[0].userId,
        userName: user[0].userName,
        email: user[0].email,
        avata: `${host}${user[0].avata}`,
        phone: user[0].phone,
        dress: user[0].dress,
        ward: user[0].ward,
        district: user[0].district,
        city: user[0].city,
        age: user[0].age,
        role: user[0].role,
        listProductLike: JSON.parse(user[0].listProductLike),
      };
      result(payload);
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
    console.log("array", typeof array);
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
            const payload = {
              userName: newData.userName,
              email: newData.email,
              listProductLike: JSON.parse(newData.listProductLike),
              id: newData.id,
              userId: newData.userId,
              avata: `${host}${newData.avata}`,
            };
            console.log("payload", payload);
            result(payload);
          }
        }
      );
    }
  });
};
module.exports = User;
