// src/components/CardItem.jsx
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import api from "../api/axios";

export default function CardItem({ card, index, onChange }) {
  const deleteCard = async () => {
    try {
      await api.delete(`/boards/cards/${card._id}`); // implement delete on backend if needed
      if (onChange) onChange();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <Draggable draggableId={String(card._id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: 8,
            marginBottom: 8,
            background: "#fff",
            borderRadius: 4,
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            ...provided.draggableProps.style
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{card.title}</div>
            <div>
              {card.dueDate && <small>{new Date(card.dueDate).toLocaleDateString()}</small>}
            </div>
          </div>
          <div style={{ marginTop: 6 }}>
            <button onClick={deleteCard}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
