// Import Components
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './SearchBarInputField.css';

// Import Icons
import { HiSearch } from 'react-icons/hi';

// Render the search bar input field
function SearchBarInputField(props) {

  const { className, placeholder, name, value, onChange, onKeyDown } = props;

  const [isFocused, setIsFocused] = useState(false);

  const HandleInputChange = (event) => {
    const { name, value} = event.target;
    onChange(name, value);
  }

  const OnFocus = () => {
    setIsFocused(true);
  }

  const OnBlur = () => {
    setIsFocused(false);
  }

  const containerClassName = `${className} SearchBarInputField-Container ${ value || isFocused ? 'SearchBarInputField-Focused' : ''}`;

  return (
    <div className={containerClassName}>
      <HiSearch className='SearchBarInputField-Icon'/>
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
}

SearchBarInputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
}

SearchBarInputField.defaultProps = {
  className: '',
  placeholder: 'Search here',
  onKeyDown: () => {}
}

export default SearchBarInputField;
