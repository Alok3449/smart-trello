// backend/models/Board.js
const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: String }] // emails
});
module.exports = mongoose.model("Board", boardSchema);
