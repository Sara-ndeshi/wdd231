// Set current date and time in hidden field
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.querySelector("#form-timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});