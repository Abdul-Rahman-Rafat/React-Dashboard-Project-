import React, { useState } from "react";

const API_KEY = "b6907d289e10d714a6e88b30761fae22"; 

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
 try {
  const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "City not found");
  setWeather(data);
} catch (err) {
  setError(err.message || "City not found or Error fetching data");
}
    setLoading(false);

  };

  return (
    <div className="weather-card card">
      <h2 className="header-txt">Weather Panel</h2>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input-city"
        />
        <button
          onClick={fetchWeather}
          className="btn btn-search"
        >
          بحث
        </button>
      </div>
      {loading && <div> Loading...</div>}
      {error && <div className="error error-msg ">{error}</div>}
      {weather && (
        <div className="weather-info">
          <div className="weather-name">{weather.name}</div>
          <div> Temp :{weather.main.temp}°C</div>
          <div>description :{weather.weather[0].description}</div>
          <div>Humidity :{weather.main.humidity}%</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}