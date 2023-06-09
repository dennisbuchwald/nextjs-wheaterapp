import axios from "axios";

export default async function handler(req, res) {
  const { location } = req.query;
  const apiKey = "2ff55e360ced2b4e3e835fbc697cd597";
  //   const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=de`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
