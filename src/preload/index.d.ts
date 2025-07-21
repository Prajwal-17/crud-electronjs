import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    // electron: ElectronAPI
    // api: unknown
    todoApi: TodoApi
  }

  interface TodoApi {
    getAllTodos: () => Promise<any>  // Replace `any` with actual type of your todos
    addTodo: (newTodo: string) => Promise<any>
    deleteTodo: (id: number) => Promise<any>
    udpateTodo: (id: number, updatedTodo: string) => Promise<any>
  }
}
