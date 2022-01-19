const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const payload = x.payload;
const nowDate = x.getDate;
const convertSrc = x.convertSrc;
const Details = (Details) => {
  (this.id = Details.id),
    (this.name = Details.name),
    (this.productId = Details.productId),
    (this.srcImg = Details.srcImg),
    (this.price = Details.price),
    (this.quantity = Details.quantity),
    (this.codeOrder = Details.codeOrder),
    (this.create_at = Details.create_at),
    (this.update_at = Details.update_at),
    (this.total = Details.total);
};
Details.getAll = (result) => {
  db.query("SELECT * FROM productsolded_detail", (err, details) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (details.length === 0) result(null);
    else {
      convertSrc(details);
      result(details);
    }
  });
};
Details.getById = (id, result) => {
  db.query(
    "SELECT * FROM productsolded_detail WHERE id=?",
    id,
    (err, details) => {
      if (err) {
        result({
          code: err.errno,
          errorMessage: err.message,
        });
      } else if (details.length === 0) result(null);
      else {
        convertSrc(details);
        result(details);
      }
    }
  );
};
Details.getByQuery = (query, result) => {
  db.query("SELECT * FROM productsolded_detail", (err, details) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (details.length === 0) result(null);
    else {
      const filter = details.filter((d) => d.codeOrder === query.search);
      console.log("details", details);
      if (filter.length > 0) {
        convertSrc(filter);
        result(filter);
      } else result(null);
    }
  });
};
module.exports = Details;
