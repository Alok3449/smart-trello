// backend/models/List.js
const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  title: String,
  order: Number
});
module.exports = mongoose.model("List", listSchema);
