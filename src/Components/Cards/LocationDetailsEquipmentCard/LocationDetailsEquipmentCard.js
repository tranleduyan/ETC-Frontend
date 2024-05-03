//#region Import Necessary Dependecies
import React, { useState } from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./LocationDetailsEquipmentCard.css";
//#endregion

//#region Import Icons
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//#endregion

// Define LocationDetailsEquipmentCard Component
function LocationDetailsEquipmentCard(props) {
  // Extract necessary props
  const { className, serialId, typeName, modelPhoto, reservationStatus } =
    props;

  // State to handle equipment model photo loading errors
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);
  return (
    <div className={`LocationDetailsEquipmentCard-Container ${className}`}>
      <div className="LocationDetailsEquipmentCard-ModelPhoto">
        {/* Display Equipment Model Photo */}
        {equipmentModelPhoto && (
          <img
            src={modelPhoto}
            alt="Equipment Model"
            onError={() => setEquipmentModelPhoto(null)}
          />
        )}
        {/* Display Default Equipment Model Icon */}
        {!equipmentModelPhoto && (
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className="LocationDetailsEquipmentCard-DefaultModelIcon"
          />
        )}
      </div>
      <div className="LocationDetailsEquipmentCard-InformationContainer">
        <p className="heading-5">{typeName}</p>
        <div className="LocationDetailsEquipmentCard-Information">
          <p className="paragraph-3">{serialId}</p>
          <p className="paragraph-3">{reservationStatus}</p>
        </div>
      </div>
    </div>
  );
}

// Define PropTypes for the component
LocationDetailsEquipmentCard.propTypes = {
  className: PropTypes.string,
  serialId: PropTypes.string.isRequired,
  typeName: PropTypes.string.isRequired,
  modelPhoto: PropTypes.string.isRequired,
  reservationStatus: PropTypes.string.isRequired,
};

// Define the defaultProps for the component
LocationDetailsEquipmentCard.defaultProps = {
  className: "",
};

// Exports the LocationDetailsEquipmentCard component as the default export for the LocationDetailsEquipmentCard module.
export default LocationDetailsEquipmentCard;
