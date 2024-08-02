// src/App.js
import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/SideBar/Sidebar";
import Footer from "./Components/Footer/Footer";
import WeatherCard from "./Components/WeatherCard/WeatherCard.jsx";

export default function App() {
  const [selectedCity, setSelectedCity] = useState("Oslo");
  const [cityData, setCityData] = useState({});
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let result = await (
          await fetch(`http://localhost:4000/weather/`)
        ).json();

        setCities(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cities]);

  useEffect(() => {
    (async () => {
      try {
        let result = await (
          await fetch(`http://localhost:4000/weather/${selectedCity}`)
        ).json();

        setCityData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.main}>
        <Sidebar
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
        <div style={styles.content}>
          <WeatherCard
            key={cityData.city}
            city={cityData.city}
            low={cityData.low}
            high={cityData.high}
            condition={cityData.condition}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  main: {
    display: "flex",
    flex: 1,
  },
  content: {
    padding: "2em",
    flex: 1,
  },
};
