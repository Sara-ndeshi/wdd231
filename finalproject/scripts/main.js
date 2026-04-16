// --- CONFIGURATION ---
const apiKey = "7026ff78e9ca977465784d9c34c02db0";
const city = "Oshakati"; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

// --- DOM ELEMENTS ---
const menuBtn = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');
const yearSpan = document.querySelector('#year');
const featuredGrid = document.querySelector('#directory-grid');

// --- 1. UI SETUP (Menu & Footer) ---
function initUI() {
    // Hamburger Menu Toggle - ADD IT HERE
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            
            // This updates the icon visually
            menuBtn.textContent = isOpen ? '✕' : '☰';
            
            // This updates the accessibility tags for a perfect score
            menuBtn.setAttribute('aria-expanded', isOpen);
            menuBtn.setAttribute('aria-label', isOpen ? 'Close Menu' : 'Open Menu');
        });
    }

    // Set Current Year in Footer (Keep this too)
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// --- 2. WEATHER API ---
async function fetchWeather() {
    const weatherContainer = document.querySelector('#weather-content');
    if (!weatherContainer) return;

    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            // Using https to avoid contrast/security blocks
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            let advice = temp > 25 ? "Wear linen & light cotton." : temp > 15 ? "A light blazer is ideal." : "Layer up with a coat.";

            weatherContainer.innerHTML = `
                <div class="weather-info">
                    <img src="${iconUrl}" alt="${desc}" class="weather-icon">
                    <p><strong>${temp}°C</strong></p>
                </div>
                <p style="text-transform: capitalize;">${desc}</p>
                <p><em>Curator's Note: ${advice}</em></p>
            `;
        }
    } catch (error) {
        console.error("Weather data failed:", error);
    }
}

// --- 3. FEATURED ITEMS (Home Page Only) ---
async function loadFeaturedItems() {
    if (!featuredGrid || !document.querySelector('#featured')) return;

    try {
        const response = await fetch('data/items.json');
        const items = await response.json();
        
        const featured = items.slice(0, 3);
        featuredGrid.innerHTML = ""; 

        featured.forEach(item => {
            const card = document.createElement('section');
            card.className = "item-card";
            
            // Fix: Combined content to avoid Redundant Link alerts
            // Alt text is descriptive to pass Accessibility features check
            card.innerHTML = `
                <img src="${item.image}" alt="Fashion item: ${item.name}" loading="lazy">
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <a href="directory.html" class="open-btn">View Details</a>
            `;
            featuredGrid.appendChild(card);
        });
    } catch (error) {
        console.error("Featured items failed:", error);
    }
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    fetchWeather();
    loadFeaturedItems();
});