//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

// Import Stylings
import "./EquipmentDetailList.css";

//#region Import UI Components
import EquipmentDetailCard from "../../Cards/EquipmentDetailCard/EquipmentDetailCard";
import Message from "../../Message/Message";
//#endregion

// Define EquipmentDetailList Component
function EquipmentDetailList(props) {
  // Destructure props to extract relevant information
  const {
    className,
    equipmentDetails,
    detailsType,
    isMargin,
    inventoryMessage,
  } = props;

  return (
    <div className={`${className} EquipmentDetailList-Container`}>
      {/* Render EquipmentDetailCard components for equipment in use and recently use details */}
      {detailsType === "inventory" &&
        (equipmentDetails?.length === 0 ? (
          <Message
            message={inventoryMessage}
            className="EquipmentDetailList-EmptyMessage"
          />
        ) : (
          equipmentDetails.map((item) => (
            <EquipmentDetailCard
              className={`EquipmentDetailList-EquipmentDetailCard ${
                isMargin ? "EquipmentDetailList-Margin" : ""
              }`}
              key={item.serialId}
              title={item.modelName}
              information={[item.typeName, item.serialId]}
              modelPhotoPath={item.modelPhotoPath}
            />
          ))
        ))}
      {/* Render EquipmentDetailCard components for reservation details */}
      {detailsType === "reservation" &&
        equipmentDetails.map((item) => (
          <EquipmentDetailCard
            className={`EquipmentDetailList-EquipmentDetailCard ${
              isMargin ? "EquipmentDetailList-Margin" : ""
            }`}
            key={item.modelId}
            title={item.modelName}
            information={[item.typeName, `Quantity: ${item.itemQuantity}`]}
            modelPhotoPath={item.modelPhoto}
          />
        ))}
    </div>
  );
}

// Define PropTypes for type-checking and documentation
EquipmentDetailList.propTypes = {
  className: PropTypes.string,
  equipmentDetails: PropTypes.array,
  detailsType: PropTypes.oneOf(["inventory", "reservation"]),
  isMargin: PropTypes.bool,
  inventoryMessage: PropTypes.string,
};

// Set default values for props to avoid potential issues if not provided
EquipmentDetailList.defaultProps = {
  className: "",
  equipmentDetails: [],
  detailsType: "inventory",
  isMargin: false,
  inventoryMessage: "There is no equipment.",
};

// Exports the EquipmentDetailList component as the default export for the EquipmentDetailList module.
export default EquipmentDetailList;
