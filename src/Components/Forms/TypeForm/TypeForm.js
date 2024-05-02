//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import UI Components
import StandardTextInputField from "../../InputFields/StandardTextInputField/StandardTextInputField";
import Message from "../../Message/Message";
//#endregion

// Import Stylings
import "./TypeForm.css";

// Import Icons
import { HiExclamationCircle } from "react-icons/hi";

// Define TypeForm Component
function TypeForm(props) {
  // Extract relevant information
  const {
    className,
    typeInformation,
    setTypeInformation,
    isError,
    errorMessage,
  } = props;

  // HandleTypeAdditionInputChange - Update the information with the new value to the propertyName
  const HandleTypeInputChange = (propertyName, value) => {
    setTypeInformation({ ...typeInformation, [propertyName]: value });
  };

  return (
    <div className={`TypeForm-Container ${className}`}>
      {/* Form Container */}
      <div className="TypeForm-FormContainer">
        {/* Type Information Group */}
        <div className="TypeForm-TypeInformationGroup">
          {/* Group Header */}
          <p className="heading-5">Type Information</p>
          {/* Type Name Input Field */}
          <StandardTextInputField
            placeholder="Enter type name"
            className="TypeForm-Field"
            name="name"
            value={typeInformation.name}
            onChange={(name, value) => HandleTypeInputChange(name, value)}
          />
        </div>
        {/* Instructions/Messages */}
        {!isError && (
          <p className="paragraph-1 TypeForm-Instructions">
            Please provide the details of the type.
          </p>
        )}
        {/* Error Message */}
        <Message
          icon={HiExclamationCircle}
          message={errorMessage}
          className="TypeForm-ErrorMessageContainer"
          visibility={isError}
        />
      </div>
    </div>
  );
}

// Define PropTypes for the form component
TypeForm.propTypes = {
  className: PropTypes.string,
  typeInformation: PropTypes.any.isRequired,
  setTypeInformation: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

// Define default props for the component
TypeForm.defaultProps = {
  className: "",
  isError: false,
  errorMessage: "",
};

// Exports the TypeForm component as the default export for the TypeForm module.
export default TypeForm;
