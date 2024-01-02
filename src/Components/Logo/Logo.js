// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import ETC_Color_Logo from '../../Assets/Images/ETC-Logo-Color.png';

// Import Stylings
import './Logo.css';

// Define Logo Component
function Logo(props) {

  // Extract relevant information from props
  const { className } = props;
  
  return (
    <div className={`Logo-Container ${className}`}>
      <img src={ETC_Color_Logo} alt='ETC Logo'/>
    </div>
  )
};

// Define PropTypes for type-checking and documentation
Logo.propTypes = {
  className: PropTypes.string,
};

// Set default values for props to avoid potential issues if not provided
Logo.defaultProps = {
  className: '',
};

// Exports the Logo component as the default export for the Logo module.
export default Logo;
