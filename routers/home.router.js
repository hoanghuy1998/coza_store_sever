module.exports = (router) => {
  const homeController = require("../controllers/home.controller");
  router.get("/", homeController.home);
  router.get("/about", homeController.about);
};
