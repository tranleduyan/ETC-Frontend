// Import Components 
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './HeaderButton.css';

// Define HeaderButton Component
function HeaderButton(props) {

  // Extract relevant information from props
  const { className, title, isSelected, onClick } = props;

  return (
    <button 
      className={`HeaderButton-Container ${className} ${isSelected ? 'HeaderButton-Active' : ''}`}
      onClick={onClick}>
      <p className='heading-5'>{title}</p>
    </button>
  )
};

HeaderButton.propsTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

HeaderButton.defaultProps = {
  className: '',
  isSelected: false,
  onClick: () => {},
};

// Exports the HeaderButton component as the default export for the HeaderButton module.
export default HeaderButton;
