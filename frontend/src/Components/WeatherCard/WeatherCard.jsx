import { useEffect, useState } from "react";
import images from "../../images.js";
import "./WeatherCard.css";
import tempLabel from "../../assets/tempLabel.json";
import PropTypes from "prop-types";

export default function WeatherCard({ city, low, high, condition }) {
  const [label, setLabel] = useState("Unknown");
  const [cityData, setCityData] = useState({
    city,
    low,
    high,
    condition,
  });

  // useEffect(() => {
  //   (async () => {
  //     const weatherData = await (
  //       await fetch("http://localhost:3000/weatherData.json")
  //     ).json();

  //     const foundCity = weatherData.find((e) => e.city == city);

  //     if (foundCity !== undefined) setCityData(foundCity);
  //   })();
  // }, []);

  useEffect(() => {
    const temp = cityData.low < 0 ? cityData.low : cityData.high;

    const found = tempLabel.find((e) => temp < e.value);

    if (found !== undefined) setLabel(found.label);
  }, [cityData]);

  return (
    <div className="weather-card">
      <h1>{cityData.city}</h1>
      <img src={images[cityData.condition]} alt="No Image" />
      <h3>{label}</h3>
      <h2>
        low: {cityData.low}°C high: {cityData.high}°C
      </h2>
    </div>
  );
}

WeatherCard.propType = {
  city: PropTypes.string.isRequired,
};
