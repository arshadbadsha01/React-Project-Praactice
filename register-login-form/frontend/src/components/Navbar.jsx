import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  return (
    <div>
      <nav className="flex gap-4 p-4 bg-gray-600">
        <NavLink
          to="/Products"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "text-white"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/Cart"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "text-white"
          }
        >
          Cart ({cart.length})
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "text-white"
          }
        >
          Login
        </NavLink>{" "}
        <NavLink
          to="/Register"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "text-white"
          }
        >
          Register
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
