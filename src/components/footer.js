import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div class="card text-center footer-container">
      <div class="card-body  footerbtn">
        <p class="card-title">
          Made with <BsFillHeartFill className="text-danger" /> for React
          &copy;2021 All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
