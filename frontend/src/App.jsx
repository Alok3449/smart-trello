// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BoardPage from "./pages/BoardPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

export default function App(){
  const { token } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/board/:id" element={token ? <BoardPage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}
