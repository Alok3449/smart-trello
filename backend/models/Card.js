// backend/models/Card.js
const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  title: String,
  description: String,
  dueDate: Date,
  order: Number,
  createdBy: String
});
module.exports = mongoose.model("Card", cardSchema);
