import { useEffect, useState } from "react";

const App = () => {
  useEffect(() => {
    console.log("window", window);
    console.log("window electron", window.electron);
    console.log("window api", window.api);
  }, [window]);

  const [todo, setTodo] = useState("");

  function handleAddTodo() {}

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
            All Todos:
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
