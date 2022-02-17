const mysql = require("mysql");
const connectionAllProduct = mysql.createConnection({
  // database: local,
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "dbcozastore",
  // database: server
  host: "sql6.freemysqlhosting.net",
  user: "sql6473412",
  password: "bkhBsqtIEc",
  database: "sql6473412",
});
connectionAllProduct.connect((err) => {
  if (err) {
    console.log("connect fails");
  } else {
    console.log("coneted cozastore");
  }
});
module.exports = connectionAllProduct;
