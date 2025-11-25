const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

  // TODO: Add your Task routes here
  // GET /api/tasks
  router.get("/", async (req, res) => {
    try{
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST /api/tasks
  router.post("/", async (req, res) => {
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
  // GET /api/tasks/:id
  router.get("/:id", async (req, res) => {
    try{
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  // PUT /api/tasks/:id
  router.put("/:id", async (req, res) => {
   try{
    const { title, completed, pomodoroCount } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;
    if (pomodoroCount !== undefined) updateData.pomodoroCount = pomodoroCount;
    
    const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
   } catch (error) {
    res.status(400).json({ message: error.message });
   }
  });
  // DELETE /api/tasks/:id
  router.delete("/:id", async (req, res) => {
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

  module.exports = router;