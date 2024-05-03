//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
import { MESSAGE } from "../../../Constants";
//#endregion

//#region Import Stylings
import "./LocationInventory.css";
//#endregion

//#region Import UI Components
import LocationInventoryCard from "../../Cards/LocationInventoryCard";
//#endregion

// Define LocationInventory Component
function LocationInventory(props) {
  // Extract necessary props
  const {
    className,
    selectedLocations,
    onSelectLocation,
    locationInventory,
    onLocationCardClick,
  } = props;

  return (
    <div
      className={`${
        locationInventory?.length > 0
          ? "LocationInventory-Container"
          : "LocationInventory-Message"
      } ${className}`}
    >
      {locationInventory?.length > 0 ? (
        locationInventory.map((item) => (
          <LocationInventoryCard
            key={item.locationId}
            locationId={item.locationId}
            locationName={item.locationName}
            antennaCount={item.antennaCount}
            isSelected={selectedLocations.includes(item.locationId)}
            onSelect={onSelectLocation}
            onClick={onLocationCardClick}
          />
        ))
      ) : (
        <p className="paragraph-1">{MESSAGE.emptyLocations}</p>
      )}
    </div>
  );
}

// Define Proptypes for the component
LocationInventory.propTypes = {
  className: PropTypes.string,
  selectedLocations: PropTypes.array.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
  locationInventory: PropTypes.array.isRequired,
  onLocationCardClick: PropTypes.func,
};

// Define DefaultProps for the component
LocationInventory.defaultProps = {
  className: "",
  onLocationCardClick: () => {},
};

// Exports the LocationInventory component as the default export for the LocationInventory module.
export default LocationInventory;
