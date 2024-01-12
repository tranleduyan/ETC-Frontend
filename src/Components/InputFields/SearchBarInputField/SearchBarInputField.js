//#region Import Necessary Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './SearchBarInputField.css';

// Import Icons
import { HiSearch } from 'react-icons/hi';

// Define the search bar input field
function SearchBarInputField(props) {

  // Destructure props to extract relevant information
  const { className, placeholder, name, value, onChange, onKeyDown } = props;

  // State to track whether the input field is focused
  const [isFocused, setIsFocused] = useState(false);

  // Handle input change and propagate changes using the provided onChange function
  const HandleInputChange = (event) => {
    const { name, value} = event.target;
    onChange(name, value);
  };

  // Handle focus event by updating the isFocused state
  const OnFocus = () => {
    setIsFocused(true);
  };

  // Handle blur event by updating the isFocused state
  const OnBlur = () => {
    setIsFocused(false);
  };

  // Determine the container class based on the focus state and value
  const containerClassName = `${className} SearchBarInputField-Container ${ value || isFocused ? 'SearchBarInputField-Focused' : ''}`;

  return (
    <div className={containerClassName}>
      {/* Render the search icon */}
      <HiSearch className='SearchBarInputField-Icon'/>
      {/* Render the input field with specified properties */}
      <input
        type='text'
        placeholder={placeholder}
        className='SearchBarInputField-Input'
        name={name}
        value={value}
        onChange={HandleInputChange}
        onKeyDown={onKeyDown}
        onFocus={OnFocus}
        onBlur ={OnBlur}
        />
    </div>
  )
};

// Define PropTypes for type-checking and documentation
SearchBarInputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

// Set default values for props to avoid potential issues if not provided
SearchBarInputField.defaultProps = {
  className: '',
  placeholder: 'Search here',
  onKeyDown: () => {}
};

// Exports the SearchBarInputField component as the default export for the SearchBarInputField module.
export default SearchBarInputField;
