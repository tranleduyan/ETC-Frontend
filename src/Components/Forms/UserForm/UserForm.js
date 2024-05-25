//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

//#region Import Stylings
import "./UserForm.css";
//#endregion

//#region Import UI Components
import StandardTextInputField from "../../InputFields/StandardTextInputField/StandardTextInputField";
import Message from "../../Message/Message";
//#endregion

//#region Import Icons
import { HiExclamationCircle } from "react-icons/hi";
//#endregion

// Define UsersForm Component
function UserForm(props) {
  // Extract relevant information
  const {
    className,
    isError,
    errorMessage,
    userInformation,
    setUserInformation,
  } = props;

  // HandleModelAdditionInputChange - Update the information with the new value to the propertyName.
  const HandleUserInformationInputChange = (propertyName, selectedValue) => {
    setUserInformation({ ...userInformation, [propertyName]: selectedValue });
  };

  return (
    <div className={`UserForm-FormContainer ${className}`}>
      {/* Full Name Group */}
      <div className="UserForm-FullNameGroup">
        {/* Group Header */}
        <p className="heading-5">Full Name</p>
        <div className="UserForm-MultipleFieldsGroup">
          {/* First Name Input Field */}
          <StandardTextInputField
            placeholder="Enter first name"
            className="UserForm-Field"
            name="firstName"
            value={userInformation.firstName}
            onChange={(name, value) =>
              HandleUserInformationInputChange(name, value)
            }
          />
          {/* Middle Name Input Field */}
          <StandardTextInputField
            placeholder="Enter middle name"
            className="UserForm-Field"
            name="middleName"
            value={userInformation.middleName}
            onChange={(name, value) =>
              HandleUserInformationInputChange(name, value)
            }
          />
          {/* Last Name Input Field */}
          <StandardTextInputField
            placeholder="Enter last name"
            className="UserForm-Field"
            name="lastName"
            value={userInformation.lastName}
            onChange={(name, value) =>
              HandleUserInformationInputChange(name, value)
            }
          />
        </div>
      </div>
      <div className="UserForm-EmailAddressGroup">
        {/* Group Header */}
        <p className="heading-5">Email Address</p>
        {/* Email Address Input Field */}
        <StandardTextInputField
          placeholder="Enter email address"
          className="UserForm-Field"
          name="emailAddress"
          value={userInformation.emailAddress}
          onChange={(name, value) =>
            HandleUserInformationInputChange(name, value)
          }
        />
      </div>
      {/* ID Group */}
      <div className="UserForm-IDGroup">
        {/* Group Header */}
        <p className="heading-5">ID</p>
        <div className="UserForm-MultipleFieldsGroup">
          {/* School ID Input Field */}
          <StandardTextInputField
            placeholder="Enter school ID"
            className="UserForm-Field"
            name="schoolId"
            value={userInformation.schoolId}
            onChange={(name, value) =>
              HandleUserInformationInputChange(name, value)
            }
          />
          {/* Tag ID Input Field */}
          <StandardTextInputField
            placeholder="Enter tag ID"
            className="UserForm-Field"
            name="tagId"
            value={userInformation.tagId}
            onChange={(name, value) =>
              HandleUserInformationInputChange(name, value)
            }
          />
        </div>
      </div>
      {/* Error Message */}
      <Message
        icon={HiExclamationCircle}
        message={errorMessage}
        className="UserForm-ErrorMessageContainer"
        visibility={isError}
      />
    </div>
  );
}

UserForm.propTypes = {
  className: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  userInformation: PropTypes.any.isRequired,
  setUserInformation: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  className: "",
  isError: false,
  errorMessage: "",
};

// Exports the UserForm component as the default export for the UserForm module.
export default UserForm;
