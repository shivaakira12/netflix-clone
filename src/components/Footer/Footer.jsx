import React from "react";
import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={youtube_icon}></img>
        <img src={instagram_icon}></img>
        <img src={twitter_icon}></img>
        <img src={facebook_icon}></img>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Investor Relations</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Cookies</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">
        © 1997-2025 Netflix, All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;