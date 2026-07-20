import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  return (
    <div>
      <h1>Navbar</h1>
      <nav className="flex gap-4 p-4 bg-gray-200">
        <NavLink to="/Home" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold" : "text-white")}
        >
          Home
        </NavLink>{" "}
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold" : "text-white")}
        >
          Login
        </NavLink>{" "}
        <NavLink to="/register" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold" : "text-white")}
        >
          Register
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
