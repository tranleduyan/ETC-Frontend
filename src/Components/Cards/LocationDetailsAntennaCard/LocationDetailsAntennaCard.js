//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./LocationDetailsAntennaCard.css";
//#endregion

//#region Import Icons
import { HiOutlineStatusOnline } from "react-icons/hi";
//#endregion

// Define LocationDetailsAntennaCard Component
function LocationDetailsAntennaCard(props) {
  // Extract necessary props
  const { className, antennaId, locationName } = props;

  return (
    <div className={`LocationDetailsAntennaCard-Container ${className}`}>
      {/* RFID Antenna Icon */}
      <div className="LocationDetailsAntennaCard-IconContainer">
        <HiOutlineStatusOnline className="LocationDetailsAntennaCard-Icon" />
      </div>
      {/* RFID Antenna Information Section */}
      <div className="LocationDetailsAntennaCard-InformationContainer">
        <p className="heading-5">{antennaId}</p>
        <p className="paragraph-3">{locationName}</p>
      </div>
    </div>
  );
}

// Define propTypes for LocationDetailsAntennaCard
LocationDetailsAntennaCard.propTypes = {
  className: PropTypes.string,
  antennaId: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
};

// Define defaultProps for LocationDetailsAntennaCard
LocationDetailsAntennaCard.defaultProps = {
  className: "",
};

// Exports the LocationDetailsAntennaCard component as the default export for the LocationDetailsAntennaCard module.
export default LocationDetailsAntennaCard;
