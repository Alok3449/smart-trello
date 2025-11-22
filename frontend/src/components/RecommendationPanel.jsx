// src/components/RecommendationPanel.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function RecommendationPanel({ boardId }) {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    if (!boardId) return;
    loadRecs();
  }, [boardId]);

  async function loadRecs() {
    try {
      const res = await api.get(`/recommendations/${boardId}`);
      setRecs(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ background: "#fff", padding: 12, borderRadius: 8, boxShadow:"0 1px 3px rgba(0,0,0,0.1)" }}>
      <h3>Recommendations</h3>
      {recs.length === 0 && <div>No suggestions</div>}
      <ul>
        {recs.map((r, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            <strong>{r.type}</strong>: {r.suggestion}
            {r.dueDate && <div><small>Suggested: {new Date(r.dueDate).toLocaleDateString()}</small></div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
