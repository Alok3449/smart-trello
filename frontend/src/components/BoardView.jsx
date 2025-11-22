// src/components/BoardView.jsx
import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListColumn from "./ListColumn";
import api from "../api/axios";

export default function BoardView({ boardId, lists, cards, onChange }) {
  const [localLists, setLocalLists] = useState(lists);

  React.useEffect(()=> setLocalLists(lists), [lists]);

  // utility to get cards for list
  const cardsForList = (listId) => cards.filter(c => String(c.listId) === String(listId)).sort((a,b)=>a.order - b.order);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    // only handling card dragging in this component
    if (type === "CARD") {
      const cardId = draggableId;
      // if same list and same index — nothing
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      try {
        await api.put(`/boards/cards/${cardId}/move`, {
          destListId: destination.droppableId,
          destOrder: destination.index
        });
        // refresh data
        if (onChange) onChange();
      } catch (err) {
        console.error("Move failed", err);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
        {localLists.map(list => (
          <ListColumn
            key={list._id}
            list={list}
            cards={cardsForList(list._id)}
            boardId={boardId}
            onChange={onChange}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
