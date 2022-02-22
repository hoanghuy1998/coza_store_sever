const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 3030;
const config = require("./config");

//cấu hình cors
app.use(cors());
// cấu hình body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/data", express.static(__dirname + "/resoure/avatars"));
app.use("/data", express.static(__dirname + "/resoure/imgs"));
/*config is our configuration variable.*/
app.use("/data", express.static(__dirname + "/resoure/images/products"));
app.use(
  "/data",
  express.static(__dirname + "/resoure/images/productsDescription")
);
app.use("/data", express.static(__dirname + "/resoure/upload"));
/*config is our configuration variable.*/
// Passport session setup.
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// Sử dụng FacebookStrategy cùng Passport.
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: config.facebook_key,
//       clientSecret: config.facebook_secret,
//       callbackURL: config.callback_url,
//       profileFields: config.profileFields,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       process.nextTick(function () {
//         return done(null, profile);
//       });
//     }
//   )
// );
// app.use(cookieParser()); //Parse cookie
// app.use(session({ secret: "keyboard cat", key: "sid" })); //Save user login
// app.use(passport.initialize());
// app.use(passport.session());

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
// require("./routers/todo.router")(app);
// require("./routers/employee.router")(app);
require("./routers/user.router")(app);
require("./routers/product.router")(app);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
