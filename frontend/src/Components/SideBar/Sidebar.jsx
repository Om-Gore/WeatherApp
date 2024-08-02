// src/components/Sidebar.js
import React from "react";

const Sidebar = ({ cities, selectedCity, onCityChange }) => {
  return (
    <aside style={styles.sidebar}>
      <h2>Select a City</h2>
      <select
        value={selectedCity}
        onChange={onCityChange}
        style={styles.select}
      >
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    backgroundColor: "#f0f0f0",
    padding: "1em",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  select: {
    width: "100%",
    padding: "0.5em",
    marginTop: "1em",
  },
};

export default Sidebar;
