const express = require("express");
const cors = require("cors");
var multer = require("multer");
var upload = multer();
const app = express();
const port = process.env.PORT || 5000;
//cấu hình cors
app.use(cors());
// cấu hình body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routers/home.router")(app);
require("./routers/book.router")(app);
require("./routers/allproduct.router")(app);
require("./routers/myCartProduct.router")(app);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
