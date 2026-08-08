import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <div style={{ display: "flex" }}>
          {/* <Sidebar /> */}
          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/Cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
