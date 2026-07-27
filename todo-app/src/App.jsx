import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  // 1. Initial State: App start hote hi LocalStorage se data load kar rahe hain (JSON.parse)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("my_todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [task, setTask] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  // 2. useEffect: Jab bhi 'todos' state change hogi, yeh LocalStorage mein save ho jayega (JSON.stringify)
  useEffect(() => {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos((prev) => [...prev, { text: task, completed: false }]);
    setTask("");
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      addTodo();
      saveTodo();
    }
  };

  const toggleComplete = (index) => {
    setTodos((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const startEdit = (index) => {
    setTask(todos[index].text); // input mein purana text add hota hai update karne ke liye
    setEditTodo(index); //aur ye yaad rakta hai kounsa index edit ho ra hai
  };

  const saveTodo = () => {
    setTodos((prev) =>
      prev.map((item, i) => (i === editTodo ? { ...item, text: task } : item)),
    );
    setTask(""); // edit hone ka baad input ko khaali kardo
    setEditTodo(null); // edit mode se bahar aa jao
  };

  const deleteTodo = (index) => {
    setTodos((prev) => prev.filter((item, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-700">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-400">
          Task Manager
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onKeyDown={handleKeydown}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Write a task..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={editTodo !== null ? saveTodo : addTodo}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
              editTodo !== null
                ? "bg-amber-500 hover:bg-amber-600 text-slate-900"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {editTodo !== null ? "Save" : "Add"}
          </button>
        </div>

        {/* Todo List / Empty State */}
        {todos.length === 0 ? (
          <p className="text-center text-slate-500 py-4">
            No tasks yet, add one above! 🚀
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-slate-700/50 hover:bg-slate-700 p-3 rounded-xl border border-slate-600/50 transition duration-150"
              >
                <div className="flex items-center gap-3 overflow-hidden pr-2">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(index)}
                    className="w-5 h-5 accent-indigo-500 cursor-pointer rounded"
                  />
                  <span
                    className={`truncate ${
                      item.completed
                        ? "line-through text-slate-400"
                        : "text-slate-100"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => startEdit(index)}
                    className="px-2 py-1 text-xs text-amber-400 hover:bg-amber-400/10 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="px-2 py-1 text-xs text-red-400 hover:bg-red-400/10 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
