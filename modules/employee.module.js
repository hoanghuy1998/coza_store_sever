const db = require("../common/connect_todo_mysql");
const x = require("../returnAPI");
const nowDate = x.getDate;
const formatDate = (d) => {
  if (d) {
    d = JSON.stringify(d);
    let day = parseInt(d?.slice(9, 11));
    let m = parseInt(d?.slice(6, 8));
    let year = parseInt(d?.slice(1, 5));
    console.log("m", m);
    if (
      (day === 31 && m === 1) ||
      m === 3 ||
      m === 5 ||
      m === 7 ||
      m === 8 ||
      m === 10 ||
      m === 12
    ) {
      day = 1;
      m++;
    } else if (
      (day === 30 && m === 4) ||
      m === 5 ||
      m === 6 ||
      m === 9 ||
      m === 11
    ) {
      day = 1;
      m++;
    } else if (day === 29) {
      day = 1;
      m++;
    } else if (day === 28 && year / 4 != 0) {
      day = 1;
      m++;
    } else {
      day++;
    }
    if (day < 10) {
      day = 0 + day.toString();
    }
    if (m < 10) {
      m = 0 + m.toString();
    }
    year = year.toString();

    return day + "-" + m + "-" + year;
  } else return d;
};
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
const returnInfo = (a) => {
  const x = [];

  a.forEach((a) => {
    x.push({
      id: a.id,
      username: a.username,
      position: a.position,
      create_at: formatDate(a.create_at),
      update_at: formatDate(a.update_at),
      expirationdate: formatDate(a.expirationdate),
    });
  });
  return x;
};
const Employee = (employee) => {
  (this.id = employee.id),
    (this.position = employee.position),
    (this.username = employee.username),
    (this.create_at = employee.create_at),
    (this.update_at = employee.update_at);
};
Employee.getAll = (result) => {
  db.query("SELECT * FROM employees", (err, employee) => {
    if (err) {
      result({
        code: err.code,
        message: err.message,
      });
    } else if (employee.length === 0) result({ code: 404 });
    else result(returnInfo(employee));
  });
};
module.exports = Employee;
