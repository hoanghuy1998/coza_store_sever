const multer = require("multer");
const passport = require("passport");
const maxSize = 2 * 1024 * 1024;
const upload = multer({
  dest: "temp/",
  limit: { fileSize: maxSize },
});
module.exports = (login) => {
  const loginUser = require("../controllers/user.controller");
  const authMiddleware = require("../middleware/authMiddleware");
  login.post("/ticker/login", loginUser.login);
  login.get("/ticker/refresh-token", loginUser.refreshToken);
  login.post("/ticker/user", upload.single("avata"), loginUser.addUser);
  login.get(
    "/ticker/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );
  login.get(
    "/ticker/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/ticker/checkUser",
      failureRedirect: "/ticker/fails",
    })
  );
  login.post("/ticker/reset_password/:id", loginUser.sendMail);
  login.get("/ticker/account", ensureAuthenticated, function (req, res) {});
  login.get("/ticker/checkUser", loginUser.checkUser);
  login.get("/ticker/logout", loginUser.logOut);
  // login.use(authMiddleware.isAuth);
  login.post("/ticker/changepassword/:id", loginUser.changepassword);
  login.get("/ticker/user/:id", loginUser.getUser_detail);
  login.get("/ticker/user", loginUser.getAll);
  login.post("/ticker/user", loginUser.addUser);
  login.put("/ticker/user/:id", loginUser.updateUser);
  login.delete("/ticker/user/:id", loginUser.deleteUser);
};
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/ticker/");
}
