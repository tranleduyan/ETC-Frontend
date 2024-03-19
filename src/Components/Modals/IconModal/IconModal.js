//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './IconModal.css';

//#region Import UI Components
import GeneralModal from '../GeneralModal/GeneralModal';

// Define Icon Modal Component
function IconModal(props) {

  // Extract necessary props
  const { icon: Icon, className, iconClassName, message, isVisible } = props;
  
  return (
    <GeneralModal 
      className={`IconModal-Container ${className}`}
      isVisible={isVisible}>
        <Icon className={`IconModal-Icon ${iconClassName}`}/>
        <p className='paragraph-1'>{message}</p>
    </GeneralModal>
  )
};

// Define the propTypes for the component
IconModal.propTypes = {
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  message: PropTypes.string,
  isVisible: PropTypes.bool,
};

// Define the default props value for the component
IconModal.defaultProps = {
  className: '',
  iconClassName: '',
  message: '',
  isVisible: false,
};

// Exports the IconModal component as the default export for the IconModal module.
export default IconModal;
