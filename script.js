window.addEventListener('load', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const weatherIconElement = document.getElementById('weather-icon');
    const descriptionElement = document.getElementById('description');
    const forecastCardsElement = document.getElementById('forecast-cards');
  
    searchButton.addEventListener('click', () => {
      const city = searchInput.value.trim();
      if (city) {
        getWeather(city);
        getForecast(city);
      }
    });
  
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
          getWeather(city);
          getForecast(city);
        }
      }
    });
  
    async function getWeather(city) {
      const apiKey = '2b4530a862736441930639896f892710'; // Replace with your actual API key
  
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
  
        if (response.ok) {
          const location = data.name;
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
  
          locationElement.innerText = location;
          temperatureElement.innerText = `${temperature}°C`;
          weatherIconElement.innerHTML = `<i class="wi wi-owm-${icon}"></i>`;
          descriptionElement.innerText = description;
        } else {
          locationElement.innerText = 'Error fetching weather data';
          temperatureElement.innerText = '';
          weatherIconElement.innerHTML = '';
          descriptionElement.innerText = '';
        }
      } catch (error) {
        console.error('Error:', error);
        locationElement.innerText = 'Error fetching weather data';
        temperatureElement.innerText = '';
        weatherIconElement.innerHTML = '';
        descriptionElement.innerText = '';
      }
    }
  
    async function getForecast(city) {
      const apiKey = '2b4530a862736441930639896f892710'; // Replace with your actual API key
  
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
  
        if (response.ok) {
          forecastCardsElement.innerHTML = '';
  
          const forecasts = data.list.filter((forecast) => forecast.dt_txt.includes('12:00:00'));
          forecasts.slice(0, 5).forEach((forecast) => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temperature = forecast.main.temp;
            const description = forecast.weather[0].description;
            const icon = forecast.weather[0].icon;
  
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');
            forecastCard.innerHTML = `
              <h3>${day}</h3>
              <i class="wi wi-owm-${icon}"></i>
              <p>${temperature}°C</p>
              <p>${description}</p>
            `;
  
            forecastCardsElement.appendChild(forecastCard);
          });
        } else {
          forecastCardsElement.innerHTML = 'Error fetching forecast data';
        }
      } catch (error) {
        console.error('Error:', error);
        forecastCardsElement.innerHTML = 'Error fetching forecast data';
      }
    }
  });
  
