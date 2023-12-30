// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';

// Import Stylings
import './TypeAdditionForm.css';

// Define TypeAdditionForm Component
function TypeAdditionForm(props) {

  // Extract relevant information
  const { className, typeAdditionInformation, setTypeAdditionInformation } = props;

  // HandleTypeAdditionInputChange - Update the information of the typeAdditionInformation new value to the propertyName
  const HandleTypeAdditionInputChange = (propertyName, value) => {
    setTypeAdditionInformation({...typeAdditionInformation, [propertyName]: value})
  };

  return (
    <div className={`TypeAdditionForm-Container ${className}`}>
      {/* Form Container */}
      <div className='TypeAdditionForm-FormContainer'>
        {/* Type Information Group */}
        <div className='TypeAdditionForm-TypeInformationGroup'>
          {/* Group Header */}
          <p className='heading-5'>Type Information</p>
          {/* Type Name Input Field */}
          <StandardTextInputField
            placeholder='Enter type name'
            className='TypeAdditionForm-Field'
            name='name'
            onChange={(name, value) => HandleTypeAdditionInputChange(name, value)}/>
        </div>
        {/* Instructions/Messages */}
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
