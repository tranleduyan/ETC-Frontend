//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './FilterButton.css';

// Define FilterButton Component
function FilterButton(props) {

  // Destructure props to extract relevant information
  const { title, className, isActive, onClick} = props;

  // Determine the container class based on isActive prop
  const containerClassName = `${className} FilterButton-Container ${isActive ? 'FilterButton-Active' : ''}`;

  return (
    <button className={containerClassName} onClick={onClick}>
      {/* Display the title with heading-5 style */}
      <p className='heading-5'>{title}</p>
    </button>
  )
};

// Define PropTypes for type-checking and documentation
FilterButton.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

// Set default values for props to avoid potential issues if not provided
FilterButton.defaultProps = {
  title: '',
  className: '',
  isActive: false,
  onClick: null,
};

// Exports the FilterButton component as the default export for the FilterButton module.
export default FilterButton;
