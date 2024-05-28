//#region Import Necessary Dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./EquipmentRFIDTagsList.css";
//#endregion

//#region Import UI Components
import IconButton from "../../Buttons/IconButton/IconButton";
//#endregion

//#region Import Icons
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
//#endregion

// Define EquipmentRFIDTagsList Component
function EquipmentRFIDTagsList(props) {
  const { rfidTags, className } = props;

  // State to display card details
  const [visibleDetails, setVisibleDetails] = useState(
    new Array(rfidTags.length).fill(false)
  );

  // ToggleDetailsVisibility - Toggle the details visbilitiy of the card
  const ToggleDetailsVisibility = (index) => {
    setVisibleDetails((prev) =>
      prev.map((isVisible, i) => (i === index ? !isVisible : isVisible))
    );
  };

  return (
    <div
      className={`${
        rfidTags?.length > 0
          ? "EquipmentRFIDTagsList-Container"
          : "EquipmentRFIDTagsList-Message"
      } ${className}`}
    >
      {rfidTags?.length > 0 ? (
        <>
          <div className="EquipmentRFIDTagsList-ListHeaderContainer">
            <p className="heading-5 EquipmentRFIDTagsList-SerialID">
              Serial ID
            </p>
            <p className="heading-5 EquipmentRFIDTagsList-TagID">Tag ID</p>
          </div>
          <div className="EquipmentRFIDTagsList-Content">
            {rfidTags.map((item, index) => (
              <div
                className="EquipmentRFIDTagsList-CardContainer"
                key={item.serialId}
              >
                <div className="EquipmentRFIDTagsList-CardHeader">
                  <p className="heading-5 EquipmentRFIDTagsList-SerialID">
                    {item.serialId}
                  </p>
                  <p className="heading-5 EquipmentRFIDTagsList-TagID">
                    {item.tagId}
                  </p>
                  <IconButton
                    icon={visibleDetails[index] ? HiChevronUp : HiChevronDown}
                    className="EquipmentRFIDTagsList-ExpandButton"
                    onClick={() => ToggleDetailsVisibility(index)}
                  />
                </div>
                {visibleDetails[index] && (
                  <div className={`EquipmentRFIDTagsList-CardDetails`}>
                    <p className="paragraph-1 EquipmentRFIDTagsList-Type">
                      <span className="heading-5">Type:</span> {item.type}
                    </p>
                    <p className="paragraph-1">
                      <span className="heading-5 EquipmentRFIDTagsList-Model">
                        Model:
                      </span>{" "}
                      {item.model}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="paragraph-1">
          There is no equipment associated with RFID tag IDs.
        </p>
      )}
    </div>
  );
}

// Define PropTypes for the component
EquipmentRFIDTagsList.propTypes = {
  rfidTags: PropTypes.array,
  className: PropTypes.string,
};

// Define the defaultProps for the component
EquipmentRFIDTagsList.defaultProps = {
  rfidTags: [],
  className: "",
};

export default EquipmentRFIDTagsList;
