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

