// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './IconButton.css';

// Define IconButton Component
function IconButton(props) {

  // Destructure props to extract relevant information
  const { icon: Icon, className, iconClassName, onClick } = props;
  
  return (
    <button className={`IconButton-Container ${className}`} onClick={onClick}>
      {/* Render the specified Icon component with the provided iconClassName */}
        <Icon className={`${iconClassName}`} />
    </button>
  )
};

// Define PropTypes for type-checking and documentation
IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,             
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,   
};

// Set default values for props to avoid potential issues if not provided
IconButton.defaultProps = {
  className: '',
  iconClassName: '',
  onClick: () => {},
};

// Exports the IconButton component as the default export for the IconButton module.
export default IconButton;
