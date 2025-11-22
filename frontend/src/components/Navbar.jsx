// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){
  const { token, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd", display:"flex", justifyContent:"space-between" }}>
      <div><Link to="/" style={{ textDecoration:"none", color:"#333"}}><strong>MiniTrello</strong></Link></div>
      <div>
        {token ? (
          <>
            <button onClick={() => nav("/")} style={{ marginRight: 8 }}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
