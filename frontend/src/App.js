import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(`https://vaatavaranam.onrender.com/api/weather`, {
      params: { city },
      });
      setWeather(response.data);
      setCity("");
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h4>वातावरणम्‌</h4>
      </header>
      <section>
        <div className="row">
          <div className="weather-container col-lg-12 col-sm-12 col-12">
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p className="error">{error}</p>}

            {weather && (
            <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p><strong>Coordinates:</strong> {weather.coord.lat}, {weather.coord.lon}</p>
            <p><strong>Temperature:</strong> {weather.main.temp}°C (feels like {weather.main.feels_like}°C)</p>
            <p><strong>Min / Max:</strong> {weather.main.temp_min}°C / {weather.main.temp_max}°C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
            <p><strong>Visibility:</strong> {weather.visibility / 1000} km</p>
            <p><strong>Condition:</strong> {weather.weather[0].main} ({weather.weather[0].description})</p>
            <p><strong>Wind:</strong> {weather.wind.speed} m/s, gusts {weather.wind.gust} m/s, direction {weather.wind.deg}°</p>
            <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
            <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            <p><em>Thank you for using वातावर्णम्‌. Please visit again!</em></p>
            </div>
            )}
          </div>
        </div>
      </section>
      <footer className="app-footer">
        <p>
          © 2025 Weather App | Powered by OpenWeather | Developed by Ranjeet
        </p>
      </footer>
    </div>
  );
}

export default App;
