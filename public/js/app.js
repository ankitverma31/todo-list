// API endpoint
const API_URL = 'http://localhost:3000/api/tasks';

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
  // Clear current list
  taskList.innerHTML = '';
  
  // Show empty state if no tasks
  if (tasks.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-clipboard-x"></i>
        <h5>No tasks yet</h5>
        <p>Add your first task above to get started!</p>
      </div>
    `;
    updateStats(0, 0);
    return;
  }
  
  // Count completed tasks
  const completedCount = tasks.filter(task => task.completed).length;
  updateStats(tasks.length, completedCount);
  
  // Create task items
  tasks.forEach(task => {
    const taskItem = createTaskElement(task);
    taskList.appendChild(taskItem);
  });
}

// Create task element
function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
  
  taskDiv.innerHTML = `
    <div class="form-check">
      <input 
        class="form-check-input" 
        type="checkbox" 
        ${task.completed ? 'checked' : ''} 
        onchange="toggleTask('${task._id}')"
      >
    </div>
    <div class="task-title">${escapeHtml(task.title)}</div>
    <button class="btn btn-danger btn-sm" onclick="deleteTask('${task._id}')">
      <i class="bi bi-trash"></i>
    </button>
  `;
  
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

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Load tasks when page loads
fetchTasks();

