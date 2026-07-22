import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Weather from "./pages/Weather";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </>
  );
};

export default App;
