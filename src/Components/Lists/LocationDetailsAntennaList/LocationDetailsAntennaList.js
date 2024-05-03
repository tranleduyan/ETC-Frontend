import React from "react";
import PropTypes from "prop-types";
import LocationDetailsAntennaCard from "../../Cards/LocationDetailsAntennaCard";
import "./LocationDetailsAntennaList.css";

// Define LocationDetailsAntennaList Component
function LocationDetailsAntennaList(props) {
  // Extract necessary props
  const { className, locationAntennas } = props;

  return (
    <div className="LocationDetailsAntennaList-Container">
      <LocationDetailsAntennaCard />
    </div>
  );
}
// Exports the LocationDetailsAntennaList component as the default export for the LocationDetailsAntennaList module.
export default LocationDetailsAntennaList;
