import axios from "axios";

export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const apiKey = "2ff55e360ced2b4e3e835fbc697cd597";
  //   const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to fetch hourly forecast data:", error.response.data);
    res.status(500).json({ message: "Failed to fetch hourly forecast data" });
  }
}
