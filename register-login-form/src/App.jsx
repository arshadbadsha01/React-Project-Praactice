import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default App;
