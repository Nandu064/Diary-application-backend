const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS todos (
      UserId INT NOT NULL,
      TodoId INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      status VARCHAR(25) NOT NULL,
      CONSTRAINT diaryPK PRIMARY KEY(TodoId));`;

  await con.query(sql);
}

createTable();

// Register (Create) New User
async function addTodo(todo) {
  let sql = `
    INSERT INTO todos(UserId, title, status)
    VALUES(${todo.UserId}, "${todo.title}", "${todo.status}")
  `;

  await con.query(sql);
  return "Added successfully";
}

async function getByUserId(userId) {
  let sql = `
    SELECT * FROM todos WHERE UserId=${userId}
    `;
  return await con.query(sql);
}

// Update - CRUD
async function editTodo(todo) {
  let sql = `UPDATE todos
  SET title = "${todo.title}",status="${todo.status}"
  WHERE TodoId = ${todo.TodoId}
  `;
  await con.query(sql);
  const temp = await getById(todo.TodoId);
  return temp[0];
}

async function getById(todoId) {
  let sql = `
    SELECT * FROM todos WHERE TodoId=${todoId}
    `;
  return await con.query(sql);
}

// Delete User
async function deleteTodo(todo) {
  let sql = `DELETE FROM todos
    WHERE TodoId = ${todo.TodoId}
  `;
  await con.query(sql);
}

module.exports = { addTodo, getByUserId, editTodo, deleteTodo };
// module.exports = { login, register, editUser, deleteUser };
