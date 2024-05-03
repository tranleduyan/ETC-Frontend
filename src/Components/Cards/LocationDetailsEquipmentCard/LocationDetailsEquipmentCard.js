import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./LocationDetailsEquipmentCard.css";

function LocationDetailsEquipmentCard() {
  return (
    <div className="LocationDetailsEquipmentCard-Container">
      <div className="LocationDetailsEquipmentCard-ModelPhoto">
        <FontAwesomeIcon
          icon={faScrewdriverWrench}
          className="LocationDetailsEquipmentCard-DefaultModelIcon"
        />
      </div>
      <div className="LocationDetailsEquipmentCard-InformationContainer">
        <p className="heading-5">Barometer</p>
        <div className="LocationDetailsEquipmentCard-Information">
          <p className="paragraph-3">222iAn</p>
          <p className="paragraph-3">Ready</p>
        </div>
      </div>
    </div>
  );
}

export default LocationDetailsEquipmentCard;
