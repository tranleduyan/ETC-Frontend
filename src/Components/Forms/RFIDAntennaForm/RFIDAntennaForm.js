//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./RFIDAntennaForm.css";
//#endregion

//#region Import UI Components
import StandardTextInputField from "../../InputFields/StandardTextInputField/StandardTextInputField";
import StandardDropDown from "../../DropDowns/StandardDropDown/StandardDropDown";
import Message from "../../Message/Message";
//#endregion

//#region Import Icons
import { HiExclamationCircle } from "react-icons/hi";
//#endregion

// Define RFIDAntennaForm Component
function RFIDAntennaForm(props) {
  // Extract relevant props
  const {
    className,
    locationOptions,
    rfidAntennaInformation,
    setRFIDAntennaInformation,
    isError,
    errorMessage,
  } = props;

  // HandleRFIDAntennaInputChange - Update the information with the new new value to the propertyName.
  const HandleRFIDAntennaInputChange = (propertyName, selectedValue) => {
    setRFIDAntennaInformation({
      ...rfidAntennaInformation,
      [propertyName]: selectedValue,
    });
  };

  return (
    <div className={`RFIDAntennaForm-Container ${className}`}>
      {/* Form Container */}
      <div className="RFIDAntennaForm-FormContainer">
        {/* RFID Antenna Information Group */}
        <div className="RFIDAntennaForm-RFIDAntennaInformationGroup">
          {/* Group Header */}
          <p className="heading-5">RFID Antenna Information</p>
          {/* RFID Antenna ID Input Field */}
          <StandardTextInputField
            placeholder="Enter RFID Antenna ID"
            className="RFIDAntennaForm-Field"
            name="id"
            value={rfidAntennaInformation.id}
            onChange={(name, value) =>
              HandleRFIDAntennaInputChange(name, value)
            }
          />
          {/* RFID Antenna Location DropDown */}
          <StandardDropDown
            placeholder="Select location"
            className="RFIDAntennaForm-Field RFIDAntennaForm-MarginField"
            name="location"
            value={rfidAntennaInformation.location}
            options={locationOptions}
            onChange={(name, value) =>
              HandleRFIDAntennaInputChange(name, value)
            }
            isClearable={true}
          />
        </div>
        {/* Instructions/Messages */}
        {!isError && (
          <p className="paragraph-1 RFIDAntennaForm-Instructions">
            Please provide the details of the RFID antenna.
          </p>
        )}
        {/* Error Message */}
        <Message
          icon={HiExclamationCircle}
          message={errorMessage}
          className="RFIDAntennaForm-ErrorMessageContainer"
          visibility={isError}
        />
      </div>
    </div>
  );
}

// Define PropTypes for the form component
RFIDAntennaForm.propTypes = {
  className: PropTypes.string,
  rfidAntennaInformation: PropTypes.any.isRequired,
  setRFIDAntennaInformation: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  locationOptions: PropTypes.array.isRequired,
};

// Define default props for the component
RFIDAntennaForm.defaultProps = {
  className: "",
  isError: false,
  errorMessage: "",
};

// Exports the RFIDAntennaForm component as the default export for the RFIDAntennaForm module.
export default RFIDAntennaForm;
