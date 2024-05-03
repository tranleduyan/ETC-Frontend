import React from "react";
import PropTypes from "prop-types";

import "./LocationDetailsAntennaCard.css";
import { HiOutlineStatusOnline } from "react-icons/hi";

// Define LocationDetailsAntennaCard Component
function LocationDetailsAntennaCard() {
  return (
    <div className="LocationDetailsAntennaCard-Container">
      {/* RFID Antenna Icon */}
      <div className="LocationDetailsAntennaCard-IconContainer">
        <HiOutlineStatusOnline className="LocationDetailsAntennaCard-Icon" />
      </div>
      {/* RFID Antenna Information Section */}
      <div className="LocationDetailsAntennaCard-InformationContainer">
        <p className="heading-5">AUBIF22</p>
        <p className="paragraph-3">OMH 222</p>
      </div>
    </div>
  );
}

export default LocationDetailsAntennaCard;
