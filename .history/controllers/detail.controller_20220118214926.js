const details = require("../modules/detail.modules");
const x = require("../returnAPI");
const payload = x.payload;

exports.getAll = (req, res) => {
  details.getAll((reqnse) => payload(res, reqnse));
};
exports.getId = (req, res) => {
  details.getById(req.params.id, (reqnse) => payload(res, reqnse));
};
exports.getQuery = (req, res) => {
  const host = req.protocol + "://" + req.get("Host") + "/data/";
  details.getByQuery(req.query, (reqnse) => payload(res, reqnse));
};
