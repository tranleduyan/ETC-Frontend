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

//#region Import Icons
import {
  HiSwitchHorizontal,
  HiExclamationCircle,
  HiCheckCircle,
  HiChevronLeft,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
//#endregion

// Define LocationDetailsEquipmentList Component
function LocationDetailsEquipmentList(props) {
  // Extract necessary props
  const { className, locationEquipment } = props;

  return (
    <div className="LocationDetailsEquipmentList-Container">
      <LocationDetailsEquipmentCard />
    </div>
  );
}

// Exports the LocationDetailsEquipmentList component as the default export for the LocationDetailsEquipmentList module.
export default LocationDetailsEquipmentList;
