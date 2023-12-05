// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './SearchBarInputField.css';
import { HiSearch } from 'react-icons/hi';

// Import Icons


// Render the search bar input field
function SearchBarInputField(props) {

  const { className, placeholder } = props;

  return (
    <div className={`${className} SearchBarInputField-Container`}>
      <HiSearch className='SearchBarInputField-Icon'/>
      <input
        type='text'
        className='SearchBarInputField-Input'
        placeholder={placeholder}
        />
    </div>
  )
}

SearchBarInputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
}

SearchBarInputField.defaultProps = {
  className: '',
  placeholder: 'Search here',
}

export default SearchBarInputField;
