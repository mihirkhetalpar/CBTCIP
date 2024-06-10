document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '5d047cde0d726942e71ede44b41e0cff';
    const cityInput = document.getElementById('city');
    const weatherIcon = document.getElementById('weatherIcon');

    // Initially hide the weather icon
    weatherIcon.style.display = 'none';

    document.getElementById('getWeather').addEventListener('click', function() {
        const city = cityInput.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    document.getElementById('cityName').textContent = `City: ${data.name}, ${data.sys.country}`;
                    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
                    document.getElementById('feelsLike').textContent = `Feels Like: ${data.main.feels_like} °C`;
                    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
                    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
                    document.getElementById('windDirection').textContent = `Wind Direction: ${data.wind.deg}°`;
                    document.getElementById('cloudiness').textContent = `Cloudiness: ${data.clouds.all}%`;
                    document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
                    document.getElementById('visibility').textContent = `Visibility: ${data.visibility} m`;

                    const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    weatherIcon.src = weatherIconUrl;
                    weatherIcon.alt = data.weather[0].description; // Set alt text for accessibility

                    const sunriseDate = new Date(data.sys.sunrise * 1000);
                    const sunsetDate = new Date(data.sys.sunset * 1000);
                    document.getElementById('sunrise').textContent = `Sunrise: ${sunriseDate.toLocaleTimeString()}`;
                    document.getElementById('sunset').textContent = `Sunset: ${sunsetDate.toLocaleTimeString()}`;
                    
                    document.querySelector('.weather-info').style.display = 'block';
                    weatherIcon.style.display = 'inline-block'; // Show weather icon
                } else {
                    alert('City not found');
                    weatherIcon.style.display = 'none'; // Hide weather icon
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
