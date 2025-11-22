// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register(){
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered. Please login.");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div style={{ width: 360, margin: "40px auto" }}>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
