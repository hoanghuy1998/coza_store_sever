module.exports = (login) => {
  const loginUser = require("../controllers/login.controller");
  login.post("/login", loginUser.login);
  login.get("/user/:id", loginUser.getUser_detail);
  login.post("/user", loginUser.addUser);
  //   login.post("/user/query", loginUser.addUser);
  login.put("/user/:id", loginUser.updateUser);
  login.delete("/user/:id", loginUser.deleteUser);
};
