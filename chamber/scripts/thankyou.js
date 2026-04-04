const urlParams = new URLSearchParams(window.location.search);
const resultsDiv = document.querySelector("#results");

// Mapping raw keys to user-friendly labels
const labels = {
    "fname": "First Name",
    "lname": "Last Name",
    "email": "Email Address",
    "phone": "Mobile Phone",
    "organization": "Organization",
    "timestamp": "Submission Date"
};

const showData = (key) => {
    if (urlParams.has(key)) {
        let val = urlParams.get(key);
        
        // Format the date if the key is timestamp
        if (key === "timestamp") {
            val = new Date(val).toLocaleString();
        }

        const p = document.createElement("p");
        // Use the label from our object, or capitalize the key if not found
        const label = labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
        
        p.innerHTML = `<strong>${label}:</strong> ${val}`;
        resultsDiv.appendChild(p);
    }
};

["fname", "lname", "email", "phone", "organization", "timestamp"].forEach(showData);