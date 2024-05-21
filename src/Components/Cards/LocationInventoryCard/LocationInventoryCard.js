//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./LocationInventoryCard.css";
//#endregion

//#region Import UI Components
import IconButton from "../../Buttons/IconButton/IconButton";
//#endregion

//#region Import Icons
import { HiLocationMarker } from "react-icons/hi";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
//#endregion

// Define LocationInventoryCard Component
function LocationInventoryCard(props) {
  // Extract Necessary Props
  const {
    className,
    locationId,
    locationName,
    antennaCount,
    isSelected,
    onSelect,
    onClick,
  } = props;

  // Text for antenna count
  const antennaText = antennaCount > 1 ? "antennas" : "antenna";

  // HandleOnSelect - Handler for type selections
  const HandleOnSelect = () => {
    onSelect(locationId);
  };

  // HandleOnClick - Handler for card clicking
  const HandleOnClick = () => {
    onClick(locationId);
  };

  return (
    <div
      className={`LocationInventoryCard-Container ${
        isSelected ? "LocationInventoryCard-Active" : ""
      } ${className}`}
    >
      {/* Location Icon */}
      <button
        className="LocationInventoryCard-IconContainer"
        onClick={HandleOnClick}
      >
        <HiLocationMarker className="LocationInventoryCard-Icon" />
      </button>
      {/* Location Information Section */}
      <button
        className="LocationInventoryCard-InformationContainer"
        onClick={HandleOnClick}
      >
        <p className="heading-5">{locationName}</p>
        <p className="paragraph-3">
          {antennaCount} {antennaText}
        </p>
      </button>
      {/* Location Selection Button */}
      <div className="LocationInventoryCard-SelectionContainer">
        <IconButton
          icon={!isSelected ? MdCheckBoxOutlineBlank : MdCheckBox}
          className={`LocationInventoryCard-SelectButton${
            isSelected ? "Active" : ""
          }`}
          onClick={HandleOnSelect}
        />
      </div>
    </div>
  );
}

// Define propTypes for LocationInventoryCard
LocationInventoryCard.propTypes = {
  className: PropTypes.string,
  locationId: PropTypes.number.isRequired,
  locationName: PropTypes.string.isRequired,
  antennaCount: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};

// Define defaultProps for LocationInventoryCard
LocationInventoryCard.defaultProps = {
  className: "",
  isSelected: false,
  onSelect: () => {},
};

// Exports the LocationInventoryCard component as the default export for the LocationInventoryCard module.
export default LocationInventoryCard;
