// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>RBM Software</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#FF0000",
    padding: "1em",
    color: "white",
    textAlign: "center",
  },
};

export default Header;
