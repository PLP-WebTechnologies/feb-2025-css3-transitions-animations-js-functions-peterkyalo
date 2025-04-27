document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const animateBtn = document.getElementById('animateBtn');
    const bounceBtn = document.getElementById('bounceBtn');
    const rotateBtn = document.getElementById('rotateBtn');
    const targetBox = document.getElementById('targetBox');
    const body = document.body;

    // Load saved preferences
    loadPreferences();

    // Event listeners
    savePrefsBtn.addEventListener('click', savePreferences);
    animateBtn.addEventListener('click', triggerSlideAnimation);
    bounceBtn.addEventListener('click', triggerBounceAnimation);
    rotateBtn.addEventListener('click', triggerRotateAnimation);

    // Function to save preferences to localStorage
    function savePreferences() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyTheme(preferences.theme);
        
        // Show confirmation animation
        savePrefsBtn.textContent = 'Saved!';
        setTimeout(() => {
            savePrefsBtn.textContent = 'Save Preferences';
        }, 2000);
    }

    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            usernameInput.value = preferences.username || '';
            themeSelect.value = preferences.theme || 'light';
            applyTheme(preferences.theme);
        }
    }

    // Apply selected theme
    function applyTheme(theme) {
        // Remove all theme classes first
        body.classList.remove('light', 'dark', 'blue', 'green');
        
        // Add the selected theme class
        body.classList.add(theme);
    }

    // Animation functions
    function triggerSlideAnimation() {
        // Reset any ongoing animations
        targetBox.style.animation = 'none';
        targetBox.offsetHeight; // Trigger reflow
        targetBox.style.animation = 'slideIn 1s ease-out forwards';
    }

    function triggerBounceAnimation() {
        targetBox.style.animation = 'none';
        targetBox.offsetHeight;
        targetBox.style.animation = 'bounce 0.8s ease 3';
    }

    function triggerRotateAnimation() {
        targetBox.style.animation = 'none';
        targetBox.offsetHeight;
        targetBox.style.animation = 'rotateAndScale 1.5s ease-in-out forwards';
    }

    // Additional interactive effect for the animated box
    targetBox.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = '#33ff57';
    });

    targetBox.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#ff5733';
    });
});