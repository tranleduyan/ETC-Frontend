// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './GeneralModal.css';

// Define General Modal
function GeneralModal(props) {

  const { children, className, isVisible } = props;

  return (
    <div className={`${isVisible ? 'GeneralModal-Overlay' : 'hide'}`}>
      <div className={`GeneralModal-Container ${className}`}>
        {children}
      </div>
    </div>
  )
};

// Define types of the props of the component
GeneralModal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
};

// Define default values for the props for the component
GeneralModal.defaultProps = {
  className: '',
  isVisible: false,
};

// Exports the GeneralModal component as the default export for the GeneralModal module.
export default GeneralModal;
