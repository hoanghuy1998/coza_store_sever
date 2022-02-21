const mysql = require("mysql");
const connect_todo_mysql = mysql.createConnection({
  // database: local,
  host: "localhost",
  user: "root",
  password: "",
  database: "todo-list",
  // database: server
  // host: "sql6.freemysqlhosting.net",
  // user: "sql6471111",
  // password: "p9pyzmkTcR",
  // database: "sql6471111",
});
connect_todo_mysql.connect((err) => {
  if (err) {
    console.log("connect fails");
  } else {
    console.log("coneted todo-list");
  }
});
module.exports = connect_todo_mysql;
