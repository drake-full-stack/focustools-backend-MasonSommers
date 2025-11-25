const mongoose = require("mongoose");

// TODO: Define your Task schema here
const taskSchema = new mongoose.Schema(
  {
    // TODO: Add title field (String, required, trim)
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // TODO: Add completed field (Boolean, default false)
    completed: {
      type: Boolean,
      default: false,
    },
    // Pomodoro count field
    pomodoroCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
