// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './LinkButton.css';

// Define Link Button
function LinkButton(props) {
  // Destructure props to extract relevant information
  const { title, onClick, className } = props;

  return (
    <button className={`${className} LinkButton-Container`} onClick={onClick}>
        <p className='paragraph-1'>{title}</p>
    </button>
  )
}

// Define PropTypes for type-checking and documentation
LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

// Set default values for props to avoid potential issues if not provided
LinkButton.defaultProps = {
  onClick: () => {},
  className: '',
}

export default LinkButton;
