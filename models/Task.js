// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "todo" }, // 'todo', 'in-progress', 'done'
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
