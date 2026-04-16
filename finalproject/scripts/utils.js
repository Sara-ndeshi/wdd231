// Exporting the weather function as a module
export async function fetchWeather(url) {
    const weatherContainer = document.querySelector('#weather-content');
    if (!weatherContainer) return;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            let advice = temp > 25 ? "Wear linen & light cotton." : temp > 15 ? "A light blazer is ideal." : "Layer up with a coat.";

            weatherContainer.innerHTML = `
                <div class="weather-info">
                    <img src="${iconUrl}" alt="${desc}" class="weather-icon">
                    <p><strong>${temp}°C</strong></p>
                </div>
                <p style="text-transform: capitalize;">${desc}</p>
                <p><em>Curator's Note: ${advice}</em></p>
            `;
        }
    } catch (error) {
        console.error("Weather data failed:", error);
    }
}