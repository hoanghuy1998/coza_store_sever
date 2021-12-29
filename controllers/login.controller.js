const User = require("../modules/login.modules");
const x = require("../returnAPI");
const fs = require("fs");
const payload = x.payload;

const jwtHelper = require("../jwt/jwt.helper");
let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "3h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "123456789";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "123456789";
// Thời gian sống của refreshToken
exports.upload = (req, res) => {
  console.log(req.body);
  if (req.file) {
    //   const x = req.file.originalname;
    //   const file = x.slice(0, x.lastIndexOf("."));
    //   const type = x.slice(x.lastIndexOf("."));
    //   let fileName = file + Date.now() + type;
    //   let newFile = __basedir + fileName;
    //   console.log("newFile", newFile);
    //   console.log("fileName", fileName);
    //   fs.readFile(req.file.path, function (err, data) {
    //     fs.writeFile(newFile, data, function (err) {
    //       if (err) {
    //         console.log("err", err);
    //         res.send("Write file error!");
    //       } else {
    //         res.send("success");
    //         console.log("data", newFile);
    //         // student.set("Image", fileName);
    //         // student.save("STU_ID=" + lastestId, function (err, row) {
    //         //   if (err) {
    //         //     res.send(Result.error(1, "Update image error!"));
    //         //   } else {
    //         //     student.set("STU_ID", lastestId);
    //         //     var reqUrl = url.format({
    //         //       protocol: req.protocol,
    //         //       host: req.get("host"),
    //         //       // pathname: req.originalUrl,
    //         //     });
    //         //     student.set("Image", reqUrl + "/data/student/" + fileName);
    //         //     res.send(Result.data(student));
    //         //   }
    //         // });
    //       }
    //     });
    //   });
    // }
    // res.send("hello");
  }
};
exports.getAll = (req, res) => {
  User.getAll((reqnse) => payload(res, reqnse));
};
exports.login = (req, res) => {
  User.postUser(req.headers.host, req.body, async (payload) => {
    if (!payload) {
      res.status("404").json({
        errorMessage: "Not Found",
      });
    } else if (payload.code) {
      switch (parseInt(payload.code)) {
        case 303:
          res.status("303").json({
            errorCode: 303,
            errorMessage: "See Other",
          });
          break;
        case 400:
          res.status("400").json({
            errorCode: 400,
            errorMessage: "Bad Request",
          });
          break;
        case 401:
          res.status("401").json({
            errorCode: 401,
            errorMessage: "Unauthorized",
          });
          break;
        case 405:
          res.status("405").json({
            errorCode: 405,
            errorMessage: "Method Not Allowed",
          });
          break;
        case 406:
          res.status("406").json({
            errorCode: 406,
            errorMessage: "Not Acceptable",
          });
          break;
        default:
          res.status("400").json({
            errorCode: payload.code,
            errorMessage: payload.message,
          });
          break;
      }
    } else {
      const accessToken = await jwtHelper.generateToken(
        payload,
        accessTokenSecret,
        accessTokenLife
      );
      const refreshToken = await jwtHelper.generateToken(
        payload,
        refreshTokenSecret,
        refreshTokenLife
      );
      tokenList[refreshToken] = { accessToken, refreshToken };
      res.status("200").json({
        errorCode: 0,
        data: payload,
        token: accessToken,
      });
    }
  });
};
exports.refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.headers["authorization"];
  console.log(refreshTokenFromClient);
  console.log(tokenList.refreshTokenFromClient);
  if (refreshTokenFromClient) {
    // if (refreshTokenFromClient && tokenList[refreshTokenFromCli ent]){
    const decoded = await jwtHelper.verifyToken(
      refreshTokenFromClient,
      refreshTokenSecret
    );
    const userFakeData = decoded.data;
    const accessToken = await jwtHelper.generateToken(
      userFakeData,
      accessTokenSecret,
      accessTokenLife
    );
    User.getById(userFakeData.id, (reqnse) => {
      res.status("200").json({
        errorCode: 0,
        data: reqnse,
        token: accessToken,
      });
    });
  } else {
    res.status(403).json({
      message: "Invalid refresh token.",
    });
  }
};
exports.addUser = (req, res) => {
  User.adduser(req, (reqnse) => payload(res, reqnse));
};
exports.getUser_detail = (req, res) => {
  User.getById(req.headers.host, req.params.id, (reqnse) =>
    payload(res, reqnse)
  );
};
exports.updateUser = (req, res) => {
  User.update(req.headers.host, req.body, req.params.id, (reqnse) =>
    payload(res, reqnse)
  );
};
exports.deleteUser = (req, res) => {
  User.remove(req.params.id, (reqnse) => payload(res, reqnse));
};
