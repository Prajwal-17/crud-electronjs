import { Check, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type TodoType = {
  id: number;
  todo: string;
};

const App = () => {
  const [allTodos, setAllTodos] = useState<TodoType[]>([]);
  const [todo, setTodo] = useState("");
  const [isUpdating, setIsUpdating] = useState<number | null>();
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    async function fetchAllTodos() {
      try {
        const response = await window.todoApi.getAllTodos();
        console.log(response);
        setAllTodos(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllTodos();
  }, []);

  async function handleAddTodo() {
    try {
      const response = await window.todoApi.addTodo(todo);
      console.log(response);
      if (response) {
        setTodo("");
        const response = await window.todoApi.getAllTodos();
        setAllTodos(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      const response = await window.todoApi.deleteTodo(id);
      const getAllTodos = await window.todoApi.getAllTodos();
      setAllTodos(getAllTodos);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateTodo(id: number) {
    try {
      const response = await window.todoApi.udpateTodo(id, editInput);
      const getAllTodos = await window.todoApi.getAllTodos();
      setAllTodos(getAllTodos);
      setIsUpdating(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-screen m-auto h-full w-full flex items-center justify-center">
        <div className="border-2 px-6 bg-[#f1f5f9] w-full max-w-lg py-5 space-y-3 rounded-xl">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <div className="text-md text-neutral-500">A simple todo app</div>
          <div className="space-x-3 flex flex-col  w-full justify-center gap-3">
            <label htmlFor="addtodo" className="font-semibold">
              Add Todo:
            </label>
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="border-2 px-2 py-2 rounded-lg w-full"
            />
            <button
              className="border-none outline-none bg-black py-2 rounded-xl px-2  text-white"
              onClick={handleAddTodo}
            >
              Add todo
            </button>
          </div>
          <div className="w-full text-center text-lg font-medium">
            <div></div>
            All Todos:
          </div>
          <div>
            {allTodos.length > 0 &&
              allTodos.map((todo) => (
                <div key={todo.id} className="flex justify-between gap-2">
                  <div className="flex">
                    <div className="font-bold">{todo.id}.</div>
                    {isUpdating === todo.id ? (
                      <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        className="border-2 px-2 py-2 rounded-lg w-full"
                      />
                    ) : (
                      <div>{todo.todo}</div>
                    )}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={
                        isUpdating
                          ? () => handleUpdateTodo(todo.id)
                          : () => {
                              setEditInput(todo.todo);
                              setIsUpdating(todo.id);
                            }
                      }
                    >
                      {isUpdating === todo.id ? <Check /> : <PencilLine />}
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
