import { contextBridge, ipcRenderer } from 'electron'

const todoApi = {
  getAllTodos: () => ipcRenderer.invoke("getAllTodos"),
  addTodo: (newTodo: string) => ipcRenderer.invoke("addTodo", newTodo),
  deleteTodo: (id: number) => ipcRenderer.invoke("deleteTodo", id),
  udpateTodo: (id: number, updatedTodo: string) => ipcRenderer.invoke("updateTodo", id, updatedTodo)
}

// renderer only if context isolation is enabled, otherwise
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("todoApi", todoApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.todoApi = todoApi
}
