// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';

// Import Stylings
import './TypeAdditionForm.css';

// Define TypeAdditionForm Component
function TypeAdditionForm(props) {

  const { className, typeAdditionInformation, setTypeAdditionInformation } = props;

  const HandleTypeAdditionInputChange = (propertyName, selectedValue) => {
    setTypeAdditionInformation({...typeAdditionInformation, [propertyName]: selectedValue})
  };

  return (
    <div className={`TypeAdditionForm-Container ${className}`}>
      <div className='TypeAdditionForm-FormContainer'>
        <div className='TypeAdditionForm-TypeInformationGroup'>
          <p className='heading-5'>Type Information</p>
          <StandardTextInputField
            placeholder='Enter type name'
            className='TypeAdditionForm-Field'
            name='name'
            onChange={(name, value) => HandleTypeAdditionInputChange(name, value)}/>
        </div>
        <p className='paragraph-1 TypeAdditionForm-Instructions'>
          Please provide the details of the type.
        </p>
      </div>
    </div>
  )
};

// Define PropTypes for the form component
TypeAdditionForm.propTypes = {
  className: PropTypes.string,
  typeAdditionInformation: PropTypes.any.isRequired,
  setTypeAdditionInformation: PropTypes.func.isRequired,
};

// Define default props for the component
TypeAdditionForm.defaultProps = {
  className: '',
};

// Exports the TypeAdditionForm component as the default export for the TypeAdditionForm module.
export default TypeAdditionForm;
