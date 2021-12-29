const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

//cấu hình cors
app.use(cors());
// cấu hình body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/data", express.static(__dirname + "/resoure/images/products"));
app.use(
  "/data",
  express.static(__dirname + "/resoure/images/productsDescription")
);
app.use("/data", express.static(__dirname + "/resoure/upload"));

require("./routers/home.router")(app);
require("./routers/book.router")(app);
require("./routers/allproduct.router")(app);
require("./routers/myCartProduct.router")(app);
require("./routers/login.router")(app);
require("./routers/comments.router")(app);
require("./routers/productSolded.router")(app);
require("./routers/productDescription.router")(app);
require("./routers/details.router")(app);
require("./routers/blogs.router")(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
