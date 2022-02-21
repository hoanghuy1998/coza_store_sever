const Employee = require("../modules/Employee.module");
const x = require("../returnAPI");
const payload = x.payload;
exports.getAllEmployee = (req, res) => {
  Employee.getAll((myRes) => payload(res, myRes));
};
