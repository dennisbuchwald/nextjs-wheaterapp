import { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/weather?location=${location}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen text-white flex items-center">
      <div className="container mx-auto">
        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-semibold mb-6 text-center">
            Wetter-App
          </h1>
          <form onSubmit={handleSubmit} className="flex mb-6 justify-center">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ort eingeben"
              className="flex-grow py-3 px-4 mr-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-white text-black"
            />
            <button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-600 py-3 px-6 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
            >
              Wetter abrufen
            </button>
          </form>
          {weatherData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>
                <p className="mb-2">
                  Temperatur: {weatherData.main.temp.toFixed(1)}°C
                </p>
                <p>Wetter: {weatherData.weather[0].description}</p>
              </div>
              <div className="bg-indigo-500 text-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">Weitere Details</h2>
                <p className="mb-2">
                  Luftfeuchtigkeit: {weatherData.main.humidity}%
                </p>
                <p>Windgeschwindigkeit: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
