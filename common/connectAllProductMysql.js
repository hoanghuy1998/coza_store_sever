const mysql = require("mysql");
const connectionAllProduct = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbcozastore",
});
connectionAllProduct.connect((err) => {
  console.log("err",err)
  if (err) {
    console.log("connect fails");
  } else {
    console.log("coneted cozastore");
  }
});
module.exports = connectionAllProduct;
