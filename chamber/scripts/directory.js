document.addEventListener("DOMContentLoaded", () => {

    const url = 'data/members.json';
    const display = document.querySelector('#directory-listing');

    async function getMembers() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const displayMembers = (members) => {
        display.innerHTML = "";

        members.forEach((member) => {
            let card = document.createElement('section');

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy" width="200" height="150">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership: ${
                    member.membership === 3 ? 'Gold' :
                    member.membership === 2 ? 'Silver' :
                    'Member'
                }</p>
            `;

            display.appendChild(card);
        });
    };

    // Layout Toggles 
    const gridBtn = document.querySelector("#grid-toggle");
    const listBtn = document.querySelector("#list-toggle");

    if (gridBtn && listBtn) {
        gridBtn.addEventListener("click", () => {
            display.classList.add("grid");
            display.classList.remove("list");
        });

        listBtn.addEventListener("click", () => {
            display.classList.add("list");
            display.classList.remove("grid");
        });
    }

    // Hamburger Menu 
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('primary-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // Footer
    const year = document.getElementById('copyright-year');
    const modified = document.getElementById('last-modified');

    if (year) year.textContent = new Date().getFullYear();
    if (modified) modified.textContent = document.lastModified;

    // Load data LAST
    getMembers();
});