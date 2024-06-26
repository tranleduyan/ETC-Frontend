//#region Import Necessary Dependencies
import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
//#endregion

// Import Icons
import { HiChevronDown } from "react-icons/hi";

// This component serves as a substitute for the default dropdown indicator in the 'Select' component. It allows for overriding the default icon and dynamically adjusts styling based on the window width.
const DropdownIndicator = (props) => {
  // State to track mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

  // UpdateMobileView - To set the isMobileVIew if window.innerWidth is smaller than 480px.
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

  useEffect(() => {
    // Add event listener for window resize to update mobile view
    window.addEventListener("resize", UpdateMobileView);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("resize", UpdateMobileView);
    };
  }, [UpdateMobileView]);

  return (
    <components.DropdownIndicator {...props}>
      <HiChevronDown
        style={{
          fontSize: !isMobileView ? "calc(3.3375vmin)" : "calc(6.675vmin)",
        }}
      />
    </components.DropdownIndicator>
  );
};

// Define StandardDropDown Component
function StandardDropDown(props) {
  // Extract relevant information
  const {
    className,
    placeholder,
    name,
    value,
    isMulti,
    isSearchable,
    isDisabled,
    onChange,
    options,
    visibility,
    isClearable,
  } = props;

  // CSS class for hiding the component
  const hiddenClassName = `hide ${className}`;

  // State for handle mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

  // UpdateMobileView - To set the isMobileVIew if window.innerWidth is smaller than 480px.
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

  // HandleInputChange - Invoked when the dropdown value changes
  const HandleInputChange = (selectedOption) => {
    onChange(name, selectedOption);
  };

  // Component to remove Indicator Separator of 'Select'
  const IndicatorSeparator = () => null;

  useEffect(() => {
    // Add event listener for window resize to update mobile view
    window.addEventListener("resize", UpdateMobileView);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("resize", UpdateMobileView);
    };
  }, [UpdateMobileView]);

  // Styling configurations for the 'react-select' component
  const styles = {
    control: (provided, state) => {
      let baseStyles = {
        ...provided,
        display: "flex",
        flexDirection: "row",
        height: "auto",
        minHeight: "calc(6.675vmin)",
        maxHeight: "calc(6.675vmin)",
        boxSizing: "border-box",
        borderRadius: "calc(1.390625vmin)",
        border: `calc(0.278125vmin) solid ${
          state.isFocused ? "var(--Blue1)" : "var(--Gray1)"
        }`,
        fontSize: "calc(2.225vmin)",
        fontFamily: "'Poppins Regular', sans-serif",
        boxShadow: "none",
        textAlignment: "left",
        "&:hover": undefined,
        "&:focus": {
          outline: "none",
          boxShadow: "none",
        },
        overflow: "hidden",
        backgroundColor: isDisabled ? "var(--Gray2)" : provided.backgroundColor,
        color: isDisabled ? "var(--Gray3)" : provided.color,
      };

      // For mobile or any smaller devices
      if (isMobileView) {
        baseStyles = {
          ...baseStyles,
          minHeight: "calc(13.35vmin)",
          maxHeight: "auto",
          padding: "0px calc(1vmin)",
          borderRadius: "calc(2.78125vmin)",
          border: `calc(0.55625vmin) solid ${
            state.isFocused ? "var(--Blue1)" : "var(--Gray1)"
          }`,
          fontSize: "calc(4.45vmin)",
        };
      }

      return baseStyles;
    },
    menu: (provided) => {
      let baseStyles = {
        ...provided,
        overflow: "auto",
        borderRadius: "calc(1.390625vmin)",
        border: "calc(0.278125vmin) solid var(--Gray1)",
        boxShadow: "none",
      };

      // For mobile or any smaller devices
      if (isMobileView) {
        baseStyles = {
          ...baseStyles,
          borderRadius: "calc(2.78125vmin)",
          border: "calc(0.55625vmin) solid var(--Gray1)",
          boxShadow: "none",
        };
      }

      return baseStyles;
    },
    option: (provided, state) => {
      let baseStyles = {
        ...provided,
        fontSize: "calc(2.225vmin)",
        fontFamily: "'Poppins Regular', sans-serif",
        padding: "calc(1.75vmin) calc(2vmin)",
        color: state.isSelected ? "var(--White1)" : "var(--Black1)",
      };

      // For mobile or any smaller devices
      if (isMobileView) {
        baseStyles = {
          ...baseStyles,
          fontSize: "calc(4.45vmin)",
          padding: "calc(3.5vmin) calc(4vmin)",
        };
      }

      return baseStyles;
    },
    menuList: (provided, state) => {
      return {
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        height: "auto",
      };
    },
    clearIndicator: (provided, state) => {
      let baseStyles = {
        ...provided,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "2vmin 1vmin",
      };

      // For mobile or any smaller devices
      if (isMobileView) {
        baseStyles = {
          ...baseStyles,
          fontSize: "calc(4.45vmin)",
          padding: "calc(3.5vmin) calc(2vmin)",
        };
      }
      return baseStyles;
    },
    dropdownIndicator: (provided, state) => {
      let color;
      if (isDisabled) {
        color = "var(--Gray3) !important";
      } else if (state.isFocused || state.hasValue) {
        color = "var(--Black1) !important";
      } else {
        color = "var(--Gray1) !important";
      }
      let baseStyles = {
        ...provided,
        color: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        boxSizing: "border-box",
        padding: "1.45vmin 1vmin",
      };
      // For mobile or any smaller devices
      if (isMobileView) {
        baseStyles = {
          ...baseStyles,
          fontSize: "calc(4.45vmin)",
          padding: "calc(3vmin) calc(1vmin)",
        };
      }
      return baseStyles;
    },
    placeholder: (provided) => {
      return {
        ...provided,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "var(--Gray3)",
      };
    },
    valueContainer: (provided) => {
      let baseStyles = {
        ...provided,
        boxSizing: "border-box",
        padding: "calc(1vmin) calc(1.45vmin)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "calc(6.5vmin)",
        overflowY: "auto",
      };

      // For mobile and smaller devices
      if (isMobileView) {
        baseStyles = {
          ...baseStyles,
          height: "auto",
          padding: "calc(1vmin) calc(2vmin)",
        };
      }
      return baseStyles;
    },
  };

  return (
    <Select
      styles={styles}
      placeholder={placeholder}
      className={`StandardDropDown ${
        visibility === false ? hiddenClassName : className
      }`}
      name={name}
      value={value}
      options={options}
      isMulti={isMulti}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      components={{
        DropdownIndicator,
        IndicatorSeparator,
      }}
      onChange={HandleInputChange}
    />
  );
}

// Define PropTypes for type-checking and documentation
StandardDropDown.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  visibility: PropTypes.bool,
  isClearable: PropTypes.bool,
};

// Set default values for props to avoid potential issues if not provided
StandardDropDown.defaultProps = {
  className: "",
  placeholder: "Select an option",
  isSearchable: false,
  isDisabled: false,
  options: [],
  isMulti: false,
  visibility: true,
  isClearable: false,
};

// Exports the StandardDropDown component as the default export for the StandardDropDown module.
export default StandardDropDown;
