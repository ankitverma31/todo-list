# Todo List Application

A full-stack todo list application built with Node.js, Express, MongoDB, and Bootstrap.

---

## Prerequisites

Before starting, ensure you have:

- Node.js (v14 or higher) installed
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
- Code editor (VS Code recommended)
- Basic knowledge of JavaScript, HTML, and CSS
- Basic understanding of terminal/command line

---

## Step-by-Step Implementation

### Step 1: Initialize Project

Create project directory and initialize:

```bash
mkdir todo-list
cd todo-list
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

### Step 3: Update package.json Scripts

Open `package.json` and update the scripts section:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 4: Create Project Structure

Create the following folders and files:

```bash
mkdir models routes public
mkdir public/js
touch server.js .env .gitignore
touch models/Task.js
touch routes/tasks.js
touch public/index.html
touch public/js/app.js
```

### Step 5: Configure .gitignore

Create `.gitignore` file:

```
node_modules/
.env
.DS_Store
```

### Step 6: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and sign in
3. Create a new cluster (M0 Free tier)
4. Go to "Database Access" and create a database user with username and password
5. Go to "Network Access" and add IP address (0.0.0.0/0 for development)
6. Go to "Database" → "Connect" → "Connect your application"
7. Copy the connection string

### Step 7: Configure Environment Variables

Create `.env` file in root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todolist?retryWrites=true&w=majority
```

Replace `username` and `password` with your MongoDB credentials.

Note: The server will run on port 3000 by default. To use a different port, add `PORT=3001` to your .env file.

### Step 8: Create Database Model

Create `models/Task.js`:

```javascript
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
```

### Step 9: Create API Routes

Create `routes/tasks.js`:

```javascript
const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching tasks' });
  }
});

// Create new task
router.post('/', async (req, res) => {
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
});

// Toggle task completion
router.patch('/:id', async (req, res) => {
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
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting task' });
  }
});

module.exports = router;
```

### Step 10: Create Express Server

Create `server.js`:

```javascript
// Load environment variables from .env file
require('dotenv').config();

// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import route handlers
const taskRoutes = require('./routes/tasks');

// Initialize Express application
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Establish MongoDB database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Register API route handlers
app.use('/api/tasks', taskRoutes);

// Serve the main HTML page for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 11: Create HTML Frontend

Create `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo List</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
</head>
<body class="bg-light py-4">
  <div class="container" style="max-width: 800px;">
    <!-- Header -->
    <div class="bg-primary text-white text-center p-4 rounded-3 mb-4">
      <h1><i class="bi bi-check2-square"></i> Todo List</h1>
      <p class="mb-0">Stay organized, get things done!</p>
    </div>

    <!-- Add Task Form -->
    <div class="bg-white p-4 rounded-3 shadow-sm mb-3">
      <h5 class="mb-3"><i class="bi bi-plus-circle"></i> Add New Task</h5>
      <form id="addTaskForm">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            id="taskInput" 
            placeholder="What needs to be done?" 
            required
          >
          <button class="btn btn-primary" type="submit">
            <i class="bi bi-plus-lg"></i> Add Task
          </button>
        </div>
      </form>
    </div>

    <!-- Task Stats -->
    <div class="row mb-3">
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Total Tasks</h5>
            <h2 id="totalTasks" class="text-primary mb-0">0</h2>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Completed</h5>
            <h2 id="completedTasks" class="text-success mb-0">0</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Task List -->
    <div class="list-group" id="taskList">
      <!-- Tasks will be added here dynamically -->
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

### Step 12: Create JavaScript Frontend Logic

Create `public/js/app.js`:

```javascript
// API endpoint (works both locally and when deployed)
const API_URL = '/api/tasks';

// Get DOM elements
const addTaskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');

// Fetch and display all tasks
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (data.success) {
      displayTasks(data.tasks);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Display tasks
function displayTasks(tasks) {
  taskList.innerHTML = '';
  
  if (tasks.length === 0) {
    updateStats(0, 0);
    return;
  }
  
  const completedCount = tasks.filter(task => task.completed).length;
  updateStats(tasks.length, completedCount);
  
  tasks.forEach(task => {
    const taskItem = createTaskElement(task);
    taskList.appendChild(taskItem);
  });
}

// Create task element
function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'list-group-item d-flex align-items-center';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'form-check-input me-3';
  checkbox.checked = task.completed;
  checkbox.onclick = () => toggleTask(task._id);
  
  const taskText = document.createElement('span');
  taskText.className = 'flex-grow-1';
  taskText.textContent = task.title;
  if (task.completed) {
    taskText.classList.add('text-decoration-line-through', 'text-muted');
  }
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteTask(task._id);
  
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(deleteBtn);
  
  return taskDiv;
}

// Update statistics
function updateStats(total, completed) {
  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
}

// Add new task
addTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = taskInput.value.trim();
  if (!title) return;
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });
    
    const data = await response.json();
    
    if (data.success) {
      taskInput.value = '';
      fetchTasks();
    }
  } catch (error) {
    console.error('Error adding task:', error);
    alert('Failed to add task. Please try again.');
  }
});

// Toggle task completion
async function toggleTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH'
    });
    
    const data = await response.json();
    
    if (data.success) {
      fetchTasks();
    }
  } catch (error) {
    console.error('Error toggling task:', error);
    alert('Failed to update task. Please try again.');
  }
}

// Delete task
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      fetchTasks();
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Failed to delete task. Please try again.');
  }
}

// Load tasks when page loads
fetchTasks();
```

### Step 13: Run the Application

Start the development server:

```bash
npm run dev
```

The server will start on http://localhost:3000. Open this URL in your browser.

### Step 14: Test the Application

1. Add a new task using the input field
2. Check the checkbox to mark a task as complete
3. Click Delete to remove a task
4. Refresh the page to verify data persists

---

## Deployment to Render.com

### Step 15: Prepare for Deployment

Ensure your `.gitignore` file includes:

```
node_modules/
.env
.DS_Store
```

### Step 16: Push to GitHub

Initialize git repository and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/todo-list.git
git push -u origin main
```

### Step 17: Deploy to Render

1. Go to https://render.com and sign in with GitHub
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** todo-list (or your preferred name)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click "Advanced" and add Environment Variable:
   - **Key:** `MONGODB_URI`
   - **Value:** Your MongoDB Atlas connection string
   
   Note: You do NOT need to set PORT - Render automatically provides this
   
6. Click "Create Web Service"

Render will automatically deploy your application. Once deployed, you'll receive a URL like: `https://your-app-name.onrender.com`

### Step 18: Verify Deployment

1. Open your Render URL in a browser
2. Test all features (add, complete, delete tasks)
3. Verify data persists across page refreshes

Note: Free tier on Render may spin down after inactivity. The first request after inactivity may take 30-60 seconds to load.

---

## Project Structure

```
todo-list/
├── models/
│   └── Task.js           # Mongoose schema for tasks
├── routes/
│   └── tasks.js          # API routes (CRUD operations)
├── public/
│   ├── index.html        # Frontend HTML
│   └── js/
│       └── app.js        # Frontend JavaScript
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── server.js            # Express server
└── package.json         # Dependencies and scripts
```

## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | /api/tasks       | Get all tasks            |
| POST   | /api/tasks       | Create a new task        |
| PATCH  | /api/tasks/:id   | Toggle task completion   |
| DELETE | /api/tasks/:id   | Delete a task            |

## Troubleshooting

**MongoDB Connection Error:**
- Verify MONGODB_URI in .env file
- Check if IP is whitelisted in MongoDB Atlas
- Ensure username and password are correct (no angle brackets)

**Port Already in Use:**
- Add `PORT=3001` to your .env file to use a different port
- Or kill the process using port 3000: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)

**Tasks Not Displaying:**
- Open browser console (F12) to check for errors
- Verify server is running and shows "Connected to MongoDB"
- Check network tab in DevTools for API responses
