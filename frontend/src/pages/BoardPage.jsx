// src/pages/BoardPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import BoardView from "../components/BoardView";
import RecommendationPanel from "../components/RecommendationPanel";

export default function BoardPage(){
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    loadBoard();
    loadLists();
    loadCards();
  }, [id]);

  async function loadBoard(){
    try {
      const res = await api.get(`/boards`); // minimal; to get details you'd build route
      // set board to something — for now use simple object
      setBoard({ _id:id, title: "Board" });
    } catch (err) {}
  }

  async function loadLists(){
    try {
      const res = await api.get(`/boards/${id}/lists`);
      setLists(res.data);
    } catch (err) { setLists([]); }
  }

  async function loadCards(){
    try {
      const res = await api.get(`/boards/${id}/cards`);
      setCards(res.data);
    } catch (err) { setCards([]); }
  }

  // handlers to refresh after mutations
  const onDataChange = async () => {
    await loadLists();
    await loadCards();
  };

  return (
    <div style={{ display: "flex", padding: 12 }}>
      <div style={{ flex: 1 }}>
        <h2>{board?.title || "Board"}</h2>
        <BoardView boardId={id} lists={lists} cards={cards} onChange={onDataChange} />
      </div>

      <div style={{ width: 320 }}>
        <RecommendationPanel boardId={id} />
      </div>
    </div>
  );
}
