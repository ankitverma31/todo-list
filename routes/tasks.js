const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching tasks' });
  }
}

// Create new task
async function createTask(req, res) {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    
    const task = new Task({ title });
    await task.save();
    
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating task' });
  }
}

// Toggle task completion
async function toggleTaskCompletion(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    task.completed = !task.completed;
    await task.save();
    
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating task' });
  }
}

// Delete task
async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting task' });
  }
}

// Register routes
router.get('/', getAllTasks);
router.post('/', createTask);
router.patch('/:id', toggleTaskCompletion);
router.delete('/:id', deleteTask);

module.exports = router;
