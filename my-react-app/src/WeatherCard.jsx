import React, { useState } from "react";

const API_KEY = "b6907d289e10d714a6e88b30761fae22"; // مفتاح تجريبي من openweathermap

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
    <div className="bg-white rounded shadow p-4 card">
      <h2 className="text-xl font-bold mb-2">الطقس</h2>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="أدخل اسم المدينة"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          بحث
        </button>
      </div>
      {loading && <div>جاري جلب الطقس...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {weather && (
        <div>
          <div className="text-lg font-bold">{weather.name}</div>
          <div>درجة الحرارة: {weather.main.temp}°C</div>
          <div>الوصف: {weather.weather[0].description}</div>
          <div>الرطوبة: {weather.main.humidity}%</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}