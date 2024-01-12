//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

//#region Import UI Components
import GeneralModal from '../GeneralModal/GeneralModal';
import StandardButton from '../../Buttons/StandardButton/StandardButton';
//#endregion

// Import Stylings
import './ConfirmationModal.css';

// Define ConfirmationModal Component
function ConfirmationModal(props) {

  // Extract necessary props
  const { className, title, content, warning, onYes, onNo, isVisible } = props;

  return (
    <GeneralModal
      className={`ConfirmationModal-Container ${className}`}
      isVisible={isVisible}>
        <p className='heading-5'>{title}</p>
        <div className='ConfirmationModal-MessageContainer'>
          {/* Content Message */}
          <p className='paragraph-1'>{content}</p>
          {/* Warning Message */}
          <p className='paragraph-1 ConfirmationModal-Warning'>{warning}</p>
        </div>
        {/* Action Container */}
        <div className='ConfirmationModal-ActionContainer'>
          <StandardButton
            title='Yes'
            onClick={onYes}
            className='ConfirmationModal-ActionButton'/>
          <StandardButton
            title='No'
            onClick={onNo}
            className='ConfirmationModal-ActionButton'/>
        </div>
    </GeneralModal>
  )
};

// Define the proptypes for the component
ConfirmationModal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  warning: PropTypes.string,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  isVisible: PropTypes.bool,
};

// Define the default props value for the component
ConfirmationModal.defaultProps = {
  className: '',
  title: '',
  content: '',
  warning: '',
  onYes : () => {},
  onNo: () => {},
  isVisible: false,
};

// Exports the ConfirmationModal component as the default export for the ConfirmationModal module.
export default ConfirmationModal;
