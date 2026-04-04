const key = '7026ff78e9ca977465784d9c34c02db0';
const lat = '-22.65';
const lon = '14.58';

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

export async function loadWeather() {
    try {
        const response = await fetch(currentURL);
        if (!response.ok) throw new Error('Current weather unavailable');
        const data = await response.json();
        
        const weatherInfo = document.querySelector('#weather-info');
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const desc = data.weather[0].description;

        if (weatherInfo) {
            // Helper function to turn Unix timestamps into "6:30 AM" format
            const formatTime = (timestamp) => {
                return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
            };

            const sunrise = formatTime(data.sys.sunrise);
            const sunset = formatTime(data.sys.sunset);

            weatherInfo.innerHTML = `
                <div class="weather-flex" style="display: flex; align-items: center; gap: 10px;">
                    <img src="${iconsrc}" alt="${desc}" width="50" height="50">
                    <p><strong>${Math.round(data.main.temp)}°C</strong> - ${desc}</p>
                </div>
                <p>High: ${Math.round(data.main.temp_max)}°C</p>
                <p>Low: ${Math.round(data.main.temp_min)}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            `;
        }

        const fResponse = await fetch(forecastURL);
        if (!fResponse.ok) throw new Error('Forecast unavailable');
        const fData = await fResponse.json();
        
        const forecastContainer = document.querySelector('#forecast');
        const daily = fData.list.filter(x => x.dt_txt.includes("12:00:00")).slice(0, 3);
        
        if (forecastContainer) {
            forecastContainer.innerHTML = daily.map((day, index) => {
                const dateObj = new Date(day.dt * 1000);
                
                // FIXED: Use index to label the first day as "Today" 
                // and use {weekday: 'long'} for full names like "Sunday"
                let dayName;
                if (index === 0) {
                    dayName = "Today";
                } else {
                    dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
                }

                return `<p>${dayName}: <strong>${Math.round(day.main.temp)}°C</strong></p>`;
            }).join('');
        }

    } catch (error) { 
        console.error("Weather Error:", error); 
        const weatherInfo = document.querySelector('#weather-info');
        if (weatherInfo) {
            weatherInfo.innerHTML = "<p>Weather data currently unavailable.</p>";
        }
    }
}