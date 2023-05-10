import { useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import HourlyForecast from "./HourlyForecast";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("hallo");

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

  function getWeatherIcon(weatherCode) {
    console.log("Wheater Code:", weatherCode);

    if (weatherCode >= 200 && weatherCode <= 232) {
      return "thunderstorm.png";
    } else if (weatherCode >= 300 && weatherCode <= 321) {
      return "drizzle.png";
    } else if (weatherCode >= 500 && weatherCode <= 531) {
      return "rain.png";
    } else if (weatherCode >= 600 && weatherCode <= 622) {
      return "snow.png";
    } else if (weatherCode >= 701 && weatherCode <= 781) {
      return "atmosphere.png";
    } else if (weatherCode === 800) {
      return "clear.png";
    } else if (weatherCode >= 801 && weatherCode <= 804) {
      return "clouds.png";
    } else {
      return "unknown.png";
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-white flex items-center px-4">
      <div className="container mx-auto p-8 rounded-lg shadow-lg max-w-md bg-opacity-90 bg-white text-black">
        <h1 className="text-4xl font-semibold mb-6 text-center text-black">
          Wetter App
        </h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ort eingeben"
              className="w-full py-3 px-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200 text-gray-800"
            />
            <button
              type="submit"
              className="absolute left-0 top-0 mt-3 ml-3 bg-indigo-700 hover:bg-indigo-600 py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 text-white"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
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
          <section className="bg-white text-black p-6 rounded-lg mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {weatherData.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {weatherData.weather[0].description}
                </p>
              </div>
              <img
                src={`/icons/${getWeatherIcon(weatherData.weather[0].id)}`}
                alt={weatherData.weather[0].description}
                className="w-16 h-16"
              />
            </div>
            <p className="text-4xl font-bold mb-4">
              {weatherData.main.temp.toFixed(1)}°C
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Luftfeuchtigkeit</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div>
                <p className="font-semibold">Windgeschwindigkeit</p>
                <p>{weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </section>
        ) : null}

        {hourlyData && <HourlyForecast hourlyData={hourlyData} />}
      </div>
    </main>
  );
}
