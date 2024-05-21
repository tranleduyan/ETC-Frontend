//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
import { MESSAGE } from "../../../Constants";
//#endregion

//#region Import Stylings
import "./RFIDAntennaInventory.css";
//#endregion

//#region Import UI Components
import RFIDAntennaInventoryCard from "../../Cards/RFIDAntennaInventoryCard";
//#endregion

// Define RFIDAntennaInventory Component
function RFIDAntennaInventory(props) {
  // Extract necessary props
  const {
    className,
    selectedRFIDAntennas,
    onSelectRFIDAntenna,
    rfidAntennaInventory,
  } = props;

  return (
    <div
      className={`${
        rfidAntennaInventory?.length > 0
          ? "RFIDAntennaInventory-Container"
          : "RFIDAntennaInventory-Message"
      } ${className}`}
    >
      {rfidAntennaInventory?.length > 0 ? (
        rfidAntennaInventory.map((item) => (
          <RFIDAntennaInventoryCard
            key={item.antennaId}
            rfidAntennaId={item.antennaId}
            rfidAntennaLocation={item.locationName}
            isSelected={selectedRFIDAntennas.includes(item.antennaId)}
            onSelect={onSelectRFIDAntenna}
          />
        ))
      ) : (
        <p className="paragraph-1">{MESSAGE.emptyRFIDAntenna}</p>
      )}
    </div>
  );
}

// Define Proptypes for the component
RFIDAntennaInventory.propTypes = {
  className: PropTypes.string,
  selectedRFIDAntennas: PropTypes.array.isRequired,
  onSelectRFIDAntenna: PropTypes.func.isRequired,
  rfidAntennaInventory: PropTypes.array.isRequired,
};

// Define DefaultProps for the component
RFIDAntennaInventory.defaultProps = {
  className: "",
};

// Exports the RFIDAntennaInventory component as the default export for the RFIDAntennaInventory module.
export default RFIDAntennaInventory;
