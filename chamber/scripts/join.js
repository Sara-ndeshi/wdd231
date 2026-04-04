document.addEventListener("DOMContentLoaded", () => {
    // 1. SET THE TIMESTAMP
    // This records exactly when the user opened the form
    const timestampField = document.querySelector("#form-timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. OPEN MODALS (Lear More Buttons)
    // We select all buttons inside membership cards
    const openButtons = document.querySelectorAll(".membership-card button");
    
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            // This logic finds the correct modal ID by looking at the card's class (np, bronze, etc.)
            const card = button.closest(".membership-card");
            const level = card.classList[1]; // Gets 'np', 'bronze', etc.
            const modal = document.querySelector(`#modal-${level}`);
            
            if (modal) {
                modal.showModal();
            }
        });
    });

    // 3. CLOSE MODALS (X Buttons)
    const closeButtons = document.querySelectorAll(".close-modal");
    
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
    });

    // 4. CLOSE MODAL ON OUTSIDE CLICK (Backdrop)
    // Extra polish: allows users to click the "grey area" to exit
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach(dialog => {
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
});