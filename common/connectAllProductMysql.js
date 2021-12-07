const mysql = require("mysql");
const connectionAllProduct = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6456957",
  password: "vzYvFN3QQF",
  database: "sql6456957",
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
