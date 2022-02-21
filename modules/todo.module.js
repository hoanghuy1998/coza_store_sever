const db = require("../common/connect_todo_mysql");
const x = require("../returnAPI");
const nowDate = x.getDate;
const formatDate = (d) => {
  if (d) {
    d = JSON.stringify(d);
    let day = parseInt(d?.slice(9, 11));
    let m = parseInt(d?.slice(6, 8));
    let year = parseInt(d?.slice(1, 5));
    console.log("m", m);
    if (
      (day === 31 && m === 1) ||
      m === 3 ||
      m === 5 ||
      m === 7 ||
      m === 8 ||
      m === 10 ||
      m === 12
    ) {
      day = 1;
      m++;
    } else if (
      (day === 30 && m === 4) ||
      m === 5 ||
      m === 6 ||
      m === 9 ||
      m === 11
    ) {
      day = 1;
      m++;
    } else if (day === 29) {
      day = 1;
      m++;
    } else if (day === 28 && year / 4 != 0) {
      day = 1;
      m++;
    } else {
      day++;
    }
    return day + "-" + m + "-" + year;
  } else return d;
};
const formatDate2 = (d) => {
  if (d) {
    d = JSON.stringify(d);
    return d?.slice(7, 11) + "-" + d?.slice(4, 6) + "-" + d?.slice(1, 3);
  } else return d;
};

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
const returnInfo = (a) => {
  const x = [];

  a.forEach((a) => {
    x.push({
      id: a.id,
      status: a.status,
      username: a.username,
      name: a.name,
      create_at: formatDate(a.create_at),
      update_at: formatDate(a.update_at),
      expirationdate: formatDate(a.expirationdate),
    });
  });
  return x;
};
const Todo = (Todo) => {
  (this.id = Todo.id),
    (this.name = Todo.name),
    (this.username = Todo.username),
    (this.expiration = Todo.expiration),
    (this.create_at = Todo.create_at),
    (this.update_at = Todo.update_at),
    (this.tatus = Todo.tatus);
};
Todo.getAll = (result) => {
  db.query("SELECT * FROM todo", (err, todo) => {
    if (err) {
      result({
        code: err.code,
        message: err.message,
      });
    } else if (todo.length === 0) result({ code: 404 });
    else result(returnInfo(todo));
  });
};
Todo.getId = (id, result) => {
  db.query("SELECT * FROM todo WHERE id=?", id, (err, todo) => {
    if (err) {
      result({
        code: err.code,
        message: err.message,
      });
    } else if (todo.length === 0) result({ code: 404 });
    else result(returnInfo(todo));
  });
};
Todo.getByDateCreate = (query, result) => {
  if (query.date) {
    console.log("query.date", query.date);
    const date = formatDate2(query.date);
    console.log("date", date);
    db.query(
      "SELECT * FROM todo where update_at='" + date + "'",
      (err, todo) => {
        if (err) {
          result({
            code: err.code,
            message: err.message,
          });
        } else if (todo.length === 0) result(null);
        else result(returnInfo(todo));
      }
    );
  } else result({ code: 406 });
};
Todo.getPaging = (query, result) => {
  if (query.page && query.perpage) {
    console.log("query", query);
    db.query("SELECT * FROM todo ", (err, todo) => {
      if (err) {
        result({
          code: err.code,
          message: err.message,
        });
      } else if (todo.length === 0) result(null);
      else {
        const page = parseInt(query.page);
        const perpage = parseInt(query.perpage);
        const totalPage = Math.ceil(todo.length / perpage);
        const slice = todo.slice(page * perpage, page * perpage + perpage);
        console.log("slice", slice);
        if (slice.length > 0) {
          result({
            data: returnInfo(slice),
            pagingInfo: {
              page: page,
              pageLength: todo.length,
              totalRecord: perpage,
              totalPage: totalPage,
            },
          });
        } else result({ code: 404 });
      }
    });
  } else result({ code: 406 });
};
Todo.create = (data, result) => {
  if (data) {
    const newData = {
      name: data?.name,
      create_at: nowDate(),
      update_at: nowDate(),
    };
    const checkNameAsnyc = new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM todo where name='" + data.name + "'",
        (err, todo) => {
          if (err) {
            reject({
              code: err.code,
              message: err.message,
            });
          } else if (todo.length === 0) resolve("no");
          else {
            reject({ code: 406 });
          }
        }
      );
    });
    checkNameAsnyc
      .then((data) => {
        db.query("INSERT INTO todo   SET ?", newData, (err, productsolded) => {
          if (err) {
            result({
              code: err.code,
              message: err.message,
            });
          } else
            result({
              code: 200,
              message: "add success",
            });
        });
      })
      .catch((err) => result(err));
  } else result({ code: 406 });
};
Todo.todoUpdate = (data, id, result) => {
  db.query("SELECT * FROM todo WHERE id=?", id, (err, todo) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (todo.length === 0) result(null);
    else {
      const newData = {
        ...todo[0],
        ...data,
        create_at: todo[0].create_at,
        update_at: nowDate(),
        expirationdate: data.expirationdate
          ? formatDate2(data.expirationdate)
          : null,
      };
      db.query(
        `UPDATE todo SET name=?,username=?,expirationdate=?, create_at=?,update_at=?,status=? WHERE id=?`,
        [
          newData.name,
          newData.username,
          newData.expirationdate,
          newData.create_at,
          newData.update_at,
          newData.status,
          id,
        ],
        (err, todo) => {
          if (err) {
            result({
              code: err.code,
              message: err.message,
            });
          } else {
            result({
              code: 200,
              message: "update success",
            });
          }
        }
      );
    }
  });
};
module.exports = Todo;
