// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/BoardRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/recommendations", recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
