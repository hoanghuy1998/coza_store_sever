const db = require("../common/connectAllProductMysql");

const Allproduct = (allproduct) => {
  (this.id = allproduct.id),
    (this.name = allproduct.name),
    (this.srcImg = allproduct.srcImg),
    (this.status = allproduct.status),
    (this.description = this.description),
    (this.price = allproduct.price),
    (this.sale = allproduct.sale),
    (this.create_at = allproduct.create_at),
    (this.update_at = allproduct.update_at);
};
Allproduct.get_all = (result) => {
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err) result(null);
    else result(allproduct);
  });
};

Allproduct.getById = (id, result) => {
  db.query(
    "SELECT * FROM allproductshome WHERE id=?",
    id,
    (err, allproduct) => {
      if (err || allproduct.length === 0) result(null);
      else result(allproduct);
    }
  );
};
Allproduct.getByParam = (param, result) => {
        function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                /* next line works with strings and numbers, 
                 * and you may want to customize it to your needs
                 */
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) {
      result(null);
    } else {
      if (param.search) {
        const results = allproduct.filter(
          (p) =>
            p.color === param.search ||
            p.theme === param.search ||
            p.type === param.search ||
            p.tag === param.search ||
            p.sorfby === param.search ||
            p.status === parseInt(param.search)
        );
        result(results);
      } else if(param.sort&& param.order){
        if(param.order==='asc') allproduct.sort(dynamicSort(param.sort))
        else allproduct.sort(dynamicSort(`-${param.sort}`))
        result(allproduct)
      } else if(param.start&& param.end){
        let map
        allproduct.sort(dynamicSort('price'))
        const filer=allproduct.filter(a=>a.price>=parseInt(param.start)&&a.price<=parseInt(param.end))
        result(filer)
      }  else {
        result(allproduct);
      }
    }
  });
};
Allproduct.getPaging = (param, result) => {
   db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if(err||allproduct.length === 0){
      result(null)
    }else{
      if(param.page&&param.perpage) {
          const page=param.page
          const perpage=param.perpage
          const totalPage=Math.ceil(allproduct.length/perpage)
          //
          const slice=allproduct.slice(page*perpage,parseInt(page*perpage)+parseInt(perpage))
          console.log(parseInt(page*perpage)+parseInt(perpage))
          //
          result({
            data:slice,
            pagingInfo:{
            page:page,
            pageLength:allproduct.length,
            totalRecord:perpage,
            totalPage:totalPage,
            }
          })
      } else {
        result(allproduct);
      }
    }
   })
}
Allproduct.create = (data, result) => {
  db.query("INSERT INTO allproductshome SET ?", data, (err, allproduct) => {
    // console.log("allproduct.inserId", allproduct.inserId);
    // console.log("allproduct", allproduct);
    console.log("err", err);
    // console.log("data", data);
    if (err) {
      console.log("err", err);
      result(null);
    }
    result({ id: allproduct.inserId, ...data });
  });
};
Allproduct.remove = (id, result) => {
  db.query("DELETE  FROM allproductshome WHERE id=?", id, (err, allproduct) => {
    if (err) result(null);
    else result("xóa thành công phần tử tại id là" + id);
  });
};
Allproduct.update = (array, id, result) => {
  console.log("id", id);
  db.query(
    "UPDATE allproductshome SET name=?,srcImg=?,status=?, description=?,price=?,sale=?,create_at=?,update_at=? WHERE id=?",
    [
      array.name,
      array.srcImg,
      array.status,
      array.description,
      array.price,
      array.sale,
      array.create_at,
      array.update_at,
      id,
    ],
    (err, allproduct) => {
      result({ id: id, ...array });
    }
  );
};

module.exports = Allproduct;
