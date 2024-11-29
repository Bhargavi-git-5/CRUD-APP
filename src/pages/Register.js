import React, { useState } from "react";
import API from '../api/api'

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registration Successful! Please login.");
    } catch (err) {
      alert(err.response.data.error || "Registration Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
