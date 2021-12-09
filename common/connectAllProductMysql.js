const mysql = require("mysql");
const connectionAllProduct = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "dbcozastore",
//   database server
  host: "sql6.freesqldatabase.com",
  user: "sql6456957",
  password: "vzYvFN3QQF",
  database: "sql6456957",
});
connectionAllProduct.connect((err) => {
  if (err) {
    console.log("connect fails");
  } else {
    console.log("coneted cozastore");
  }
});
module.exports = connectionAllProduct;
