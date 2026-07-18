import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos((prev) => [...prev, { text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (index) => {
    setTodos((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const startEdit = (index) => {
    setTask(todos[index]); // input mein purana text add hota hai update karne ke liye
    setEditTodo(index); //aur ye yaad rakta hai kounsa index edit ho ra hai
  };

  const saveTodo = () => {
    setTodos((prev) => prev.map((item, i) => (i === editTodo ? task : item)));
    setTask(""); // edit hone ka baad input ko khaali kardo
    setEditTodo(null); // edit mode se bahar aa jao
  };

  const deleteTodo = (index) => {
    setTodos((prev) => prev.filter((item, i) => i !== index));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-1 bg-amber-300"
        />
        <button onClick={editTodo !== null ? saveTodo : addTodo}>
          {editTodo !== null ? "Save" : "Add"}
        </button>
      </div>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(index)}
            />
            {item.text}
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <button onClick={() => startEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
