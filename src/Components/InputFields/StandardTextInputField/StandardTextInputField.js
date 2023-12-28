// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './StandardTextInputField.css';

// Render the standard text input field
function StandardTextInputField(props) {
  
  const { className, placeholder, name, type, value, onChange, visibility, onKeyDown } = props;

  // Class Name Styling for hidden visibility
  const hiddenClassName = `hide ${className}`;

  // Update the values of the input object
  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <input type={type}
           placeholder={placeholder}
           className={`StandardTextInputField ${visibility === false ? hiddenClassName : className}`} 
           name={name}
           value={value}
           onChange={HandleInputChange}
           onKeyDown={onKeyDown}/>
  )
};

// Define PropTypes for type-checking and documentation
StandardTextInputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  visibility: PropTypes.bool,
  onKeyDown: PropTypes.func
};

// Set default values for props to avoid potential issues if not provided
StandardTextInputField.defaultProps = {
  className: '',
  placeholder: '',
  type: 'text',
  visibility: true,
  onKeyDown: () => {}
};

// Exports the StandardTextInputField component as the default export for the StandardTextInputField module.
export default StandardTextInputField;
