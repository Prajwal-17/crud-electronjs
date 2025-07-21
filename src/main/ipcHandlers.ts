import { ipcMain } from "electron";
import { addTodo, deleteTodo, getAllTodos, udpateTodo } from "./db";

export function setUpIpcHandlers() {

  ipcMain.handle("getAllTodos", (_event) => {
    const todos = getAllTodos()
    return todos
  })

  ipcMain.handle("addTodo", (_event, newTodo: string) => {
    const todo = addTodo(newTodo)
    return todo
  })

  ipcMain.handle("deleteTodo", (_event, id: number) => {
    const todo = deleteTodo(id)
    return todo
  })

  ipcMain.handle("updateTodo", (_event, id: number, updatedTodo: string) => {
    const todo = udpateTodo(updatedTodo, id)
    return todo
  })
}