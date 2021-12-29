const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const upload = multer({
  dest: "temp/",
  limit: { fileSize: maxSize },
});
module.exports = (login) => {
  const loginUser = require("../controllers/login.controller");
  const authMiddleware = require("../middleware/authMiddleware");
  login.post("/login", loginUser.login);
  login.get("/refresh-token", loginUser.refreshToken);
  login.post("/user", upload.single("avata"), loginUser.addUser);
  login.use(authMiddleware.isAuth);
  login.get("/user/:id", loginUser.getUser_detail);
  login.get("/user", loginUser.getAll);
  login.post("/user/query", loginUser.addUser);
  login.put("/user/:id", loginUser.updateUser);
  login.delete("/user/:id", loginUser.deleteUser);
};
