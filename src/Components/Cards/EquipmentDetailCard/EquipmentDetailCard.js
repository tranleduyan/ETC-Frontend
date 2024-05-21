//#region Import Necessary Dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
//#endregion

// Import Stylings
import "./EquipmentDetailCard.css";

//#region Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
//#endregion

// Define EquipmentDetailCard Component
function EquipmentDetailCard(props) {
  // Destructure props to extract className, title, and information
  const { className, title, information, modelPhotoPath } = props;

  // Map through the information array and assign unique IDs using UUID
  const informationWithIDs = information.map((details) => ({
    id: uuidv4(),
    details,
  }));

  // State to handle equipment model photo loading errors
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhotoPath);

  return (
    <div className={`${className} EquipmentDetailCard-Container`}>
      {/* Equipment image with a default icon if no photo */}
      <div className="EquipmentDetailCard-ModelPhoto">
        {equipmentModelPhoto ? (
          <img src={modelPhotoPath} alt="Equipment Model" onError={() => setEquipmentModelPhoto(null)} />
        ) : (
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className="EquipmentDetailCard-DefaultEquipmentIcon"
          />
        )}
      </div>
      {/* Details section containing title and mapped information with unique IDs */}
      <div className="EquipmentDetailCard-Details">
        <p className="heading-5">{title}</p>
        {informationWithIDs.map((info) => (
          <p className="paragraph-3" key={info.id}>
            {info.details}
          </p>
        ))}
      </div>
    </div>
  );
}

// Define PropTypes for type-checking and documentation
EquipmentDetailCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  information: PropTypes.array,
  modelPhotoPath: PropTypes.string,
};

// Set default values for props to avoid potential issues if not provided
EquipmentDetailCard.defaultProps = {
  className: "",
  title: "",
  information: [],
  modelPhotoPath: null,
};

// Exports the EquipmentDetailCard component as the default export for the EquipmentDetailCard module.
export default EquipmentDetailCard;
