import { fetchWeather } from './utils.js';

// --- CONFIGURATION ---
const apiKey = "7026ff78e9ca977465784d9c34c02db0";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oshakati&units=metric&appid=${apiKey}`;

// --- DOM ELEMENTS ---
const menuBtn = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');
const yearSpan = document.querySelector('#year');
const featuredGrid = document.querySelector('#directory-grid');
const modal = document.querySelector("#item-details");
const closeModal = document.querySelector("#close-modal");

// --- 1. UI SETUP (Menu, Footer, Local Storage) ---
function initUI() {
    // Hamburger Menu + ARIA (Criterion 5)
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuBtn.textContent = isOpen ? '✕' : '☰';
            menuBtn.setAttribute('aria-expanded', isOpen);
            menuBtn.setAttribute('aria-label', isOpen ? 'Close Menu' : 'Open Menu');
        });
    }

    // Set Current Year
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Local Storage: Visit Counter 
    const visitDisplay = document.querySelector("#visit-counter");
    let numVisits = Number(window.localStorage.getItem("site-visits")) || 0;
    if (visitDisplay) {
        visitDisplay.textContent = numVisits === 0 ? "This is your first visit!" : `Visits: ${numVisits}`;
    }
    numVisits++;
    localStorage.setItem("site-visits", numVisits);
}

function setupModal(item) {
    if (!modal) return;
    const content = document.querySelector("#modal-content");
    content.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}" style="width:100%">
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Details:</strong> This high-quality piece is a staple for any capsule wardrobe, designed for longevity and style.</p>
    `;
    modal.showModal();
}

async function loadFeaturedItems() {
    if (!featuredGrid || !document.querySelector('#featured')) return;

    try {
        const response = await fetch('data/items.json');
        const items = await response.json();
        const featured = items.slice(0, 3); // Showing subset of the 15+ items
        featuredGrid.innerHTML = ""; 

        featured.forEach(item => {
            const card = document.createElement('section');
            card.className = "item-card";
            card.innerHTML = `
                <img src="${item.image}" alt="Fashion item: ${item.name}" loading="lazy">
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <button class="open-btn">Quick View</button>
            `;
            // Modal trigger
            card.querySelector('.open-btn').addEventListener('click', () => setupModal(item));
            featuredGrid.appendChild(card);
        });
    } catch (error) {
        console.error("Loading items failed:", error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    fetchWeather(weatherUrl);
    loadFeaturedItems();
    if(closeModal) closeModal.addEventListener("click", () => modal.close());
});