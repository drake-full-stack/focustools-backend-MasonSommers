const express = require("express");
const Session = require("../models/Session");
const router = express.Router();

// TODO: Add your Session routes here
// POST /api/sessions
router.post("/api/sessions", async (req, res) => {
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
  router.get("/api/sessions", async (req, res) => {
    try{
      const sessions = await Session.find().populate("taskId");
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
 

  module.exports = router;