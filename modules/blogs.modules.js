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
    (this.srcImg = Blog.srcImg),
    (this.author = Blog.author);
};
Blog.get_all = (result) => {
  db.query("SELECT * FROM blogs", (err, blog) => {
    blog.forEach((b) => {
      console.log("do chuyen");
      b.contents = JSON.parse(b.contents);
      b.taps = JSON.parse(b.taps);
    });
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (blog.length === 0) result(null);
    else result(blog);
  });
};
Blog.getQuery = (query, result) => {
  let data = [];
  db.query("SELECT * FROM blogs", (err, blog) => {
    blog.forEach((b) => {
      b.contents = JSON.parse(b.contents);
      b.taps = JSON.parse(b.taps);
    });
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (blog.length === 0) result(null);
    else {
      const filter = blog.map((b) => b.taps.filter((t) => t === query.search));
      for (let i = 0; i < filter.length; i++) {
        if (filter[i].length > 0) {
          data.push(blog[i]);
        }
      }
      if (filter) result(data);
      else result(null);
    }
  });
};
Blog.create = (data, result) => {
  db.query("INSERT INTO blogs SET ?", data, (err, blog) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (blog.length === 0) result(null);
    else {
      data.id = blog.inserId;
      result(data);
    }
  });
};
Blog.getById = (id, result) => {
  db.query("SELECT * FROM blogs WHERE id=?", id, (err, blog) => {
    blog[0].contents = JSON.parse(blog[0].contents);
    blog[0].taps = JSON.parse(blog[0].taps);
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (blog.length === 0) result(null);
    else result(blog);
  });
};
Blog.paging = (query, result) => {
  console.log("query", query);
  db.query("SELECT * FROM blogs", (err, blog) => {
    if (err) {
      result({
        code: err.errno,
        errorMessage: err.message,
      });
    } else if (blog.length === 0) result(null);
    else {
      const page = query.page;
      const perPage = query.perpage;
      const totalPage = Math.ceil(blog.length / perPage);
      const slice = blog.slice(
        page * perPage,
        parseInt(perPage * page) + parseInt(perPage)
      );
      if (slice.length === 0) result(null);
      else {
        slice.forEach((b) => {
          b.contents = JSON.parse(b.contents);
          b.taps = JSON.parse(b.taps);
        });
        result({
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
        code: err.errno,
        errorMessage: err.message,
      });
    } else result("xóa thành công phần tử tại id là" + " " + id);
  });
};
Blog.update = (array, id, result) => {
  db.query(
    `UPDATE blogs SET title=?,commentId=?,contents=?,introduces=?,create_at=?,update_at=?,taps=?,srcImg=?,author=?  WHERE id=?`,
    [
      array.title,
      array.commentId,
      array.contents,
      array.introduces,
      array.create_at,
      array.update_at,
      array.taps,
      array.srcImg,
      array.author,
      id,
    ],
    (err, blog) => {
      if (err) {
        result({
          code: err.errno,
          errorMessage: err.message,
        });
      } else {
        array.id = id;
        result(array);
      }
    }
  );
};
module.exports = Blog;
