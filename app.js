// Faculty of Law Exam Platform - Main JS
// Author: Mohamed Nasser Mohammed
// Description: Modularized, documented, and improved version

// ========== GLOBAL STATE ==========
const state = {
    user: null,
    lang: 'ar',
    subjects: {},
    currentSubject: null,
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    quizResults: {},
    shuffledQuestions: {},
    timer: null,
    totalTimeLeft: 0,
    timeUp: false
};

// ========== UTILS ==========
function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

function showScreen(screenId) {
    const elements = $all('.screen');
    elements.forEach(s => s.classList.remove('active'));
    const screen = $(screenId);
    if (screen) screen.classList.add('active');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    
    const bgColor = type === 'success' ? '#27AE60' : 
                   type === 'error' ? '#E74C3C' : 
                   '#3498DB';
    
    const iconClass = type === 'success' ? 'fa-check-circle' :
                     type === 'error' ? 'fa-exclamation-circle' :
                     'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
        <button class="close-notification" aria-label="Close notification"><i class="fas fa-times"></i></button>
    `;
    notification.style.background = bgColor;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    
    document.body.appendChild(notification);
    
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });
    
    setTimeout(() => {
        if (notification.parentElement) notification.remove();
    }, 5000);
}

// ========== AUTH ==========
window.handleLogin = function() {
    const usernameInput = $('#login-username');
    if (!usernameInput) {
        console.error('Username input not found');
        return;
    }
    
    const username = usernameInput.value.trim();
    const loginError = $('#login-error');
    
    if (username.length < 4) {
        if (loginError) {
            loginError.textContent = 'Name must be at least 4 characters';
            loginError.style.display = 'block';
        }
        return;
    }
    
    state.user = { username };
    if (loginError) loginError.style.display = 'none';
    
    const userNameSubject = $('#userNameSubject');
    if (userNameSubject) userNameSubject.textContent = username;
    
    showScreen('#subjectScreen');
    showNotification(`Welcome ${username}!`, 'success');
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = $('#login-btn');
    const usernameInput = $('#login-username');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    if (usernameInput) {
        usernameInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') handleLogin();
        });
    }
    
    showNotification('Platform loaded successfully', 'success');
});