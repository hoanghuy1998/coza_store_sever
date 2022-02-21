module.exports = (router) => {
  const Todo = require("../controllers/todo.controller");
  router.get("/alltodo", Todo.getAllTodo);
  router.get("/alltodo/:id", Todo.getById);
  router.get("/alltodo/date/create", Todo.getByDateCreate);
  router.get("/alltodo/page/get-paging", Todo.getPaging);
  router.post("/alltodo/create/add", Todo.todoCreate);
  router.put("/alltodo/update/:id", Todo.todoUpdate);
};
