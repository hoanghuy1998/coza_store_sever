const db = require("../common/connectAllProductMysql");

const Comments = (Comments) => {
  (this.id = Comments.id),
    (this.commentId = Comments.commentId),
    (this.userId = Comments.userId),
    (this.contents = Comments.contents),
    (this.avataUser = Comments.avataUser),
    (this.create_at = Comments.create_at),
    (this.update_at = Comments.update_at);
};
Comments.get_all = (result) => {
  db.query("SELECT * FROM commens", (err, Comments) => {
    if (err) result(null);
    else result(Comments);
  });
};
Comments.getById = (id, result) => {
  db.query("SELECT * FROM commens WHERE id=?", id, (err, Comments) => {
    if (err || Comments.length === 0) result(err);
    else result(Comments);
  });
};
Comments.getQuery = (query, result) => {
  db.query("SELECT * FROM commens", (err, Comments) => {
    if (err || Comments.length === 0) result(err);
    else {
      if (query.search) {
        const results = Comments.filter((p) => p.commentId === query.search);
        if (!results || results.length === 0) result(null);
        else {
          result(results);
        }
      }
    }
  });
};
Comments.create = (data, result) => {
  db.query("INSERT INTO commens SET ?", data, (err, Comments) => {
    if (err) {
      result(null);
    } else {
      result({ id: Comments.inserId, ...data });
    }
  });
};
Comments.remove = (id, result) => {
  db.query("DELETE  FROM commens WHERE id=?", id, (err, Comments) => {
    if (err) result(null);
    else result("xóa thành công phần tử tại id là" + id);
  });
};
Comments.update = (array, id, result) => {
  db.query(
    `UPDATE commens SET commentId=?,userId=?,contents=?,contents=?,create_at=?,update_at=?  WHERE id=?`,
    [
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
        result(null);
      } else {
        result({ id: id, ...array });
      }
    }
  );
};

module.exports = Comments;
