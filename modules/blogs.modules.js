const db = require("../common/connectAllProductMysql");
const Blog = (Blog) => {
  (this.id = Blog.id),
    (this.title = Blog.title),
    (this.commentId = Blog.commentId),
    (this.contents = Blog.contents),
    (this.introduces = this.introduces),
    (this.create_at = Blog.create_at),
    (this.update_at = Blog.update_at),
    (this.taps = Blog.taps),
    (this.srcImg = Blog.srcImg);
};
Blog.get_all = (result) => {
  db.query("SELECT * FROM blogs", (err, blog) => {
    if (err) {
      result({
        errorCode: 1,
        errorMessage: "get found",
      });
    } else if (blog.length === 0) {
      result({
        errorCode: 2,
        errorMessage: "not found",
      });
    } else {
      result({
        errorCode: 0,
        data: blog,
      });
    }
  });
};

Blog.create = (data, result) => {
  db.query("INSERT INTO blogs SET ?", data, (err, blog) => {
    if (err || blog.length === 0) {
      result({
        errorCode: 1,
        errorMessage: "add fail",
      });
    } else {
      result({
        errorCode: 0,
        data: { id: blog.inserId, ...data },
      });
    }
  });
};
Blog.getById = (id, result) => {
  db.query("SELECT * FROM blogs WHERE id=?", id, (err, blog) => {
    if (err) {
      result({
        errorCode: 1,
        errorMessage: "get fail",
      });
    } else if (blog.length === 0) {
      result({
        errorCode: 1,
        errorMessage: "not found",
      });
    } else result(blog);
  });
};
Blog.paging = (query, result) => {
  console.log("query", query);
  db.query("SELECT * FROM blogs", (err, blog) => {
    if (err) {
      result({
        errorCode: 1,
        errorMessage: "not found",
      });
    } else {
      const page = query.page;
      const perPage = query.perpage;
      const totalPage = Math.ceil(blog.length / perPage);
      const slice = blog.slice(
        page * perPage,
        parseInt(perPage * page) + parseInt(perPage)
      );
      if (slice.length === 0) {
        result({
          errorCode: 1,
          errorMessage: "not found",
        });
      } else {
        result({
          errorCode: 0,
          data: slice,
          pagingInfo: {
            page: page,
            pageLength: blog.length,
            totalRecord: perPage,
            totalPage: totalPage,
          },
        });
      }
    }
  });
};
Blog.remove = (id, result) => {
  db.query("DELETE  FROM blogs WHERE id=?", id, (err, blog) => {
    if (err) {
      result({
        errorCode: 1,
        errorMessage: "delte fail",
      });
    } else
      result({
        errorCode: 0,
        data: "xóa thành công phần tử tại id là" + id,
      });
  });
};
Blog.update = (array, id, result) => {
  db.query(
    `UPDATE blogs SET title=?,commentId=?,contents=?,introduces=?,create_at=?,update_at=?,taps=?,srcImg=?  WHERE id=?`,
    [
      array.title,
      array.commentId,
      array.contents,
      array.introduces,
      array.create_at,
      array.update_at,
      array.taps,
      array.srcImg,
      id,
    ],
    (err, blog) => {
      if (err) {
        result({
          errorCode: 1,
          errorMessage: "update fail",
        });
      } else {
        result({
          errorCode: 0,
          data: { id: id, ...array },
        });
      }
    }
  );
};
module.exports = Blog;
