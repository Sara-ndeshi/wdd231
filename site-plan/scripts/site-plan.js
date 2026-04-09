// site-plan.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("The Capsule Curator Site Plan Initialized.");
    
    // Logic for dynamic footer content
    const main = document.querySelector('main');
    const footer = document.createElement('footer');
    footer.style.textAlign = 'center';
    footer.style.marginTop = '2rem';
    footer.style.color = '#849398';
    footer.innerHTML = `&copy; ${new Date().getFullYear()} | The Capsule Curator | Site Plan`;
    main.appendChild(footer);
});
