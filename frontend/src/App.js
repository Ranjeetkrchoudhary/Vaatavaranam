import React, { useState } from "react";
import axios from "axios";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(`https://vaatavaranam.onrender.com`, {
        params: { city },
      });
      setWeather(response.data);
      setCity("");
    } catch (err) {
      console.error(error);
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
                <h2>{weather.name}</h2>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Condition: {weather.weather[0].description}</p>
                <p>Thank For Using Us. Please Visit Again</p>
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
