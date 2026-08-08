import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Login", path: "/" },
    { name: "Register", path: "/register" },
  ];

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-800 text-white p-2 m-2 rounded">
        {isOpen ? "Close" : "Open"}
      </button>

      {/* Sidebar - conditionally width badalta hai */}
      <div className={`h-screen bg-gray-100 transition-all duration-300 ${isOpen ? "w-48 p-4" : "w-0 overflow-hidden"
        }`}>
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.path} className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-blue-500 text-white font-bold" : "text-black"}`
          }>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  )
};

export default Sidebar;
