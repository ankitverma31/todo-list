const API_URL = window.location.origin;

// Check authentication
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!token) {
  window.location.href = '/';
}

// Display user name
document.getElementById('userName').textContent = user.name || 'User';

// Get DOM elements
const addTaskForm = document.getElementById('addTaskForm');
const tasksList = document.getElementById('tasksList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

// Show empty state
function showEmptyState() {
  tasksList.innerHTML = `
    <div class="empty-state">
      <i class="bi bi-clipboard-x"></i>
      <h5>No tasks yet</h5>
      <p>Add your first task to get started!</p>
    </div>
  `;
}

// Update stats
function updateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'Done').length;
  
  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
}

// Render tasks
function renderTasks(tasks) {
  if (tasks.length === 0) {
    showEmptyState();
    updateStats([]);
    return;
  }
  
  tasksList.innerHTML = tasks.map(task => `
    <div class="task-card ${task.status === 'Done' ? 'done' : ''}">
      <div class="d-flex justify-content-between align-items-start">
        <div class="flex-grow-1">
          <h5 class="task-title">${escapeHtml(task.title)}</h5>
          ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
          <span class="task-status ${task.status === 'Done' ? 'status-done' : 'status-pending'}">
            ${task.status === 'Done' ? '<i class="bi bi-check-circle"></i>' : '<i class="bi bi-clock"></i>'} 
            ${task.status}
          </span>
        </div>
        <div class="d-flex gap-2">
          ${task.status === 'Pending' ? `
            <button class="btn btn-success btn-action" onclick="markAsDone('${task._id}')">
              <i class="bi bi-check-lg"></i> Done
            </button>
          ` : `
            <button class="btn btn-warning btn-action" onclick="markAsPending('${task._id}')">
              <i class="bi bi-arrow-counterclockwise"></i> Undo
            </button>
          `}
          <button class="btn btn-danger btn-action" onclick="deleteTask('${task._id}')">
            <i class="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  updateStats(tasks);
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

// Fetch tasks
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      renderTasks(data.tasks);
    } else {
      if (response.status === 401) {
        logout();
      }
      console.error('Failed to fetch tasks:', data.message);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Add new task
addTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDescription').value.trim();
  
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Reset form
      addTaskForm.reset();
      // Refresh tasks
      fetchTasks();
    } else {
      alert(data.message || 'Failed to add task');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    alert('An error occurred. Please try again.');
  }
});

// Mark task as done
async function markAsDone(taskId) {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'Done' })
    });
    
    const data = await response.json();
    
    if (data.success) {
      fetchTasks();
    } else {
      alert(data.message || 'Failed to update task');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    alert('An error occurred. Please try again.');
  }
}

// Mark task as pending
async function markAsPending(taskId) {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'Pending' })
    });
    
    const data = await response.json();
    
    if (data.success) {
      fetchTasks();
    } else {
      alert(data.message || 'Failed to update task');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    alert('An error occurred. Please try again.');
  }
}

// Delete task
async function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      fetchTasks();
    } else {
      alert(data.message || 'Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('An error occurred. Please try again.');
  }
}

// Load tasks on page load
fetchTasks();

