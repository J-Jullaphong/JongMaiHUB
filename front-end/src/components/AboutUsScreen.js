import React from "react";
import "./styles/AboutUsScreen.css";

const AboutUsScreen = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        JongMaiHUB is an online service reservation platform, simplifying
        appointments for customers and aiding service providers in managing
        bookings.
      </p>
      <p>Our website also has Line Integration.</p>
      <p>You can add our Official Line Account via this QR code or Line Id: @567vqisr</p>
      <div className="image-container">
        <img src="images/lineQR.png" alt="LineQR" width="150" />
      </div>
    </div>
  );
};

export default AboutUsScreen;
