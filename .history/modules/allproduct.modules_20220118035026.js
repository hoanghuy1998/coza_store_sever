const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const { ifError } = require("assert");
const __basedirImgPrimary = path.join(__dirname, "../resoure/images/products/");
const __basedirImgDescription = path.join(
  __dirname,
  "../resoure/images/productsDescription/"
);
const convertSrc = x.convertSrc;host,
const parse = x.parse;
const stringify = x.stringify;
const nowDate = x.getDate;
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

const makeid = (l) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < l; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
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
Allproduct.get_all = (host,result) => {
  let i = 0;
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      convertSrc(host,allproduct);
      parse(allproduct);
      result(allproduct);
    }
  });
};

Allproduct.getById = (host,id, result) => {
  console.log('id',id)
  db.query("SELECT * FROM products WHERE id=?", id, (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      convertSrc(host,allproduct);
      parse(allproduct);
      result(allproduct);
    }
  });
};
Allproduct.getByParam = (host,param, result) => {
  console.log("param", param);
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      convertSrc(host,allproduct);
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
          if (data.length > 0) {
            result(data);
          } else result(null);
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
          result(filter);
        } else result(null);
      } else if (!param) {
        result(allproduct);
      }
    }
  });
};
Allproduct.productFilterQuery = (host,query, result) => {
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      convertSrc(host,allproduct);
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
            convertSrc(host,dataQuery);
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
Allproduct.productSortQuery = (host,query, result) => {
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      convertSrc(host,allproduct);
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
Allproduct.productFullSearchQuery = (host,query, result) => {
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
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
        convertSrc(host,searchs);
        result(searchs);
      } else result(null);
    }
  });
};
Allproduct.getFullSearch = (host,query, result) => {
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
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
          convertSrc(host,searchs);
          parse(searchs);
          result(searchs);
        } else result(null);
      }
    }
  });
};
Allproduct.getPaging = (host,param, result) => {
  console.log("param", param);
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      convertSrc(host,allproduct);
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
Allproduct.getPagingSearch = (host,param, result) => {
  console.log("param ", param);
  db.query("SELECT * FROM products", (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      let results = [];
      convertSrc(host,allproduct);
      parse(allproduct);
      if (param.page && param.perpage && param.search) {
        results = allproduct.filter(
          (p) =>
            p.color === param.search ||
            p.tag === param.search ||
            p.sorfby === param.search
        );
        console.log("results", results);
        if (results.length === 0) {
          allproduct.map((a) => {
            const b = a.status?.filter((s) => s === param.search);
            if (b.length > 0) results.push(a);
          });
          allproduct.map((a) => {
            const b = a.type?.filter((t) => t === param.search);
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
Allproduct.create = (host,req, result) => {
  const dataProduct = req.body;
  const img = req.files["srcImg"][0];
  const imgDescription = req.files["imgDescription"];
  let listProductDescription = [];

  if (img && imgDescription) {
    const nameCurrentImgPrimary = img.originalname;
    const file = nameCurrentImgPrimary.slice(
      0,
      nameCurrentImgPrimary.lastIndexOf(".")
    );
    const type = nameCurrentImgPrimary.slice(
      nameCurrentImgPrimary.lastIndexOf(".")
    );
    let fileName = file + "-" + Date.now() + type;
    let newFile = __basedirImgPrimary + fileName;
    const saveImgAsnyc = new Promise((resolve, reject) => {
      fs.readFile(img.path, function (err, data) {
        fs.writeFile(newFile, data, (err) => {
          if (err) reject("save fail");
          else {
            fs.unlink(img.path, (err2) => {
              if (err2) reject("delete fali");
              else resolve("success");
            });
          }
        });
      });
    });
    saveImgAsnyc
      .then((data) => {
        const getAllProductAsnyc = new Promise((resolve, reject) => {
          db.query("SELECT * FROM products", (err, allproduct) => {
            if (err) reject(err);
            else resolve(allproduct);
          });
        });
        return getAllProductAsnyc;
      })
      .then((data) => {
        const getNewdataAsnyc = new Promise((resolve, reject) => {
          let newProductId = "";
          if (data.length === 0) {
            newProductId = makeid(3);
          } else {
            do {
              newProductId = makeid(3);
            } while (data.forEach((a) => a.productId === newProductId));
          }
          let newData = {
            ...dataProduct,
            type: JSON.stringify(dataProduct.type.split(",")),
            status: JSON.stringify(dataProduct.status.split(",")),
            productId: newProductId,
            srcImg: fileName,
            create_at: nowDate(),
            update_at: nowDate(),
          };
          delete newData.method;
          delete newData.id;
          resolve(newData);
        });
        return getNewdataAsnyc;
      })
      .then((data) => {
        const addProductAnsyc = new Promise((resolve, reject) => {
          db.query("INSERT INTO products SET ?", data, (err, newProduct) => {
            if (err) {
              reject({
                code: err.errno,
                message: err.message,
              });
            } else if (newProduct.length === 0) reject(null);
            else resolve(data.productId);
          });
        });
        return addProductAnsyc;
      })
      .then((data) => {
        const readFileAsnyc = new Promise((resolve, reject) => {
          imgDescription.forEach((f, i) => {
            const nameCurrentImgDescription = imgDescription[i].originalname;
            const fileDescription = nameCurrentImgDescription.slice(
              0,
              nameCurrentImgDescription.lastIndexOf(".")
            );
            const typeDescription = nameCurrentImgDescription.slice(
              nameCurrentImgDescription.lastIndexOf(".")
            );
            let fileNameDescription =
              fileDescription + "_" + data + typeDescription;
            let newFileDescription =
              __basedirImgDescription + fileNameDescription;
            fs.readFile(f.path, (err, data1) => {
              if (err) {
                reject(err);
              } else {
                fs.writeFile(newFileDescription, data1, (err2) => {
                  if (err2 && i === imgDescription.length - 1) reject(err2);
                  else if (err2 && i < imgDescription.length - 1) return;
                  else if (!err && i < imgDescription.length - 1) {
                    listProductDescription.push({
                      productId: data,
                      srcImg: fileNameDescription,
                    });
                  } else {
                    listProductDescription.push({
                      productId: data,
                      srcImg: fileNameDescription,
                    });
                    console.log(listProductDescription);
                    resolve(listProductDescription);
                  }
                });
              }
            });
          });
        });
        return readFileAsnyc;
      })
      .then((data) => {
        console.log("listProducDecription", data);
        const addProductDescriptionAsnyc = new Promise((resolve, reject) => {
          data.forEach((d, i) => {
            db.query(
              "INSERT INTO productdescription SET ?",
              d,
              (err, productSolded) => {
                console.log(err);
                if (err && i === data.length - 1) {
                  reject({
                    code: err.errno,
                    message: err.message,
                  });
                } else if (err) return;
                else {
                  console.log("do day");
                  console.log("i+1", i + 1);
                  console.log("data.length - 1", data.length);
                  if (i + 1 === data.length) {
                    console.log("do 2");
                    resolve(d.productId);
                  }
                }
              }
            );
          });
        });
        return addProductDescriptionAsnyc;
      })
      .then((data) => result(data))
      .catch((err) => result(err));
  } else {
    result({ code: 400 });
  }
};
Allproduct.remove = (id, result) => {
  const getProductAsnyc = new Promise((resolve, reject) => {
    db.query("SELECT * FROM products WHERE id=?", id, (err, allproduct) => {
      if (err) {
        reject({
          code: err.errno,
          message: err.message,
        });
      } else if (allproduct.length === 0) reject(null);
      else {
        fs.unlink(
          `${__basedirImgPrimary}${allproduct[0].srcImg}`,
          function (err2) {
            if (err2) reject({ code: err2.errno, message: err2.message });
            else resolve(allproduct[0]);
          }
        );
      }
    });
  });
  getProductAsnyc
    .then((data) => {
      const deleteProductAsnyc = new Promise((resolve, reject) => {
        db.query("DELETE  FROM products WHERE id=?", id, (err, allproduct) => {
          if (err) {
            reject({
              code: err.errno,
              message: err.message,
            });
          } else resolve(data);
        });
      });
      return deleteProductAsnyc;
    })
    .then((data) => {
      const getProductDescriptionAsnyc = new Promise((resolve, reject) => {
        db.query("SELECT * FROM productdescription", (err, product) => {
          if (err) {
            reject({
              code: err.errno,
              message: err.message,
            });
          } else if (product.length === 0) reject("null");
          else {
            const x = product.filter(
              (p) => p.productId === parseInt(data.productId)
            );
            if (x) resolve(x);
            else reject("null");
          }
        });
      });
      return getProductDescriptionAsnyc;
    })
    .then((data) => {
      console.log("data 2", data);
      let listId = [];
      const deleteFileDescription = new Promise((resolve, reject) => {
        if (data.length > 0) {
          data.forEach((d) => {
            listId.push(d.id);
            fs.unlink(`${__basedirImgDescription}${d.srcImg}`, function (err3) {
              if (err3) reject({ code: err3.errno, message: err3.message });
              else resolve(listId);
            });
          });
        } else resolve([]);
      });
      return deleteFileDescription;
    })
    .then((data) => {
      const deleteDescriptionAsnyc = new Promise((resolve, reject) => {
        if (data.length > 0) {
          data.forEach((id, index) => {
            db.query(
              "DELETE  FROM productdescription WHERE id=?",
              id,
              (err4) => {
                if (err4) {
                  if (index === data.length - 1) {
                    reject({
                      code: err4.errno,
                      message: err4.message,
                    });
                  }
                  return;
                } else {
                  if (index === data.length - 1) {
                    resolve("success");
                  }
                }
              }
            );
          });
        } else resolve("not image description");
      });
      return getProductDescriptionAsnyc;
    })
    .then((data) => {
      console.log(data);
      result(data);
    })
    .catch((err) => {
      result(err);
    });

  // db.query("DELETE  FROM products WHERE id=?", id, (err, allproduct) => {
  //   if (err) result({ code: 400 });
  //   else result("xóa thành công phần tử tại id là" + id);
  // });
};
Allproduct.update = (host,data, id, result) => {
  console.log("data", data);
  let array = {};
  db.query("SELECT * FROM products WHERE id=?", id, (err, allproduct) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (allproduct.length === 0) result(null);
    else {
      array = {
        ...allproduct[0],
        name: data.name ? data.name : allproduct[0].name,
        // srcImg:data.srcImg? data.srcImg :allproduct[0].srcImg,
        status: data.status
          ? JSON.stringify(data.status)
          : allproduct[0].status,
        color: data.color ? data.color : allproduct[0].color,
        type: data.type ? JSON.stringify(data.type) : allproduct[0].type,
        sorfby: data.sorfby ? data.sorfby : allproduct[0].sorfby,
        update_at: nowDate(),
        price: data.price ? data.price : allproduct[0].price,
        totalquantitys: data.totalquantitys
          ? data.totalquantitys
          : allproduct[0].totalquantitys,
        tag: data.tag ? data.tag : allproduct[0].tag,
        description: data.description
          ? data.description
          : allproduct[0].description,
      };
      console.log("array", array);
      db.query(
        "UPDATE products SET name=?,srcImg=?,status=?, description=?,price=?,create_at=?,update_at=?,productId=?,color=?,sorfby=?,totalquantitys=?,tag=?,productId=? WHERE id=?",
        [
          array.name,
          array.srcImg,
          array.status,
          array.description,
          array.price,
          array.create_at,
          array.update_at,
          array.productId,
          array.color,
          array.sorfby,
          array.totalquantitys,
          array.tag,
          array.productId,
          id,
        ],
        (err, allproduct) => {
          if (err) {
            result({
              code: err.errno,
              errorMessage: err.message,
            });
          } else result({ id: id, ...array });
        }
      );
    }
  });
};

module.exports = Allproduct;
