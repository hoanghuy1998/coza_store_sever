const mysql = require("mysql");
const connectionAllProduct = mysql.createConnection({
  // database: local,
  host: "localhost",
  user: "root",
  password: "",
  database: "dbcozastore",
  // database: server
  // host: "sql6.freesqldatabase.com",
  // user: "sql6462165",
  // password: "SN2HTS9d73",
  // database: "sql6462165",
});
connectionAllProduct.connect((err) => {
  if (err) {
    console.log("connect fails");
  } else {
    console.log("coneted cozastore");
  }
});
module.exports = connectionAllProduct;
