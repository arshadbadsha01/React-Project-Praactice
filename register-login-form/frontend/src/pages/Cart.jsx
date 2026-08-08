import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">Your cart is empty</p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-16 w-16 object-contain"
          />

          <div className="flex-1 mx-4">
            <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
            <p className="text-gray-600">${item.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQty(item.id)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => increaseQty(item.id)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <div className="mt-6 text-right text-xl font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
