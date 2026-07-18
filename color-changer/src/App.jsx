import React, { useState } from "react";

function App() {
  const [colors, setColors] = useState("amber");

  return (
    <div style={{ backgroundColor: colors, color: "white", padding: "100px" }}>
      <button
        onClick={() => setColors("white")}
        style={{ backgroundColor: "white", color: "black" }}
      >
        white
      </button>
      <button
        onClick={() => setColors("black")}
        style={{ backgroundColor: "black", color: "white" }}
      >
        white
      </button>
    </div>
  );
}

export default App;
