import { loadWeather } from './weather.mjs';
import { loadSpotlights } from './spotlights.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // Wayfinding & Footer
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Hamburger Menu
    const hamburger = document.querySelector('#hamburger-menu');
    const nav = document.querySelector('#primary-nav');
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));

    // Initialize Modules
    loadWeather();
    loadSpotlights();
});
