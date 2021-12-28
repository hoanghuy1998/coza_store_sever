const User = require("../modules/login.modules");
const x = require("../returnAPI");
const payload = x.payload;
const jwtHelper = require("../jwt/jwt.helper");
const debug = console.log.bind(console);
let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "3h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "123456789";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "123456789";
// Thời gian sống của refreshToken
exports.getAll = (req, res) => {
  User.getAll((reqnse) => payload(res, reqnse));
};
exports.login = (req, res) => {
  User.postUser(req.body, async (reqnse) => {
    if (!reqnse) {
      res.status("406").json({
        errorMessage: "Not Acceptable",
      });
    } else if (reqnse.code === 1) {
      res.status("404").json({
        errorCode: reqnse.code,
        errorMessage: "Not Found",
      });
    } else if (reqnse.code === 2) {
      res.status("200").json({
        errorCode: reqnse.code,
        errorMessage: "Email or Password wrong",
      });
    } else {
      const accessToken = await jwtHelper.generateToken(
        reqnse,
        accessTokenSecret,
        accessTokenLife
      );
      const refreshToken = await jwtHelper.generateToken(
        reqnse,
        refreshTokenSecret,
        refreshTokenLife
      );
      tokenList[refreshToken] = { accessToken, refreshToken };
      res.status("200").json({
        errorCode: 0,
        data: reqnse,
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
  User.adduser(req.body, (reqnse) => payload(res, reqnse));
};
exports.getUser_detail = (req, res) => {
  User.getById(req.params.id, (reqnse) => payload(res, reqnse));
};
exports.updateUser = (req, res) => {
  User.update(req.body, req.params.id, (reqnse) => payload(res, reqnse));
};
exports.deleteUser = (req, res) => {
  User.remove(req.params.id, (reqnse) => payload(res, reqnse));
};
