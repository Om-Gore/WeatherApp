// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; RBM software. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#ff0000",
    padding: "1em",
    color: "white",
    textAlign: "center",
    position: "fixed",
    width: "100%",
    bottom: 0,
  },
};

export default Footer;
