//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
//#endregion

// Import Stylings
import "./StandardButton.css";

// Define Standard Button Components
function StandardButton(props) {
  // Extract necessary props
  const { title, onClick, className, icon: Icon } = props;

  return (
    <button
      className={`${className} StandardButton-Container`}
      onClick={onClick}
    >
      {title !== "" && <p className="paragraph-2">{title}</p>}
      {Icon && <Icon className="StandardButton-Icon" />}
    </button>
  );
}

// Define PropTypes for type-checking and documentation
StandardButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  icon: PropTypes.elementType,
};

// Set default values for props to avoid potential issues if not provided
StandardButton.defaultProps = {
  title: "",
  className: "",
  icon: null,
};

// Exports the StandardButton component as the default export for the StandardButton module.
export default StandardButton;
