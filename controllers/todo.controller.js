const Todo = require("../modules/todo.module");
const x = require("../returnAPI");
const payload = x.payload;
exports.getAllTodo = (req, res) => {
  Todo.getAll((myRes) => payload(res, myRes));
};
exports.getById = (req, res) => {
  Todo.getId(req.params.id, (myRes) => payload(res, myRes));
};
exports.getByDateCreate = (req, res) => {
  Todo.getByDateCreate(req.query, (myRes) => payload(res, myRes));
};
exports.getPaging = (req, res) => {
  Todo.getPaging(req.query, (myRes) => payload(res, myRes));
};
exports.todoCreate = (req, res) => {
  Todo.create(req.body, (myRes) => payload(res, myRes));
};
exports.todoUpdate = (req, res) => {
  Todo.todoUpdate(req.body, req.params.id, (myRes) => payload(res, myRes));
};
