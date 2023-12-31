// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import GeneralModal from '../GeneralModal/GeneralModal';

// Import Stylings
import './IconModal.css';

function IconModal(props) {

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

IconModal.propTypes = {
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  message: PropTypes.string,
  isVisible: PropTypes.bool,
};

IconModal.defaultProps = {
  className: '',
  iconClassName: '',
  message: '',
  isVisible: false,
};

// Exports the IconModal component as the default export for the IconModal module.
export default IconModal;
