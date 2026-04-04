import { attractions } from '../data/attractions.mjs';

// 1. Visitor Message Logic (LocalStorage)
const visitField = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (visitField) {
    if (!lastVisit) {
        visitField.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((now - lastVisit) / 86400000);
        if (daysSince < 1) {
            visitField.textContent = "Back so soon! Awesome!";
        } else {
            visitField.textContent = `You last visited ${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago.`;
        }
    }
    localStorage.setItem("lastVisit", now);
}

// 2. Build the Attraction Cards 
const grid = document.querySelector("#discover-grid");

if (grid) {
    attractions.forEach(item => {
        const card = document.createElement("section");
        card.className = "discover-card";
        
        // restructured to support the side-by-side CSS grid
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" loading="lazy" width="150" height="150">
            <div class="card-details">
                <h2>${item.name}</h2>
                <p>${item.desc}</p>
                <address>${item.address}</address>
            </div>
            <button onclick="window.open('${item.link}', '_blank')">Learn More</button>
        `;
        grid.appendChild(card);
    });
}