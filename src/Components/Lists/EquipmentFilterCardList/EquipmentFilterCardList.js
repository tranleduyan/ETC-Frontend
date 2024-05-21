//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

// Import Stylings
import "./EquipmentFilterCardList.css";

// Import UI Components
import FilterCard from "../../Cards/FilterCard/FilterCard";

// Import Icons
import { HiClipboardList, HiClipboardCopy } from "react-icons/hi";

function EquipmentFilterCardList(props) {
  // Destructure props to extract relevant information
  const {
    className,
    selectedEquipmentFilter,
    OnEquipmentFilterCardClick,
    currentlyUsingQuantity,
    recentlyUsedQuantity,
  } = props;

  return (
    <div className={`EquipmentFilterCardList-Container ${className} `}>
      <FilterCard
        icon={HiClipboardList}
        title="Currently Using"
        isSelected={selectedEquipmentFilter === "Currently Using"}
        quantity={currentlyUsingQuantity}
        onClick={OnEquipmentFilterCardClick}
      />
      <FilterCard
        icon={HiClipboardCopy}
        title="Recently Used"
        isSelected={selectedEquipmentFilter === "Recently Used"}
        quantity={recentlyUsedQuantity}
        onClick={OnEquipmentFilterCardClick}
      />
    </div>
  );
}

// Define PropTypes for type-checking and documentation
EquipmentFilterCardList.propTypes = {
  className: PropTypes.string,
  selectedEquipmentFilter: PropTypes.string,
  OnEquipmentFilterCardClick: PropTypes.func,
  currentlyUsingQuantity: PropTypes.number,
  recentlyUsedQuantity: PropTypes.number,
};

// Set default values for props to avoid potential issues if not provided
EquipmentFilterCardList.defaultProps = {
  className: "",
  selectedEquipmentFilter: null,
  OnEquipmentFilterCardClick: null,
  currentlyUsingQuantity: 0,
  recentlyUsedQuantity: 0,
};

// Exports the EquipmentFilterCardList component as the default export for the EquipmentFilterCardList module.
export default EquipmentFilterCardList;
