import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const style = ({ isActive }) =>
    isActive ? "text-red-500 font-bold" : "text-black font-normal";

  return (
    <div>
      <h1>Navbar</h1>
      <nav className="flex gap-4 p-4 bg-gray-200">
        <NavLink to="/Home" className={style}>
          Home
        </NavLink>{" "}
        <NavLink to="/" className={style}>
          Login
        </NavLink>{" "}
        <NavLink to="/register" className={style}>
          Register
        </NavLink>
        ;
      </nav>
    </div>
  );
};

export default Navbar;
