const express = require("express");
const Todo = require("../models/todos");
const router = express.Router();

router

  // login
  .post("/add-todo", async (req, res) => {
    try {
      const message = await Todo.addTodo(req.body);
      res.send({ success: message });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  // get todod for a particular user

  .get("/get-by-userId/:user_id", async (req, res) => {
    try {
      const todos = await Todo.getByUserId(req.params.user_id);
      res.send(todos);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  //  edit a todo
  .put("/edit-todo", async (req, res) => {
    try {
      let todo = await Todo.editTodo(req.body);
      res.send(todo);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  //  delete a todo
  .delete("/delete", async (req, res) => {
    try {
      await Todo.deleteTodo(req.body);
      res.send({ success: "Todo Deleted successfully" });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });

module.exports = router;
