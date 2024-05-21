//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import UI Components
import LocationDetailsEquipmentCard from "../../Cards/LocationDetailsEquipmentCard";
//#endregion

//#region Import Stylings
import "./LocationDetailsEquipmentList.css";
//#endregion

// Define LocationDetailsEquipmentList Component
function LocationDetailsEquipmentList(props) {
  // Extract necessary props
  const { className, locationEquipment } = props;

  return (
    <div
      className={`${
        locationEquipment?.length > 0
          ? "LocationDetailsEquipmentList-Container"
          : "LocationDetailsEquipmentList-Message"
      } ${className}`}
    >
      {locationEquipment?.length > 0 ? (
        locationEquipment.map((item) => (
          <LocationDetailsEquipmentCard
            key={item.serialId}
            serialId={item.serialId}
            typeName={item.typeName}
            modelPhoto={item.modelPhoto}
            reservationStatus={item.reservationStatus}
          />
        ))
      ) : (
        <p className="paragraph-1">
          There is no equipment has this location as a home.
        </p>
      )}
    </div>
  );
}

// Define PropTypes for the component
LocationDetailsEquipmentList.propTypes = {
  className: PropTypes.string,
  locationEquipment: PropTypes.array,
};

// Define the defaultProps for the component
LocationDetailsEquipmentList.defaultProps = {
  className: "",
  locationEquipment: [],
};

// Exports the LocationDetailsEquipmentList component as the default export for the LocationDetailsEquipmentList module.
export default LocationDetailsEquipmentList;
