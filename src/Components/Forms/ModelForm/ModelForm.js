//#region Import Components
import React, { useRef } from "react";
import PropTypes from "prop-types";
//#endregion

// Import Stylings
import "./ModelForm.css";

//#region Import UI Components
import StandardTextInputField from "../../InputFields/StandardTextInputField/StandardTextInputField";
import StandardDropDown from "../../DropDowns/StandardDropDown/StandardDropDown";
import Message from "../../Message/Message";
//#endregion

// Import Icons
import { HiPhotograph, HiExclamationCircle } from "react-icons/hi";

// Define ModelForm Component
function ModelForm(props) {
  // Extract relevant information
  const {
    className,
    equipmentTypeOptions,
    modelInformation,
    setModelInformation,
    isError,
    errorMessage,
  } = props;

  // Ref hooks to the file input
  const modelPhotoRef = useRef(null);

  // HandleModelAdditionInputChange - Update the information with the new value to the propertyName.
  const HandleModelInputChange = (propertyName, selectedValue) => {
    setModelInformation({ ...modelInformation, [propertyName]: selectedValue });
  };

  // Handle Image Click - Opens the file input dialog when the user clicks on the displayed image.
  const HandleImageClick = (event) => {
    modelPhotoRef.current.click();
  };

  // Handle Image Change - Updates the model photo in the state when a new image is selected.
  const HandleImageChange = (event) => {
    HandleModelInputChange("photo", event.target.files[0]);
  };

  return (
    <div className={`ModelForm-Container ${className}`}>
      {/* Visual/Media Container */}
      <div className="ModelForm-VisualContainer">
        {/* If the photo is not uploaded, show prompt */}
        {!modelInformation.photo && (
          <button
            className="ModelForm-PromptContainer"
            onClick={HandleImageClick}
          >
            <HiPhotograph className="ModelForm-PromptIcon" />
            <p className="paragraph-1 ModelForm-Prompt">
              Upload the model photo here.
            </p>
            <input
              type="file"
              ref={modelPhotoRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={HandleImageChange}
            />
          </button>
        )}
        {/* If the photo is uploaded, show the photo (preview) */}
        {modelInformation.photo &&
          typeof modelInformation.photo !== "string" && (
            <button
              className="ModelForm-TypeModelPhoto"
              onClick={HandleImageClick}
            >
              <img
                src={URL.createObjectURL(modelInformation.photo)}
                alt="Equipment Model"
              />
              <input
                type="file"
                ref={modelPhotoRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={HandleImageChange}
              />
            </button>
          )}
        {modelInformation.photo &&
          typeof modelInformation.photo === "string" && (
            <button
              className="ModelForm-TypeModelPhoto"
              onClick={HandleImageClick}
            >
              <img src={modelInformation.photo} alt="Equipment Model" />
              <input
                type="file"
                ref={modelPhotoRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={HandleImageChange}
              />
            </button>
          )}
      </div>
      {/* Form Container */}
      <div className="ModelForm-FormContainer">
        {/* Model Information Group */}
        <div className="ModelForm-ModelInformationGroup">
          {/* Group Header */}
          <p className="heading-5">Model Information</p>
          {/* Model Name Input Field */}
          <StandardTextInputField
            placeholder="Enter model name"
            className="ModelForm-Field"
            name="name"
            value={modelInformation.name}
            onChange={(name, value) => HandleModelInputChange(name, value)}
          />
          {/* Model Type DropDown */}
          <StandardDropDown
            placeholder="Select type"
            className="ModelForm-Field ModelAdditionForm-MarginField"
            name="type"
            value={modelInformation.type}
            options={equipmentTypeOptions}
            onChange={(name, value) => HandleModelInputChange(name, value)}
          />
        </div>
        {/* Instructions/Messages */}
        {!isError && (
          <p className="paragraph-1 ModelForm-Instructions">
            Please provide the details of the model.
          </p>
        )}
        {/* Error Message */}
        <Message
          icon={HiExclamationCircle}
          message={errorMessage}
          className="ModelForm-ErrorMessageContainer"
          visibility={isError}
        />
      </div>
    </div>
  );
}

// Define PropTypes for the form component
ModelForm.propTypes = {
  className: PropTypes.string,
  modelInformation: PropTypes.any.isRequired,
  setModelInformation: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  equipmentTypeOptions: PropTypes.array.isRequired,
};

// Define default props for the component
ModelForm.defaultProps = {
  className: "",
  isError: false,
  errorMessage: "",
};

// Exports the ModelForm component as the default export for the ModelForm module.
export default ModelForm;
