const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const convertSrc = x.convertSrc;
const product = (product) => {
  (this.id = product.id),
    (this.productId = product.productId),
    (this.srcImg = product.srcImg);
};
product.productfilter = (query, result) => {
  db.query("SELECT * FROM productdescription", (err, product) => {
    if (err) result({ code: 400 });
    else if (product.length === 0) result(null);
    else {
      console.log("product", product);
      const x = product.filter((p) => p.productId === parseInt(query.search));
      console.log("x", x);
      if (x) {
        convertSrc(x);
        result(x);
      } else result(null);
    }
  });
};
module.exports = product;
