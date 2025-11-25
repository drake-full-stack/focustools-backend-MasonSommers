require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const taskRoutes = require("./routes/tasks");
const sessionRoutes = require("./routes/session");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

// Import models
app.use("/api/tasks", taskRoutes);
app.use("/api/sessions", sessionRoutes);

 // POST /api/sessions
 app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});