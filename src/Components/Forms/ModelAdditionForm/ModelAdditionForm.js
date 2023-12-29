// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';
import StandardDropDown from '../../DropDowns/StandardDropDown/StandardDropDown';

// Import Stylings
import './ModelAdditionForm.css';

// Import Icons 
import { HiPhotograph } from 'react-icons/hi';

// Define ModelAdditionForm Component
function ModelAdditionForm(props) {

  const { className, modelAdditionInformation, setModelAdditionInformation } = props;

  const HandleModelAdditionInputChange = (propertyName, selectedValue) => {
    setModelAdditionInformation({...modelAdditionInformation, [propertyName]: selectedValue})
  }

  return (
    <div className={`ModelAdditionForm-Container ${className}`}>
      <div className='ModelAdditionForm-VisualContainer'>
        <div className='ModelAdditionForm-PromptContainer'>
          <HiPhotograph className='ModelAdditionForm-PromptIcon'/>
          <p className='paragraph-1 ModelAdditionForm-Prompt'>Upload the model photo here.</p>
        </div>
      </div>
      <div className='ModelAdditionForm-FormContainer'>
        <div className='ModelAdditionForm-ModelInformationGroup'>
          <p className='heading-5'>Model Information</p>
          <StandardTextInputField
            placeholder='Enter model name'
            className='ModelAdditionForm-Field'
            name='name'
            onChange={(name, value) => HandleModelAdditionInputChange(name, value)}/>
          <StandardDropDown
            placeholder='Select type'
            className='ModelAdditionForm-Field ModelAdditionForm-MarginField'
            name='type'
            options={[]}
            onChange={(name, value) => HandleModelAdditionInputChange(name, value)}/>
        </div>
        <p className='paragraph-1 EquipmentAdditionForm-Instructions'>
            Please provide the details of the model.
        </p>
      </div>
    </div>
  )
};

// Define PropTypes for the form component
ModelAdditionForm.propTypes = {
  className: PropTypes.string,
  modelAdditionInformation: PropTypes.any.isRequired,
  setModelAdditionInformation: PropTypes.func.isRequired,
};

// Define default props for the component
ModelAdditionForm.defaultProps = {
  className: '',
};

// Exports the ModelAdditionForm component as the default export for the ModelAdditionForm module.
export default ModelAdditionForm;
