import React, { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1)); // slice(0, -1) ka matlab hai: shuruat se lekar aakhri ek character chhod kar baki sab rakho
  };

  const clear = () => {
    setInput("");
  };

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 100px)", // Poora calculator 400px ka hi rahega
        marginTop: "30px",
        gap: "8px",
        fontFamily: "sans-serif",
      }}
    >
      <input
        type="text"
        value={input}
        disabled
        style={{
          gridColumn: "span 3",
          textAlign: "right",
          padding: "10px",
          fontSize: "18px",
        }}
      />
      <button
        onClick={handleBackspace}
        style={{ padding: "10px", fontSize: "18px", cursor: "pointer" }}
      >
        ⌫
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 100px)",
          marginTop: "10px",
          gap: "8px",
        }}
      >
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={clear}>C</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => handleClick("*")}>*</button>
      </div>
    </div>
  );
};

export default App;
