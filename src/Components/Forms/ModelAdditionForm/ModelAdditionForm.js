//#region Import Components
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API } from '../../../Constants';
//#endregion

//#region Import UI Components
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';
import StandardDropDown from '../../DropDowns/StandardDropDown/StandardDropDown';
import Message from '../../Message/Message';
//#endregion

// Import Stylings
import './ModelAdditionForm.css';

// Import Icons 
import { HiPhotograph, HiExclamationCircle } from 'react-icons/hi';

// Define ModelAdditionForm Component
function ModelAdditionForm(props) {

  // Extract relevant information
  const { className, equipmentTypeOptions, modelAdditionInformation, setModelAdditionInformation, isError, errorMessage } = props;

  // Ref hooks to the file input
  const modelPhotoRef = useRef(null);

  // HandleModelAdditionInputChange - Update the information of the modelAdditionInformation new value to the propertyName.
  const HandleModelAdditionInputChange = (propertyName, selectedValue) => {
    setModelAdditionInformation({...modelAdditionInformation, [propertyName]: selectedValue})
  }

  // Handle Image Click - Opens the file input dialog when the user clicks on the displayed image.
  const HandleImageClick = (event) => {
    modelPhotoRef.current.click();
  };

  // Handle Image Change - Updates the model photo in the state when a new image is selected.
  const HandleImageChange = (event) => {
    HandleModelAdditionInputChange('photo', event.target.files[0]);
  }

  return (
    <div className={`ModelAdditionForm-Container ${className}`}>
      {/* Visual/Media Container */}
      <div className='ModelAdditionForm-VisualContainer'>
        {/* If the photo is not uploaded, show prompt */}
        {!modelAdditionInformation.photo && (
          <button className='ModelAdditionForm-PromptContainer' onClick={HandleImageClick}>
            <HiPhotograph className='ModelAdditionForm-PromptIcon'/>
            <p className='paragraph-1 ModelAdditionForm-Prompt'>Upload the model photo here.</p>            
            <input
              type='file'
              ref={modelPhotoRef}
              accept='image/*'
              style={{ display: 'none' }}
              onChange={HandleImageChange}
            />
          </button>
        )}
        {/* If the photo is uploaded, show the photo (preview) */}
        {modelAdditionInformation.photo && (
          <button className='ModelAdditionForm-TypeModelPhoto' onClick={HandleImageClick}>
            <img src={URL.createObjectURL(modelAdditionInformation.photo)}  
                 alt='Equipment Model' />
            <input
              type='file'
              ref={modelPhotoRef}
              accept='image/*'
              style={{ display: 'none' }} 
              onChange={HandleImageChange}/>
          </button>
        )}
      </div>
      {/* Form Container */}
      <div className='ModelAdditionForm-FormContainer'>
        {/* Model Information Group */}
        <div className='ModelAdditionForm-ModelInformationGroup'>
          {/* Group Header */}
          <p className='heading-5'>Model Information</p>
          {/* Model Name Input Field */}
          <StandardTextInputField
            placeholder='Enter model name'
            className='ModelAdditionForm-Field'
            name='name'
            value={modelAdditionInformation.name}
            onChange={(name, value) => HandleModelAdditionInputChange(name, value)}/>
          {/* Model Type DropDown */}
          <StandardDropDown
            placeholder='Select type'
            className='ModelAdditionForm-Field ModelAdditionForm-MarginField'
            name='type'
            value={modelAdditionInformation.type}
            options={equipmentTypeOptions}
            onChange={(name, value) => HandleModelAdditionInputChange(name, value)}/>
        </div>
        {/* Instructions/Messages */}
        {!isError && (
          <p className='paragraph-1 ModelAdditionForm-Instructions'>
              Please provide the details of the model.
          </p>
        )}
        {/* Error Message */}
        <Message 
            icon={HiExclamationCircle} 
            message={errorMessage} 
            className='ModelAdditionForm-ErrorMessageContainer' 
            visibility={isError}/>
      </div>
    </div>
  )
};

// Define PropTypes for the form component
ModelAdditionForm.propTypes = {
  className: PropTypes.string,
  modelAdditionInformation: PropTypes.any.isRequired,
  setModelAdditionInformation: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  equipmentTypeOptions: PropTypes.array.isRequired,
};

// Define default props for the component
ModelAdditionForm.defaultProps = {
  className: '',
  isError: false,
  errorMessage: '',
};

// Exports the ModelAdditionForm component as the default export for the ModelAdditionForm module.
export default ModelAdditionForm;
