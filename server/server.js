require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

// Import models
const Task = require("./models/Task");
const Session = require("./models/Session");

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "FocusTools API",
    status: "Running",
    endpoints: {
      tasks: "/api/tasks",
      sessions: "/api/sessions",
    },
  });
});

// TODO: Add your Task routes here
// POST /api/tasks
app.post("/api/tasks", async (req, res) => {
try{
const { title } = req.body;
const { completed } = req.body;
const task = new Task({ title, completed });
const savedTask = await task.save();
res.status(201).json(savedTask);
} catch (error) {
res.status(400).json({ message: error.message });
}
});
// GET /api/tasks
app.get("/api/tasks", async (req, res) => {
  try{
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET /api/tasks/:id
app.get("/api/tasks/:id", async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);
    res.json(task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// PUT /api/tasks/:id
app.put("/api/tasks/:id", async (req, res) => {
 try{
  const { title } = req.body;
  const {completed} = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
});
// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", async (req, res) => {
  try{
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    
    if(!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TODO: Add your Session routes here
// POST /api/sessions
app.post("/api/sessions", async (req, res) => {
  try{
    const { taskId, duration, startTime } = req.body;
    const session = new Session({ taskId, duration, startTime });
    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/sessions
app.get("/api/sessions", async (req, res) => {
  try{
    const sessions = await Session.find().populate("taskId");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/sessions
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
