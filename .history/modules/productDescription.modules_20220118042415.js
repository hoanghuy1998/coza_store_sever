const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const convertSrc = x.convertSrc;
const product = (product) => {
  (this.id = product.id),
    (this.productId = product.productId),
    (this.srcImg = product.srcImg);
};
product.productfilter = (host,query, result) => {
  db.query("SELECT * FROM productdescription", (err, product) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (product.length === 0) result(null);
    else {
      const x = product.filter((p) => p.productId === parseInt(query.search));
      if (x) {
       x.forEach((x=>x.srcImg=`${host}${x.srcImg}`))
        result(x);
      } else result(null);
    }
  });
};
module.exports = product;
