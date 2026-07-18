import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); // ek state mein object ke through sab fields

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData({ email: "", password: "" });
  };
  return (
    <div className="bg-black text-white">
      <h1 className="text-3xl font-bold text-center ">Login Page</h1>
      <p className="text-sm font-bold text-center">You Can Login Here</p>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-white px-1.5 text-black"
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-white px-1.5 text-black "
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;
