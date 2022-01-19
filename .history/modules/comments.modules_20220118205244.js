const db = require("../common/connectAllProductMysql");
const x = require("../returnAPI");
const nowDate = x.getDate;
const convertSrc = (r) => `http://localhost:5000/data/${r}`;
const Comments = (Comments) => {
  (this.id = Comments.id),
    (this.commentId = Comments.commentId),
    (this.userId = Comments.userId),
    (this.contents = Comments.contents),
    (this.create_at = Comments.create_at),
    (this.update_at = Comments.update_at),
    (this.userName = Comments.userName),
    (this.avataUser = Comments.avataUser);
};
Comments.get_all = (host,result) => {
  db.query("SELECT * FROM commens", (err, Comments) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (Comments.length === 0) result(null);
    else {
      Comments.forEach((c) => c[0].avataUser = `${host}${c.avataUser}`);
      result(Comments);
    }
  });
};
Comments.getById = (host,id, result) => {
  db.query("SELECT * FROM commens WHERE id=?", id, (err, Comments) => {
    if (err || Comments.length === 0) result(err);
    else {
      Comments[0].avataUser = `${host}${Comments[0].avataUser}`;
     result(Comments);
    }
  });
};
Comments.getByParam = (host,query, result) => {
  console.log('do quey')
  console.log('query', query)
  const hostt='ddd'
  db.query("SELECT * FROM commens", (err, Comments) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else if (Comments.length === 0) result(null);
    else {
      if (query.search) {
        const results = Comments.filter(
          (p) =>
            p.commentId === parseInt(query.search) ||
            p.userId === parseInt(query.search)
        );
        if (!results || results.length === 0) result(null);
        else {
          results.map((r) => {
            r.avataUser = `${hostt}${r.avataUser}`
          });
          result(results);
        }
      }
    }
  });
};
Comments.create = (data, result) => {
  console.log("data", data);
  // data = id,content,commentid,iduser
  let newData = {};
  console.log(data);
  db.query("SELECT * FROM user WHERE id=?", data.id, (err, user) => {
    if (err || user.length === 0) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else {
      console.log("do else");
      newData = {
        commentId: data.commentId,
        avataUser: user[0].avata,
        userName: user[0].userName,
        contents: data.contents,
        userId: user[0].userId,
        create_at: nowDate(),
        update_at: nowDate(),
      };
      db.query("INSERT INTO commens SET ?", newData, (err, Comments) => {
        if (err) {
          result({
            code: err.errno,
            message: err.message,
          });
        } else {
          newData.id = Comments.inserId;
          result(newData);
        }
      });
    }
  });
};
Comments.remove = (id, result) => {
  db.query("DELETE  FROM commens WHERE id=?", id, (err, Comments) => {
    if (err) {
      result({
        code: err.errno,
        message: err.message,
      });
    } else result("xóa thành công phần tử tại id là" + id);
  });
};
Comments.update = (array, id, result) => {
  array.update_at = nowDate();
  db.query(
    `UPDATE commens SET userName=?, commentId=?,userId=?,contents=?,contents=?,create_at=?,update_at=?  WHERE id=?`,
    [
      array.userName,
      array.commentId,
      array.userId,
      array.contents,
      array.contents,
      array.create_at,
      array.update_at,
      id,
    ],
    (err, Comments) => {
      if (err) {
        result({
          code: err.errno,
          message: err.message,
        });
      } else {
        array.id = id;

        result(array);
      }
    }
  );
};

module.exports = Comments;
