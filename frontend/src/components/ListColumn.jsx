// src/components/ListColumn.jsx
import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import CardItem from "./CardItem";
import api from "../api/axios";

export default function ListColumn({ list, cards, boardId, onChange }) {
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const addCard = async () => {
    if (!title) return alert("Enter card title");
    try {
      await api.post(`/boards/lists/${list._id}/cards`, {
        title,
        description: ""
      });
      setTitle("");
      setAdding(false);
      if (onChange) onChange();
    } catch (err) {
      alert("Error adding card");
    }
  };

  return (
    <div style={{ width: 300, background: "#f7f7f7", padding: 8, borderRadius: 6 }}>
      <h4>{list.title}</h4>
      <Droppable droppableId={String(list._id)} type="CARD">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 40 }}>
            {cards.map((c, index) => <CardItem key={c._id} card={c} index={index} onChange={onChange} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {adding ? (
        <>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Card title" />
          <div>
            <button onClick={addCard}>Add</button>
            <button onClick={()=>{setAdding(false); setTitle("")}}>Cancel</button>
          </div>
        </>
      ) : (
        <button onClick={()=>setAdding(true)}>+ Add card</button>
      )}
    </div>
  );
}
