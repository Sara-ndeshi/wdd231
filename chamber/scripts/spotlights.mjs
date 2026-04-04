export async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Could not load members');
        const members = await response.json();

        // Filter: Silver (2) and Gold (3)
        const eligible = members.filter(m => m.membership >= 2);
        
        // Randomize and pick 3
        const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

        const container = document.querySelector('#business-spotlights');
        if (container) {
            container.innerHTML = selected.map(m => `
                <div class="spotlight-card">
                    <h4>${m.name}</h4>
                    <img src="${m.image}" alt="${m.name} logo" loading="lazy">
                    <p>${m.phone}</p>
                    <p><a href="${m.website}" target="_blank">Website</a></p>
                    <p>Level: ${m.membership === 3 ? 'Gold' : 'Silver'}</p>
                </div>
            `).join('');
        }
    } catch (error) { 
        console.error("Spotlight Error:", error); 
    }
}