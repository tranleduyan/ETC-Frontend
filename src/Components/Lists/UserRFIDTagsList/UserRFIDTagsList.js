//#region Import Necessary Dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./UserRFIDTagsList.css";
//#endregion

//#region Import UI Components
import IconButton from "../../Buttons/IconButton/IconButton";
//#endregion

//#region Import Icons
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
//#endregion

// Define UserRFIDTagsList Component
function UserRFIDTagsList(props) {
  // Extract relevant information
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
          ? "UserRFIDTagsList-Container"
          : "UserRFIDTagsList-Message"
      } ${className}`}
    >
      {rfidTags?.length > 0 ? (
        <>
          <div className="UserRFIDTagsList-ListHeaderContainer">
            <p className="heading-5 UserRFIDTagsList-SchoolID">School ID</p>
            <p className="heading-5 UserRFIDTagsList-TagID">Tag ID</p>
          </div>
          <div className="UserRFIDTagsList-Content">
            {rfidTags.map((item, index) => (
              <div
                className="UserRFIDTagsList-CardContainer"
                key={item.schoolId}
              >
                <div className="UserRFIDTagsList-CardHeader">
                  <p className="heading-5 UserRFIDTagsList-SchoolID">
                    {item.schoolId}
                  </p>
                  <p className="heading-5 UserRFIDTagsList-TagID">
                    {item.tagId}
                  </p>
                  <IconButton
                    icon={visibleDetails[index] ? HiChevronUp : HiChevronDown}
                    className="UserRFIDTagsList-ExpandButton"
                    onClick={() => ToggleDetailsVisibility(index)}
                  />
                </div>
                {visibleDetails[index] && (
                  <div className="UserRFIDTagsList-CardDetails">
                    <div className="UserRFIDTagsList-FullName">
                      <p className="paragraph-1 UserRFIDTagsList-FirstName">
                        <span className="heading-5">First Name:</span>{" "}
                        {item.firstName}
                      </p>
                      <p className="paragraph-1 UserRFIDTagsList-LastName">
                        <span className="heading-5">Last Name:</span>{" "}
                        {item.lastName}
                      </p>
                    </div>
                    <div className="UserRFIDTagsList-FullName">
                      <p className="paragraph-1 UserRFIDTagsList-MiddleName">
                        <span className="heading-5">Middle Name:</span>{" "}
                        {item.middleName ? item.middleName : "N/A"}
                      </p>
                    </div>
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
UserRFIDTagsList.propTypes = {
  rfidTags: PropTypes.array,
  className: PropTypes.string,
};

// Define the defaultProps for the component
UserRFIDTagsList.defaultProps = {
  rfidTags: [],
  className: "",
};

export default UserRFIDTagsList;
