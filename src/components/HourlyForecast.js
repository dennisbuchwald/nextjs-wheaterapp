import React from "react";

function HourlyForecast({ hourlyData }) {
  if (!hourlyData) {
    return <p>Loading...</p>;
  }

  console.log(hourlyData);

  return (
    <div className="bg-white text-black p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-2">Stündliche Vorhersage</h2>
      <div className="flex overflow-x-scroll">
        {hourlyData.list.slice(0, 8).map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center mr-4 last:mr-0"
          >
            <p>{new Date(hour.dt * 1000).toLocaleTimeString().slice(0, -3)}</p>
            <p>{Math.round(hour.main.temp)}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
              className="w-10 h-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
