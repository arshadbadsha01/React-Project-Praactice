import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (city.trim() === "") return;
    setLoading(true);
    setError(""); // naye search se pehle purana error clear karo
    setWeather(null); // purana weather bhi clear karo
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
      );
      console.log(response.data);

      setWeather(response.data);
    } catch (error) {
      console.log(error);
      setError("City not found, Please check spelling & try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main White Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Weather App
        </h1>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city name..."
            className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={getWeather}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-medium transition duration-200 shadow-sm"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-6 text-blue-600 animate-pulse">
            Fetching Weather...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-3 text-red-600 bg-red-50 border border-red-100 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        {/* Weather Output */}
        {weather && (
          <div className="mt-2 flex flex-col items-center">
            {/* City & Country */}
            <h2 className="text-2xl font-bold text-gray-900">
              {weather.name}{" "}
              <span className="text-blue-600">{weather.sys.country} </span>
            </h2>

            {/* Icon & Temp */}
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-20 h-20 -mr-2"
              />
              <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                {Math.round(weather.main.temp)}°C{" "}
              </span>
            </div>

            {/* Description */}
            <p className="capitalize text-gray-500 text-sm font-medium mb-6">
              {weather.weather[0].description}
            </p>

            {/* Weather Info Grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-center">
                <p className="text-xs text-gray-500">Feels Like</p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {Math.round(weather.main.feels_like)}°C{" "}
                </p>
              </div>

              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-center">
                <p className="text-xs text-gray-500">Humidity</p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {weather.main.humidity}%{" "}
                </p>
              </div>

              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-center">
                <p className="text-xs text-gray-500">Wind Speed</p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {weather.wind.speed} m/s{" "}
                </p>
              </div>

              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-center">
                <p className="text-xs text-gray-500">Pressure</p>
                <p className="text-lg font-bold text-gray-800">
                  {weather.main.pressure} hPa{" "}
                </p>
              </div>

              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-center">
                <p className="text-xs text-gray-500">Latitude</p>
                <p className="text-lg font-bold text-gray-800">
                  {weather.coord.lat}{" "}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
