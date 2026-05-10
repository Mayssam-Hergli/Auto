// Dashboard functionality

let currentUserRole = getUserRole();
let currentUserId = getUserId();

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  displayUserInfo();
  displayGrades();
  
  // If admin, set up grade inputs
  if (currentUserRole === 'admin') {
    setupAdminGradeInputs();
  }
  
  // Check for new grades periodically (for users)
  if (currentUserRole === 'user') {
    setInterval(checkForNewGrades, 2000);
  }
});

function initializeDashboard() {
  // Additional initialization if needed
}

function displayUserInfo() {
  const userDisplay = document.getElementById('userDisplay');
  const roleText = currentUserRole === 'admin' ? 'Administrateur' : 'Utilisateur';
  userDisplay.textContent = `${roleText}: ${currentUserId}`;
}

function setupAdminGradeInputs() {
  // Show grade input fields for admin
  for (let i = 1; i <= 4; i++) {
    const adminInput = document.getElementById(`adminGradeInput${i}`);
    if (adminInput) {
      adminInput.style.display = 'flex';
    }
    
    // Load stored grade value if exists
    const storedGrade = localStorage.getItem(`grade${i}`);
    if (storedGrade) {
      document.getElementById(`gradeInput${i}`).value = storedGrade;
    }
  }
}

function displayGrades() {
  for (let i = 1; i <= 4; i++) {
    const gradeValue = localStorage.getItem(`grade${i}`);
    const gradeDisplay = document.getElementById(`grade${i}`);
    
    if (gradeValue) {
      gradeDisplay.textContent = `Note: ${gradeValue}/20`;
      gradeDisplay.style.color = '#33cb00';
    } else {
      gradeDisplay.textContent = 'Note: --';
      gradeDisplay.style.color = '#8aa5ff';
    }
  }
}

function saveGrade(gradeNumber) {
  const inputElement = document.getElementById(`gradeInput${gradeNumber}`);
  const gradeValue = inputElement.value.trim();
  
  if (!gradeValue || isNaN(gradeValue) || gradeValue < 0 || gradeValue > 20) {
    showNotification('Erreur', 'Veuillez entrer une note valide entre 0 et 20');
    return;
  }
  
  // Save to localStorage
  localStorage.setItem(`grade${gradeNumber}`, gradeValue);
  
  // Mark as newly assigned
  localStorage.setItem(`gradeNotified${gradeNumber}`, 'false');
  
  // Update display
  displayGrades();
  
  // Show confirmation
  showNotification('Succès', `Note du compte rendu ${gradeNumber} attribuée: ${gradeValue}/20`);
}

function checkForNewGrades() {
  for (let i = 1; i <= 4; i++) {
    const notifiedKey = `gradeNotified${i}`;
    const gradeValue = localStorage.getItem(`grade${i}`);
    const hasBeenNotified = localStorage.getItem(`gradeNotified${i}`) === 'true';
    
    if (gradeValue && !hasBeenNotified) {
      showNotification(
        'Nouvelle Note',
        `Vous avez reçu une note pour le compte rendu ${i}: ${gradeValue}/20`
      );
      localStorage.setItem(`gradeNotified${i}`, 'true');
      displayGrades();
    }
  }
}

function showNotification(title, message) {
  const notificationBox = document.getElementById('notificationBox');
  const notificationTitle = document.getElementById('notificationTitle');
  const notificationMessage = document.getElementById('notificationMessage');
  
  notificationTitle.textContent = title;
  notificationMessage.textContent = message;
  
  notificationBox.classList.add('show');
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    closeNotification();
  }, 5000);
}

function closeNotification() {
  const notificationBox = document.getElementById('notificationBox');
  notificationBox.classList.remove('show');
}

// Add keyboard shortcut to close notification (Escape key)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeNotification();
  }
});
