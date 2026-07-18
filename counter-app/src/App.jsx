import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0))
  };

  return (
    <div>
      <h1>Count: {count} </h1>

      <div>
        <div>
          <button onClick={increment}>+</button>{" "}
          <button onClick={decrement}>-</button>
        </div>
      </div>
    </div>
  );
};

export default App;
