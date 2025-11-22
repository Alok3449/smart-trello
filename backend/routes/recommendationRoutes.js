// backend/routes/recommendationRoutes.js
const express = require("express");
const Card = require("../models/Card");
const { getRecommendations } = require("../utils/recommendations");

const router = express.Router();

router.get("/:boardId", async (req, res) => {
  const cards = await Card.find({ boardId: req.params.boardId });
  const recs = getRecommendations(cards);
  res.json(recs);
});

module.exports = router;
