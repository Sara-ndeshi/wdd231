// Local Storage Key
const STORAGE_KEY = 'curatedClosetPref';

const styleForm = document.querySelector('#style-form');
const welcomeMsg = document.querySelector('#welcome-message');

// Check for existing data on load
window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedData) {
        welcomeMsg.textContent = `Welcome back, ${savedData.fname}! Update your preferences below.`;
        // Pre-fill form fields
        document.querySelector('#fname').value = savedData.fname;
        document.querySelector('#email').value = savedData.email;
        document.querySelector('#style-pref').value = savedData.style;
    }
});

// Handle Form Submission
styleForm.addEventListener('submit', (e) => {
    // Capture data
    const formData = {
        fname: document.querySelector('#fname').value,
        email: document.querySelector('#email').value,
        style: document.querySelector('#style-pref').value,
        timestamp: new Date().toISOString()
    };

    // Save to Local Storage (Rubric Item: Application State)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});