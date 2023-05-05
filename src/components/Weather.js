import { useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import HourlyForecast from "./HourlyForecast";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/weather?location=${location}`);
      setWeatherData(response.data);

      const { lat, lon } = response.data.coord;

      const hourlyResponse = await axios.get(
        `/api/hourlyForecast?lat=${lat}&lon=${lon}`
      );
      setHourlyData(hourlyResponse.data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }

    setIsLoading(false);
  };

  return (
    <main className="bg-gradient-to-b from-blue-200 to-blue-500 text-white min-h-screen flex items-center">
      <div className="container mx-auto bg-white text-black p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">
          Wetter-App
        </h1>
        <form onSubmit={handleSubmit} className="flex mb-6 justify-center">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ort eingeben"
            className="flex-grow py-3 px-4 mr-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200 text-gray-800"
          />
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-600 py-3 px-6 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 text-white"
          >
            Wetter abrufen
          </button>
        </form>
        {isLoading ? (
          <div className="flex justify-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="32"
              visible={true}
            />{" "}
          </div>
        ) : weatherData ? (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden bg-white bg-opacity-75 p-4">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {weatherData.name}
              </h2>
              <p className="text-3xl font-bold">
                {weatherData.main.temp.toFixed(1)}°C
              </p>
              <p className="text-l">{weatherData.weather[0].description}</p>
              <div className="flex items-center mt-6">
                <div className="mr-4">
                  <p className="font-semibold">Luftfeuchtigkeit</p>
                  <p>{weatherData.main.humidity}%</p>
                </div>
                <div>
                  <p className="font-semibold">Windgeschwindigkeit</p>
                  <p>{weatherData.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
      {hourlyData && <HourlyForecast hourlyData={hourlyData} />}
    </main>
  );
}
