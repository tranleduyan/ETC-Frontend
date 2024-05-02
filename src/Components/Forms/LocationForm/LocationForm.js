//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import UI Components
import StandardTextInputField from "../../InputFields/StandardTextInputField/StandardTextInputField";
import Message from "../../Message/Message";
//#endregion

//#region Import Stylings
import "./LocationForm.css";
//#endregion

//#region Import Icons
import { HiExclamationCircle } from "react-icons/hi";
//#endregion

// Define LocationForm Component
function LocationForm(props) {
  // Extract relevant props
  const {
    className,
    locationInformation,
    setLocationInformation,
    isError,
    errorMessage,
  } = props;

  // HandleLocationInputChange - Update the information with the new value to the propertyName
  const HandleLocationInputChange = (propertyName, value) => {
    setLocationInformation({ ...locationInformation, [propertyName]: value });
  };
  return (
    <div className={`LocationForm-Container ${className}`}>
      {/* Form Container */}
      <div className="LocationForm-FormContainer">
        {/* Location Information Group */}
        <div className="LocationForm-LocationInformationGroup">
          {/* Group Header */}
          <p className="heading-5">Location Information</p>
          {/* Location Name Input Field */}
          <StandardTextInputField
            placeholder="Enter location name"
            className="LocationForm-Field"
            name="name"
            value={locationInformation.name}
            onChange={(name, value) => HandleLocationInputChange(name, value)}
          />
        </div>
        {/* Instructions/Messages */}
        {!isError && (
          <p className="paragraph-1 LocationForm-Instructions">
            Please provide the details of the location.
          </p>
        )}
        {/* Error Message */}
        <Message
          icon={HiExclamationCircle}
          message={errorMessage}
          className="LocationForm-ErrorMessageContainer"
          visibility={isError}
        />
      </div>
    </div>
  );
}

// Define PropTypes for the form component
LocationForm.propTypes = {
  className: PropTypes.string,
  locationInformation: PropTypes.any.isRequired,
  setLocationInformation: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

// Define default props for the component
LocationForm.defaultProps = {
  className: "",
  isError: false,
  errorMessage: "",
};

// Exports the LocationForm component as the default export for the LocationForm module.
export default LocationForm;
