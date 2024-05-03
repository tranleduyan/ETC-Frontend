//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./RFIDAntennaInventoryCard.css";
//#endregion

//#region Import UI Components
import IconButton from "../../Buttons/IconButton/IconButton";
//#endregion

//#region Import Icons
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
//#endregion

// Define RFIDAntennaInventoryCard Component
function RFIDAntennaInventoryCard(props) {
  // Extract Necessary Props
  const {
    className,
    rfidAntennaId,
    rfidAntennaLocation,
    isSelected,
    onSelect,
  } = props;

  // HandleOnSelect - Handler for type selections
  const HandleOnSelect = () => {
    onSelect(rfidAntennaId);
  };

  return (
    <div
      className={`RFIDAntennaInventoryCard-Container ${
        isSelected ? "RFIDAntennaInventoryCard-Active" : ""
      } ${className}`}
    >
      {/* RFID Antenna Icon */}
      <div className="RFIDAntennaInventoryCard-IconContainer">
        <HiOutlineStatusOnline className="RFIDAntennaInventoryCard-Icon" />
      </div>
      {/* RFID Antenna Information Section */}
      <div className="RFIDAntennaInventoryCard-InformationContainer">
        <p className="heading-5">{rfidAntennaId}</p>
        <p className="paragraph-3">
          {rfidAntennaLocation ? rfidAntennaLocation : "Not used"}
        </p>
      </div>
      {/* RFID Antenna Selection Button */}
      <div className="RFIDAntennaInventoryCard-SelectionContainer">
        <IconButton
          icon={!isSelected ? MdCheckBoxOutlineBlank : MdCheckBox}
          className={`RFIDAntennaInventoryCard-SelectButton${
            isSelected ? "Active" : ""
          }`}
          onClick={HandleOnSelect}
        />
      </div>
    </div>
  );
}

// Define propTypes for RFIDAntennaInventoryCard
RFIDAntennaInventoryCard.propTypes = {
  className: PropTypes.string,
  rfidAntennaId: PropTypes.string.isRequired,
  rfidAntennaLocation: PropTypes.string,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};

// Define defaultProps for RFIDAntennaInventoryCard
RFIDAntennaInventoryCard.defaultProps = {
  className: "",
  isSelected: false,
  rfidAntennaLocation: "",
  onSelect: () => {},
};

// Exports the RFIDAntennaInventoryCard component as the default export for the RFIDAntennaInventoryCard module.
export default RFIDAntennaInventoryCard;
