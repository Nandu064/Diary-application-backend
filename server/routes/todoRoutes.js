const express = require('express')
const Todo = require('../models/todos')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.getAlltodos();
        console.log(todos)
        res.send(todos);
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
});

module.exports = router;
