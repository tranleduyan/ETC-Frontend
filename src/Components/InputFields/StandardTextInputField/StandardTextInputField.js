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
  }

  return (
    <input type={type}
           placeholder={placeholder}
           className={`${visibility === false ? hiddenClassName : className} StandardTextInputField`} 
           name={name}
           value={value}
           onChange={HandleInputChange}
           onKeyDown={onKeyDown}/>
  )
}

// Set Types for Props 
StandardTextInputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  visibility: PropTypes.bool,
  onKeyDown: PropTypes.func
}

// Set Default Values for Props
StandardTextInputField.defaultProps = {
  className: '',
  placeholder: '',
  type: 'text',
  visibility: true,
  onKeyDown: () => {}
}

export default StandardTextInputField;
