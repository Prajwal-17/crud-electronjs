import Database from "better-sqlite3"
import type { Database as DatabaseType } from "better-sqlite3"

const db: DatabaseType = new Database("todosdb.db", { verbose: console.log })

const createTable = `CREATE TABLE IF NOT EXISTS todos(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  todo VARCHAR(50) NOT NULL
)`

db.exec(createTable)

export function addTodo(newTodo: string) {
  const query = db.prepare('INSERT INTO todos (todo) VALUES (?)');
  const todo = query.run(newTodo)
  return todo
}

export function getAllTodos() {
  const query = db.prepare('SELECT * FROM todos')
  const todos = query.all();
  return todos
}

export function udpateTodo(updatedTodo: string, id: number) {
  const query = db.prepare(`UPDATE todos SET todo = ? WHERE id = ?`);
  const todo = query.run(updatedTodo, id)
  return todo
}

export function deleteTodo(id: number) {
  const query = db.prepare(`DELETE FROM todos WHERE id = ?`);
  const todo = query.run(id)
  return todo
}

export default db;