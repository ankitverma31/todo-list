const API_URL = window.location.origin;

// Get DOM elements
const registerForm = document.getElementById('registerForm');
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

// Handle form submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Show loading state
  btnText.classList.add('d-none');
  btnSpinner.classList.remove('d-none');
  
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Registration successful! Redirecting to login...', 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      showAlert(data.message || 'Registration failed', 'danger');
      btnText.classList.remove('d-none');
      btnSpinner.classList.add('d-none');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showAlert('An error occurred. Please try again.', 'danger');
    btnText.classList.remove('d-none');
    btnSpinner.classList.add('d-none');
  }
});

