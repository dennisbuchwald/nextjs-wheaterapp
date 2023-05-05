import axios from "axios";

export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${apiKey}&units=metric`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to fetch hourly forecast data:", error);
    res.status(500).json({ message: "Failed to fetch hourly forecast data" });
  }
}
