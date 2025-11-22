// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    loadBoards();
  }, []);

  async function loadBoards(){
    try {
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function createBoard(){
    if (!title) return alert("Enter title");
    try {
      const res = await api.post("/boards", { title });
      setBoards(prev => [...prev, res.data]);
      setTitle("");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating board");
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Your Boards</h2>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Board title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button onClick={createBoard}>Create</button>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {boards.map(b => (
          <div key={b._id} style={{ border: "1px solid #ddd", padding: 12, width: 220 }}>
            <h4>{b.title}</h4>
            <button onClick={()=>nav(`/board/${b._id}`)}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}
