// backend/routes/boardRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");

const router = express.Router();

// Create board
router.post("/", auth, async (req, res) => {
  const board = await Board.create({ title: req.body.title, owner: req.user, members: [] });
  res.json(board);
});

// Get boards for user (owned or member)
router.get("/", auth, async (req, res) => {
  const user = req.user;
  const owned = await Board.find({ owner: user });
  const memberBoards = await Board.find({ members: { $in: [req.userEmail, /* maybe use user email */] } });
  // simple variant: return owned only
  res.json(owned);
});

// Invite user by email
router.post("/:boardId/invite", auth, async (req, res) => {
  const board = await Board.findById(req.params.boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });
  board.members = board.members || [];
  if (!board.members.includes(req.body.email)) board.members.push(req.body.email);
  await board.save();
  res.json({ message: "User invited" });
});

// Create list in board
router.post("/:boardId/lists", auth, async (req, res) => {
  const count = await List.countDocuments({ boardId: req.params.boardId });
  const list = await List.create({ boardId: req.params.boardId, title: req.body.title, order: count });
  res.json(list);
});

// Get lists for board
router.get("/:boardId/lists", auth, async (req, res) => {
  const lists = await List.find({ boardId: req.params.boardId }).sort({ order: 1 });
  res.json(lists);
});

// Create card in list
router.post("/lists/:listId/cards", auth, async (req, res) => {
  const list = await List.findById(req.params.listId);
  if (!list) return res.status(404).json({ message: "List not found" });
  const count = await Card.countDocuments({ listId: req.params.listId });
  const card = await Card.create({
    boardId: list.boardId,
    listId: req.params.listId,
    title: req.body.title,
    description: req.body.description || "",
    order: count,
    createdBy: req.body.createdBy || "unknown"
  });
  res.json(card);
});

// Get cards for board
router.get("/:boardId/cards", auth, async (req, res) => {
  const cards = await Card.find({ boardId: req.params.boardId }).sort({ order: 1 });
  res.json(cards);
});

// Move card (drag & drop): update card.listId and order; optionally reorder other cards
router.put("/cards/:cardId/move", auth, async (req, res) => {
  // body: { destListId, destOrder }
  const { destListId, destOrder } = req.body;
  const card = await Card.findById(req.params.cardId);
  if (!card) return res.status(404).json({ message: "Card not found" });

  // decrement order of cards in old list that were after this card
  await Card.updateMany(
    { listId: card.listId, order: { $gt: card.order } },
    { $inc: { order: -1 } }
  );

  // increment orders in dest list >= destOrder
  await Card.updateMany(
    { listId: destListId, order: { $gte: destOrder } },
    { $inc: { order: 1 } }
  );

  card.listId = destListId;
  card.order = destOrder;
  await card.save();

  res.json(card);
});

module.exports = router;
