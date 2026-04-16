const grid = document.querySelector('#directory-grid');
const modal = document.querySelector('#item-modal');
const modalContent = document.querySelector('#modal-content');
const closeBtn = document.querySelector('#close-modal');

// Filter Buttons
const btnAll = document.querySelector('#filter-all');
const btnTops = document.querySelector('#filter-tops');
const btnBottoms = document.querySelector('#filter-bottoms');

let allItems = []; // Global variable to store fetched data

async function loadItems() {
    try {
        const response = await fetch('data/items.json');
        if (!response.ok) throw new Error("Failed to load collection data");
        
        allItems = await response.json();
        displayItems(allItems); // Initial display

        // Setup Filter Listeners
        btnAll.onclick = () => displayItems(allItems);
        
        btnTops.onclick = () => {
            const filtered = allItems.filter(item => item.category === "Tops");
            displayItems(filtered);
        };

        btnBottoms.onclick = () => {
            const filtered = allItems.filter(item => item.category === "Bottoms");
            displayItems(filtered);
        };

    } catch (err) {
        grid.innerHTML = `<p class="error">Unable to load the collection at this time.</p>`;
        console.error(err);
    }
}

function displayItems(items) {
    grid.innerHTML = ""; // Clear current grid
    
    items.forEach(item => {
        const card = document.createElement('section');
        card.className = "item-card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="400">
            <h3>${item.name}</h3>
            <p class="category-tag">${item.category}</p>
            <button class="open-btn">View Details</button>
        `;
        
        // Modal Logic
        card.querySelector('.open-btn').onclick = () => {
            modalContent.innerHTML = `
                <h2>${item.name}</h2>
                <hr>
                <p><strong>Material:</strong> ${item.material}</p>
                <p><strong>Care:</strong> ${item.care}</p>
                <p class="modal-desc">${item.description}</p>
            `;
            modal.showModal();
        };
        
        grid.appendChild(card);
    });
}

// Close Modal
if (closeBtn) {
    closeBtn.onclick = () => modal.close();
}

// Close modal when clicking outside (on the backdrop)
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});

loadItems();