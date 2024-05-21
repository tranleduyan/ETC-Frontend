//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region  Import Stylings
import "./LocationDetailsAntennaList.css";
//#endregion

//#region Import UI Components
import LocationDetailsAntennaCard from "../../Cards/LocationDetailsAntennaCard";
//#endregion

// Define LocationDetailsAntennaList Component
function LocationDetailsAntennaList(props) {
  // Extract necessary props
  const { className, locationAntennas, locationName } = props;

  return (
    <div
      className={`${
        locationAntennas?.length > 0
          ? "LocationDetailsAntennaList-Container"
          : "LocationDetailsAntennaList-Message"
      } ${className}`}
    >
      {locationAntennas?.length > 0 ? (
        locationAntennas.map((item) => (
          <LocationDetailsAntennaCard
            key={item.antennaId}
            antennaId={item.antennaId}
            locationName={locationName}
          />
        ))
      ) : (
        <p className="paragraph-1">There are no RFID antennas in this room.</p>
      )}
    </div>
  );
}

// Define PropTypes for the component
LocationDetailsAntennaList.propTypes = {
  className: PropTypes.string,
  locationAntennas: PropTypes.array,
  locationName: PropTypes.string.isRequired,
};

// Define the defaultProps for the component
LocationDetailsAntennaList.defaultProps = {
  className: "",
  locationAntennas: [],
};

// Exports the LocationDetailsAntennaList component as the default export for the LocationDetailsAntennaList module.
export default LocationDetailsAntennaList;
