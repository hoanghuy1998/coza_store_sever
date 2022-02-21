module.exports = (router) => {
  const Employee = require("../controllers/Employee.controller");
  router.get("/allemployee", Employee.getAllEmployee);
};
