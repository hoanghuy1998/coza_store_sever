const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const convertSrc = x.convertSrc;
const parse = x.parse;
const stringify = x.stringify;
const Allproduct = (allproduct) => {
  (this.id = allproduct.id),
    (this.productId = allproduct.productId),
    (this.name = allproduct.name),
    (this.srcImg = allproduct.srcImg),
    (this.status = allproduct.status),
    (this.color = allproduct.color),
    (this.type = allproduct.type),
    (this.description = this.description),
    (this.sorfby = allproduct.sorfby),
    (this.price = allproduct.price),
    (this.create_at = allproduct.create_at),
    (this.update_at = allproduct.update_at),
    (this.totalquantitys = allproduct.totalquantitys),
    (this.tag = allproduct.tag);
};
Allproduct.get_all = (result) => {
  let i = 0;
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      convertSrc(allproduct);
      parse(allproduct);
      result(allproduct);
    }
  });
};

Allproduct.getById = (id, result) => {
  db.query("SELECT * FROM products WHERE id=?", id, (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      convertSrc(allproduct);
      parse(allproduct);
      result(allproduct);
    }
  });
};
Allproduct.getByParam = (param, result) => {
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  console.log("param", param);
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      convertSrc(allproduct);
      parse(allproduct);
      let data = [];
      if (param.search && param.search != "undefined") {
        console.log("do search");
        const results = allproduct.filter(
          (p) =>
            p.color === param.search ||
            p.tag === param.search ||
            p.sorfby === param.search ||
            p.productId === parseInt(param.search)
        );
        if (results.length === 0) {
          const status = allproduct.map((a) =>
            a.status.filter((t) => t === param.search)
          );
          const type = allproduct.map((a) =>
            a.type.filter((t) => t === param.search)
          );
          const x = (a) => {
            for (let i = 0; i < a.length; i++) {
              if (a[i].length > 0) data.push(allproduct[i]);
            }
          };
          x(status);
          x(type);
          if (data.length > 0) result(data);
          else result(null);
        } else result(results);
      } else if (
        param.sort &&
        param.order &&
        param.sort != "undefined" &&
        param.order != "undefined"
      ) {
        if (param.order === "asc") allproduct.sort(dynamicSort(param.sort));
        else allproduct.sort(dynamicSort(`-${param.sort}`));
        result(allproduct);
      } else if (
        param.start &&
        param.end &&
        param.start != "undefined" &&
        param.end != "undefined"
      ) {
        allproduct.sort(dynamicSort("price"));
        const filer = allproduct.filter(
          (a) =>
            a.price >= parseInt(param.start) && a.price <= parseInt(param.end)
        );
        if (filer.length > 0) result(filer);
        else result(null);
      } else if (param.start && param.start != "undefined") {
        allproduct.sort(dynamicSort("price"));
        const filter = allproduct.filter(
          (a) => a.price >= parseInt(param.start)
        );
        if (filter.length > 0) {
          convertSrc(filter);
          result(filter);
        } else result(null);
      } else if (!param) {
        result(allproduct);
      }
    }
  });
};
Allproduct.productFilterQuery = (query, result) => {
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  console.log("query", query);
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      convertSrc(allproduct);
      parse(allproduct);
      let datas = [];
      const fil = allproduct.map((a) => {
        const b = a.type.filter((t) => t === query.type);
        if (b.length > 0) datas.push(a);
      });
      if (query.type && query.search && query.search != "undefined") {
        if (datas) {
          let dataQuery = [];
          const x = datas.filter(
            (f) =>
              f.sorfby === query.search ||
              f.color === query.search ||
              f.tag === query.search
          );
          if (x.length > 0) result(x);
          else {
            datas.map((d) => {
              const e = d.status.filter((s) => s === query.search);
              if (e.length > 0) dataQuery.push(d);
            });
            convertSrc(dataQuery);
            result(dataQuery);
          }
        } else result(null);
      } else if (
        query.type &&
        query.start &&
        query.start &&
        query.end &&
        query.start != "undefined" &&
        query.end != "undefined"
      ) {
        console.log("do start and  end");
        datas.sort(dynamicSort("price"));
        const slice = datas.filter(
          (f) => f.price >= query.start && f.price <= query.end
        );
        if (slice) {
          result(slice);
        } else result(null);
      } else if (
        query.type &&
        query.start &&
        query.start != "undefined" &&
        query.end === "undefined"
      ) {
        console.log("do start and no end");
        datas.sort(dynamicSort("price"));
        const slice = datas.filter((f) => f.price >= query.start);
        if (slice) {
          result(slice);
        } else result(null);
      }
    }
  });
};
Allproduct.productSortQuery = (query, result) => {
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      convertSrc(allproduct);
      parse(allproduct);
      let newData = [];
      allproduct.map((a) => {
        const b = a.type.filter((t) => t === query.type);
        if (b.length > 0) newData.push(a);
      });
      if (newData.length > 0) {
        if (query.order === "asc") {
          newData = newData.sort(dynamicSort(query.sort));
          result(newData);
        } else {
          newData = newData.sort(dynamicSort(`-${query.sort}`));
          result(newData);
        }
      } else result(null);
    }
  });
};
Allproduct.productFullSearchQuery = (query, result) => {
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err || allproduct.length === 0) result(1);
    else {
      let newData = [];
      parse(allproduct);
      allproduct.map((a) => {
        const x = a.type.filter((t) => t === query.type);
        if (x.length > 0) newData.push(a);
      });
      let searchs = [];
      const q = newData.map(
        (a) => a.name.toLowerCase().search(query.search) != -1
      );
      for (var i = 0; i < q.length; i++) {
        if (q[i] === true) {
          searchs.push(newData[i]);
        }
      }
      if (searchs.length > 0) {
        convertSrc(searchs);
        result(searchs);
      } else result(null);
    }
  });
};
Allproduct.getFullSearch = (query, result) => {
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      if (query.search) {
        let searchs = [];
        const q = allproduct.map(
          (a) => a.name.toLowerCase().search(query.search) != -1
        );
        for (var i = 0; i < q.length; i++) {
          if (q[i] === true) {
            searchs.push(allproduct[i]);
          }
        }
        if (searchs.length > 0) {
          convertSrc(searchs);
          result(searchs);
        } else result(null);
      }
    }
  });
};
Allproduct.getPaging = (param, result) => {
  console.log("param", param);
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      convertSrc(allproduct);
      parse(allproduct);
      if (param.page && param.perpage) {
        const page = parseInt(param.page);
        const perpage = parseInt(param.perpage);
        const totalPage = Math.ceil(allproduct.length / perpage);
        //
        const slice = allproduct.slice(
          page * perpage,
          page * perpage + perpage
        );
        //
        if (slice.length > 0)
          result({
            data: slice,
            pagingInfo: {
              page: page,
              pageLength: allproduct.length,
              totalRecord: perpage,
              totalPage: totalPage,
            },
          });
        else result(null);
      } else {
        result(allproduct);
      }
    }
  });
};
Allproduct.getPagingSearch = (param, result) => {
  console.log("param", param);
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) result({ code: 400 });
    else if (allproduct.length === 0) result(null);
    else {
      let results;
      convertSrc(allproduct);
      parse(allproduct);
      if (param.page && param.perpage && param.search) {
        results = allproduct.filter(
          (p) =>
            p.color === param.search ||
            p.tag === param.search ||
            p.sorfby === param.search
        );
        if (results.length === 0) {
          allproduct.map((a) => {
            const b = a.status.filter((s) => s === param.search);
            if (b.length > 0) results.push(a);
          });
          allproduct.map((a) => {
            const b = a.type.filter((t) => t === param.search);
            if (b.length > 0) results.push(a);
          });
        }
        const page = parseInt(param.page);
        const perpage = parseInt(param.perpage);
        const totalPage = Math.ceil(results.length / perpage);
        //
        const slice = results.slice(page * perpage, page * perpage + perpage);
        //
        if (slice) {
          result({
            data: slice,
            pagingInfo: {
              page: page,
              pageLength: results.length,
              totalRecord: perpage,
              totalPage: totalPage,
            },
          });
        } else result(null);
      } else {
        result(allproduct);
      }
    }
  });
};
Allproduct.create = (data, result) => {
  db.query("INSERT INTO products SET ?", data, (err, allproduct) => {
    if (err) {
      console.log("err", err);
      result({ code: 400 });
    } else if (allproduct.length === 0) result(null);
    else result({ ...data, id: allproduct.inserId });
  });
};
Allproduct.remove = (id, result) => {
  db.query("DELETE  FROM products WHERE id=?", id, (err, allproduct) => {
    if (err) result({ code: 400 });
    else result("xóa thành công phần tử tại id là" + id);
  });
};
Allproduct.update = (array, id, result) => {
  console.log("id", id);
  db.query(
    "UPDATE products SET name=?,srcImg=?,status=?, description=?,price=?,sale=?,create_at=?,update_at=?,productId=? WHERE id=?",
    [
      array.name,
      array.srcImg,
      array.status,
      array.description,
      array.price,
      array.sale,
      array.create_at,
      array.update_at,
      array.productId,
      id,
    ],
    (err, allproduct) => {
      if (err) result({ code: 400 });
      else result({ id: id, ...array });
    }
  );
};

module.exports = Allproduct;
