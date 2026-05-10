// Authentication handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const userId = document.getElementById('userId').value.trim();
  const userPassword = document.getElementById('userPassword').value;
  const errorMessage = document.getElementById('errorMessage');
  
  const adminId = 'Chatti';
  const adminPassword = 'corrtp123';
  const regularId = 'user';
  const regularPassword = '123';
  
  // Check credentials
  if (userId === adminId && userPassword === adminPassword) {
    // Admin login
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('userId', userId);
    window.location.href = 'index.html';
  } else if (userId === regularId && userPassword === regularPassword) {
    // Regular user login
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('userId', userId);
    window.location.href = 'index.html';
  } else {
    // Invalid credentials
    errorMessage.classList.add('show');
    document.getElementById('userPassword').value = '';
  }
});

// Check if user is already logged in on login page
if (document.body.contains(document.getElementById('loginForm'))) {
  if (localStorage.getItem('loggedIn') === 'true') {
    window.location.href = 'index.html';
  }
}

// Logout function
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  window.location.href = 'login.html';
}

// Check if user is authenticated
function checkAuth() {
  if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
}

// Get user role
function getUserRole() {
  return localStorage.getItem('userRole') || 'user';
}

// Get current user ID
function getUserId() {
  return localStorage.getItem('userId') || '';
}
