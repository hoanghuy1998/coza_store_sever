module.exports = (router) => {
  const details = require("../controllers/detail.controller");
  router.get("/details", details.getAll);
  router.get("/details/:id", details.getId);
  router.get("/detailsQuery", details.getQuery);
};
