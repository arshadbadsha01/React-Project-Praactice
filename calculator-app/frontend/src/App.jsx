import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [expression, setExpression] = useState(""); // upar chhoti line
  const [input, setInput] = useState(""); // neeche bada
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  // Page load hote hi DB se history fetch karo
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/history/all`,
        );
        setHistory(
          res.data.history.map((item) => ({
            id: item.id,
            text: item.expression + " = " + item.result,
          })),
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, []);

  const calculate = async () => {
    if (input === "") return; // agar naya number type hi nahi hua, calculate mat karo
    try {
      const fullExpression = expression + input;
      const result = eval(fullExpression);
      const expressionText = fullExpression + " = " + result; // Yeh history mein kaisa dikhna chaiye

      // DB mein save karo
      const saveRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/history/save`,
        {
          expression: fullExpression,
          result: result.toString(),
        },
      );

      // history mein purane calculation ke neeche naya calculation add kardo
      setHistory((prev) => [
        ...prev,
        { id: saveRes.data.id, text: expressionText },
      ]);
      setExpression(fullExpression + " ="); //expression mein kaise dikhna chaiye
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
      setExpression("");
    }
  };

  const historyClear = async (id, index) => {
    try {
      if (id) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/history/${id}`);
      }
      setHistory((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  const isOperator = (char) => ["+", "-", "*", "/", "%"].includes(char);

  const handleClick = (value) => {
    if (isOperator(value)) {
      if (input === "") return; // agar number type hi nahi hua, calculate mat karo

      if (expression.trim().endsWith("=")) {
        // Agar abhi result aaya tha (=), toh purani expression ignore karo, fresh se shuru karo
        setExpression(input + " " + value + " ");
      } else {
        setExpression((prev) => prev + input + " " + value + " ");
      }
      setInput(""); //operator dabane ke baad input hamesha khali ho jaana chahiye kyuki fresh se type ho sake.
    } else {
      if (expression.trim().endsWith("=")) {
        // Naya number type ho raha hai result ke baad — purani expression clear karo
        setExpression("");
      }
      setInput((prev) => prev + value);
    }
  };

  const clearInput = () => {
    setInput(""); // sirf current input clear, expression untouched
  };

  const clear = () => {
    setExpression("");
    setInput("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1)); // slice(0, -1) ka matlab hai: shuruat se lekar aakhri ek character chhod kar baki sab rakho
  };

  const addMemory = () => {
    if (input === "") return;
    setMemory((prev) => prev + Number(input));
  };

  const subtractMemory = () => {
    if (input === "") return;
    setMemory((prev) => prev - Number(input));
  };

  const recallMemory = () => {
    setInput(memory.toString());
  };

  const clearMemory = () => {
    setMemory(0);
  };

  // Common button style ek jagah define kar diya, taaki har button mein baar-baar na likhna pade
  const btnStyle =
    "h-14 rounded-lg text-lg font-medium bg-gray-700 text-white hover:bg-gray-800 active:scale-95 transition-all";
  const operatorStyle =
    "h-14 rounded-lg text-lg font-medium bg-orange-500 text-white hover:bg-orange-700 active:scale-95 transition-all";
  const utilityStyle =
    "h-14 rounded-lg text-lg font-medium bg-gray-500 text-white hover:bg-gray-400 active:scale-95 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-[340px] bg-gray-600 rounded-2xl shadow-2xl p-4">
        {/* Expression - upar chhoti line */}
        <div className="text-right text-gray-200 text-sm min-h-[20px] px-2">
          {expression}
        </div>

        {/* Input - bada display */}
        <div className="text-right text-white text-4xl font-semibold px-2 py-4 mb-4 truncate">
          {input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button onClick={clearMemory} className={utilityStyle}>
            MC
          </button>
          <button onClick={recallMemory} className={utilityStyle}>
            MR
          </button>
          <button onClick={addMemory} className={utilityStyle}>
            M+
          </button>
          <button onClick={subtractMemory} className={utilityStyle}>
            M-
          </button>
        </div>
        {memory !== 0 && (
          <p className="text-xs text-gray-400 text-right px-2">M: {memory} </p>
        )}

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => handleClick("%")} className={utilityStyle}>
            %
          </button>
          <button onClick={clearInput} className={utilityStyle}>
            CI
          </button>
          <button onClick={clear} className={utilityStyle}>
            C
          </button>
          <button onClick={handleBackspace} className={utilityStyle}>
            ⌫
          </button>

          <button onClick={() => handleClick("7")} className={btnStyle}>
            7
          </button>
          <button onClick={() => handleClick("8")} className={btnStyle}>
            8
          </button>
          <button onClick={() => handleClick("9")} className={btnStyle}>
            9
          </button>
          <button onClick={() => handleClick("*")} className={operatorStyle}>
            ×
          </button>

          <button onClick={() => handleClick("4")} className={btnStyle}>
            4
          </button>
          <button onClick={() => handleClick("5")} className={btnStyle}>
            5
          </button>
          <button onClick={() => handleClick("6")} className={btnStyle}>
            6
          </button>
          <button onClick={() => handleClick("-")} className={operatorStyle}>
            −
          </button>

          <button onClick={() => handleClick("1")} className={btnStyle}>
            1
          </button>
          <button onClick={() => handleClick("2")} className={btnStyle}>
            2
          </button>
          <button onClick={() => handleClick("3")} className={btnStyle}>
            3
          </button>
          <button onClick={() => handleClick("+")} className={operatorStyle}>
            +
          </button>

          <button onClick={() => handleClick("/")} className={operatorStyle}>
            ÷
          </button>
          <button onClick={() => handleClick("0")} className={btnStyle}>
            0
          </button>
          <button onClick={() => handleClick(".")} className={btnStyle}>
            .
          </button>
          <button
            onClick={calculate}
            className="h-14 rounded-lg text-lg font-medium bg-blue-500 text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            =
          </button>
        </div>
      </div>

      {/* History Panel */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="bg-gray-700 text-white px-4 py-2 rounded mb-2"
      >
        {showHistory ? "Hide History" : "Show History"}{" "}
      </button>

      {showHistory && (
        <div className="w-[340px] bg-gray-800 rounded-2xl shadow-2xl p-4 ml-4 max-h-[500px] overflow-y-auto">
          <h2 className="text-white text-lg font-semibold mb-3">History</h2>
          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No history yet</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-300 text-sm text-right border-b border-gray-700 pb-2"
                >
                  <span>{item.text}</span>
                  <button
                    onClick={() => historyClear(item.id, index)}
                    className="text-red-400 text-sm mt-3 hover:text-red-300 ml-3"
                  >
                    Clear
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
