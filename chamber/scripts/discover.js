import { attractions } from '../data/attractions.mjs';

// 1. Visitor Message Logic
const visitField = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (visitField) {
    if (!lastVisit) {
        visitField.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((now - lastVisit) / 86400000);
        visitField.textContent = daysSince < 1 ? "Back so soon! Awesome!" : `You last visited ${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago.`;
    }
    localStorage.setItem("lastVisit", now);
}

// 2. Build the Attraction Cards
const grid = document.querySelector("#discover-grid");

if (grid) {
    attractions.forEach((item, index) => {
        const card = document.createElement("section");
        card.className = "discover-card";
        card.style.gridArea = `card${index + 1}`; // For Criterion 11
        
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" loading="lazy" width="150" height="150">
            <div class="card-details">
                <h2>${item.name}</h2>
                <p>${item.desc}</p>
                <address>${item.address}</address>
            </div>
            <button class="learn-more-btn">Learn More</button>
        `;

        card.querySelector(".learn-more-btn").addEventListener("click", () => {
            window.open(item.link, '_blank');
        });

        grid.appendChild(card);
    });
}
