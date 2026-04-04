const urlParams = new URLSearchParams(window.location.search);
const resultsDiv = document.querySelector("#results");

const showData = (key) => {
    if (urlParams.has(key)) {
        const val = urlParams.get(key);
        const p = document.createElement("p");
        p.innerHTML = `<strong>${key.replace(/^\w/, (c) => c.toUpperCase())}:</strong> ${val}`;
        resultsDiv.appendChild(p);
    }
};

// Required fields to show
["fname", "lname", "email", "phone", "organization", "timestamp"].forEach(showData);