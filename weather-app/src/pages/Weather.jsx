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
      setError("City not found, Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Weather</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={getWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {loading && <p className="text-center mt-4 text-gray-500">Loading...</p>}

      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {weather && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-3xl font-bold my-2">
            Temperature: {weather.main.temp}°C
          </p>
          <p className="capitalize text-red-600">
            Condition: {weather.weather[0].description}
          </p>
          <p className="capitalize text-blue-600">
            Country: {weather.sys.country}{" "}
          </p>
          <p className="capitalize text-green-700">
            Wind Speed: {weather.wind.speed}{" "}
          </p>
          <p className="capitalize text-amber-600">
            Latitude: {weather.coord.lat}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
