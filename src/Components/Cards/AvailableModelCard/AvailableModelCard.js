//#region Import Neccessary Dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
//#endregion

// Import Stylings
import "./AvailableModelCard.css";

//#region Import UI Components
import IconButton from "../../Buttons/IconButton/IconButton";
//#endregion

//#region Import Icons
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
//#endregion

// Define AvailableModelCard Component
function AvailableModelCard(props) {
  // Destructure props
  const {
    className,
    modelId,
    modelName,
    modelPhoto,
    typeName,
    typeId,
    availableCount,
    isSelected,
    onSelect,
    isMakingReservation,
  } = props;

  // State variable to manage model photo
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  // Text for item count
  const itemText = availableCount > 1 ? "items" : "item";

  // HandleOnSelect - Handle model selection
  const HandleOnSelect = () => {
    onSelect({
      modelId,
      modelName,
      modelPhoto,
      typeName,
      typeId,
      availableCount,
      quantity: 1,
    });
  };

  return (
    <div
      className={`AvailableModelCard-Container ${
        isSelected ? "AvailableModelCard-Active" : ""
      } ${className}`}
    >
      <button
        className="AvailableModelCard-ModelPhoto"
        onClick={isMakingReservation ? HandleOnSelect : undefined}
      >
        {/* Render model photo or default icon if photo not available */}
        {equipmentModelPhoto && (
          <img
            src={modelPhoto}
            alt="Equipment Model"
            onError={() => setEquipmentModelPhoto(null)}
          />
        )}
        {!equipmentModelPhoto && (
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className="AvailableModelCard-DefaultModelIcon"
          />
        )}
      </button>
      <button
        className="AvailableModelCard-InformationContainer"
        onClick={isMakingReservation ? HandleOnSelect : undefined}
      >
        {/* Model name and information */}
        <p className="heading-5">{modelName}</p>
        <div className="AvailableModelCard-Information">
          <p className="paragraph-3">{typeName}</p>
          <p className="paragraph-3">
            Available: {availableCount} {itemText}
          </p>
        </div>
      </button>
      <div className="AvailableModelCard-SelectionContainer">
        {/* Render selection button if in reservation mode */}
        {isMakingReservation && (
          <IconButton
            icon={!isSelected ? MdCheckBoxOutlineBlank : MdCheckBox}
            className={`AvailableModelCard-SelectButton${
              isSelected ? "Active" : ""
            }`}
            onClick={HandleOnSelect}
          />
        )}
      </div>
    </div>
  );
}

// Define propTypes for the component
AvailableModelCard.propTypes = {
  className: PropTypes.string,
  modelId: PropTypes.number.isRequired,
  modelName: PropTypes.string.isRequired,
  modelPhoto: PropTypes.any,
  typeName: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
  availableCount: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
  isMakingReservation: PropTypes.bool.isRequired,
};

// Define default props for component
AvailableModelCard.defaultProps = {
  className: "",
  modelPhoto: null,
  onSelect: () => {},
};

// Exports the AvailableModelCard component as the default export for the AvailableModelCard module.
export default AvailableModelCard;
