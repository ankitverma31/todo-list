const API_URL = window.location.origin;

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const alertContainer = document.getElementById('alertContainer');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');

// Show alert message
function showAlert(message, type = 'danger') {
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// Check if user is already logged in
if (localStorage.getItem('token')) {
  window.location.href = '/dashboard';
}

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Show loading state
  btnText.classList.add('d-none');
  btnSpinner.classList.remove('d-none');
  
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token and user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      showAlert('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      showAlert(data.message || 'Login failed', 'danger');
      btnText.classList.remove('d-none');
      btnSpinner.classList.add('d-none');
    }
  } catch (error) {
    console.error('Login error:', error);
    showAlert('An error occurred. Please try again.', 'danger');
    btnText.classList.remove('d-none');
    btnSpinner.classList.add('d-none');
  }
});

