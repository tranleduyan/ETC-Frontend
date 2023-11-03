// Import Components
import React from 'react';

// Import Stylings
import './StandardTextInputField.css';

function StandardTextInputField(props) {
  const { className, placeholder, name, type, value, onChange, visibility } = props;

  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  }

  return (
    <input type={type ? type : 'text'}
           placeholder={placeholder}
           className={`${visibility === false ? `hide ${className}` : className} StandardTextInputField`} 
           name={name}
           value={value}
           onChange={HandleInputChange}/>
  )
}

export default StandardTextInputField