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
    (this.update_at = allproduct.update_at),
    (this.productId = allproduct.productId),
    (this.new = allproduct.new),
    (this.feature = allproduct.feature),
    (this.topRate = allproduct.topRate);
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
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) {
      result(null);
    } else {
      if (param.search && param.search != "undefined") {
        console.log("do search");
        const results = allproduct.filter(
          (p) =>
            p.color === param.search ||
            p.theme === param.search ||
            p.type === param.search ||
            p.tag === param.search ||
            p.sorfby === param.search ||
            p.productId === parseInt(param.search) ||
            p.status === parseInt(param.search) ||
            p.sale === param.search ||
            p.new === param.search ||
            p.seller === param.search ||
            p.feature === param.search ||
            p.topRate === param.search
        );

        result(results);
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
        result(filer);
      } else if (param.start && param.start != "undefined") {
        allproduct.sort(dynamicSort("price"));
        const filter = allproduct.filter(
          (a) => a.price >= parseInt(param.start)
        );
        if (filter.length > 0) result(filter);
        else result(null);
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
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) {
      result({
        errorCode: 1,
        errorMessage: "not found",
      });
    } else {
      const filter = allproduct.filter(
        (a) => a.theme === query.type || a.type === query.type
      );
      if (query.type && query.search && query.search != "undefined") {
        if (filter) {
          const x = filter.filter(
            (f) =>
              f.sorfby === query.search ||
              f.color === query.search ||
              f.tag === query.search
          );
          result({
            errorCode: 0,
            data: x,
          });
        } else {
          result({
            errorCode: 1,
            errorMessage: "not found",
          });
        }
      } else if (
        query.type &&
        query.start &&
        query.start &&
        query.end &&
        query.start != "undefined" &&
        query.end != "undefined"
      ) {
        console.log("do start and  end");
        filter.sort(dynamicSort("price"));
        const slice = filter.filter(
          (f) => f.price >= query.start && f.price <= query.end
        );
        if (slice) {
          result({
            errorCode: 0,
            data: slice,
          });
        } else {
          result({
            errorCode: 2,
            errorMessage: "not found",
          });
        }
      } else if (
        query.type &&
        query.start &&
        query.start != "undefined" &&
        query.end === "undefined"
      ) {
        console.log("do start and no end");
        filter.sort(dynamicSort("price"));
        const slice = filter.filter((f) => f.price >= query.start);
        if (slice) {
          result({
            errorCode: 0,
            data: slice,
          });
        } else {
          result({
            errorCode: 2,
            errorMessage: "not found",
          });
        }
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
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) {
      result({
        errorCode: 1,
        errorMessage: "not found",
      });
    } else {
      const filter = allproduct.filter(
        (a) => a.theme === query.type || a.type === query.type
      );
      if (query.order === "asc") {
        result({
          errorCode: 0,
          data: filter.sort(dynamicSort(query.sort)),
        });
      } else {
        result({
          errorCode: 0,
          data: filter.sort(dynamicSort(`-${query.sort}`)),
        });
      }
    }
  });
};
Allproduct.productFullSearchQuery = (query, result) => {
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) {
      result({
        errorCode: 1,
        errorMessage: "not found",
      });
    } else {
      const filter = allproduct.filter(
        (a) => a.theme === query.type || a.type === query.type
      );
      let searchs = [];
      const q = filter.map(
        (a) => a.name.toLowerCase().search(query.search) != -1
      );
      for (var i = 0; i < q.length; i++) {
        if (q[i] === true) {
          searchs.push(filter[i]);
        }
      }
      if (searchs.length > 0) {
        result({
          errorCode: 0,
          data: searchs,
        });
      } else {
        result({
          errorCode: 1,
          errorMessage: "not found",
        });
      }
    }
  });
};
Allproduct.getFullSearch = (query, result) => {
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) result(null);
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
        if (searchs.length > 0) result(searchs);
        else result(null);
      }
    }
  });
};
Allproduct.getPaging = (param, result) => {
  console.log("param", param);
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) {
      result(null);
    } else {
      if (param.page && param.perpage) {
        const page = param.page;
        const perpage = param.perpage;
        const totalPage = Math.ceil(allproduct.length / perpage);
        //
        const slice = allproduct.slice(
          page * perpage,
          parseInt(page * perpage) + parseInt(perpage)
        );
        //
        result({
          data: slice,
          pagingInfo: {
            page: page,
            pageLength: allproduct.length,
            totalRecord: perpage,
            totalPage: totalPage,
          },
        });
      } else {
        result(allproduct);
      }
    }
  });
};
Allproduct.getPagingSearch = (param, result) => {
  console.log("param", param);
  db.query("SELECT * FROM allproductshome", (err, allproduct) => {
    if (err || allproduct.length === 0) {
      result(null);
    } else {
      if (param.page && param.perpage && param.search) {
        const results = allproduct.filter(
          (p) =>
            p.color === param.search ||
            p.theme === param.search ||
            p.type === param.search ||
            p.tag === param.search ||
            p.sorfby === param.search ||
            p.productId === parseInt(param.search) ||
            p.status === parseInt(param.search) ||
            p.sale === param.search ||
            p.new === param.search ||
            p.seller === param.search ||
            p.feature === param.search ||
            p.topRate === param.search
        );
        const page = param.page;
        const perpage = param.perpage;
        const totalPage = Math.ceil(results.length / perpage);
        //
        const slice = results.slice(
          page * perpage,
          parseInt(page * perpage) + parseInt(perpage)
        );
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
    "UPDATE allproductshome SET name=?,srcImg=?,status=?, description=?,price=?,sale=?,create_at=?,update_at=?,productId=? WHERE id=?",
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
      if (err) result(null);
      else result({ id: id, ...array });
    }
  );
};

module.exports = Allproduct;
