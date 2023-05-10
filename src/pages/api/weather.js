import axios from "axios";

//test

export default async function handler(req, res) {
  const { location } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
