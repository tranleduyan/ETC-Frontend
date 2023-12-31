// Import Components
import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API, OPTIONS } from '../../../Constants';
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';
import StandardDropDown from '../../DropDowns/StandardDropDown/StandardDropDown';
import Message from '../../Message/Message';

// Import Stylings
import './EquipmentAdditionForm.css';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { HiPhotograph, HiExclamationCircle } from 'react-icons/hi';

// Define EquipmentAdditionForm Component
function EquipmentAdditionForm(props) {

  // Extract relevant information
  const { className, equipmentAdditionInformation, setEquipmentAdditionInformation, isError, errorMessage } = props;

  // Contains all the equipment models information
  const [equipmentModels, setEquipmentModels] = useState([]);

  // Options for equipment types dropdowns
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState([]);
  
  // Options for equipment models dropdowns
  const [equipmentModelOptions, setEquipmentModelOptions] = useState([]);

  // Photo of the equipment model
  const [equipmentTypeModelPhoto, setEquipmentTypeModelPhoto] = useState(null);

  // HandleEquipmentAdditionInputChange - Update the information of equipmentAdditionInformation with the new value to the propertyName
  const HandleEquipmentAdditionInputChange = (propertyName, value) => {
    setEquipmentAdditionInformation({...equipmentAdditionInformation, [propertyName]: value})
  };

  // #region Side Effects
  // Fetch all the equipment types upon the component mounting
  useEffect(() => {
    // HTTP get request to fetch all the type
    axios.get(`${API.domain}/api/inventory/types`, {
      headers: {
        'X-API-KEY': API.key,
      }
    })
    .then(response => {
      // Map value and label
      const options = response.data.responseObject.map(type => ({
        value: type.typeId,
        label: type.typeName,
      }));

      // Set the options
      setEquipmentTypeOptions(options);
    })
    .catch(error => {
      // Type not found, reset type options and models, model options as well as the model photo
      setEquipmentTypeOptions([]);
      setEquipmentModels([]);
      setEquipmentModelOptions([]);
      setEquipmentTypeModelPhoto(null);
    });
  }, []);

  // Fetch all the equipment models of a selected type.
  useEffect(() => {
    // If the equipment type is selected, fetch all the equipment models of a selected type
    if(equipmentAdditionInformation.type != null) {
      // HTTP get request to fetch all the models of a selected type.
      axios.get(`${API.domain}/api/inventory/types/${equipmentAdditionInformation.type.value}/models`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        // Map value and label
        const options = response.data.responseObject?.map(model => ({
          value: model.modelId,
          label: model.modelName,
        }));
        
        // Set the equipmentModels to the response object - Array of all models of a type
        setEquipmentModels(response.data.responseObject);
        
        // Set the equipmentModelOptions to options
        setEquipmentModelOptions(options);
      })
      .catch(error => {
        // If not found, reset to empty equipment models and options
        if(error.response.status === 404) {
          setEquipmentModels([]);
          setEquipmentModelOptions([]);
        }
      });
    }
    
    // Reset the model information and model photo whenever the type is changed/updated
    HandleEquipmentAdditionInputChange('model', null);
    setEquipmentTypeModelPhoto(null);
    // eslint-disable-next-line
  }, [equipmentAdditionInformation.type]);

  // Set the model photo when there is type and model selected.
  useEffect(() => {
    // If the type and model and equipment models is not null or has value, find the selected model and if it exists, set the model photo.
    if(equipmentAdditionInformation.type && equipmentAdditionInformation.model && equipmentModels) {
      const selectedModel = equipmentModels.find(
        (model) => model.modelId === equipmentAdditionInformation.model.value
      );
      
      // if selectedModel found, set the photo
      if (selectedModel) {
        setEquipmentTypeModelPhoto(selectedModel.modelPhoto);
      }

      // else, set the photo to null
      else {
        setEquipmentTypeModelPhoto(null);
      }
    }
  }, [equipmentAdditionInformation.type, equipmentAdditionInformation.model, equipmentModels]);
  // #endregion
  
  return (
    <div className={`EquipmentAdditionForm-Container ${className}`}>
      {/* Visual/Media Container */}
      <div className='EquipmentAdditionForm-VisualContainer'>
        {/* If there is type and model selected and model photo, show the photo */}
        {equipmentAdditionInformation.type && equipmentAdditionInformation.model && equipmentTypeModelPhoto && (
          <div className='EquipmentAdditionForm-TypeModelPhoto'>
            {/* Model Photo */}
            <img src={equipmentTypeModelPhoto} 
                 alt='Equipment Model' 
                 onError={() => setEquipmentTypeModelPhoto(null)} />
          </div>
        )}
        {/* If there is type and model selected but not model photo, means photo is not uploaded or empty, show the default equipment visual icon */}
        {equipmentAdditionInformation.type && equipmentAdditionInformation.model && !equipmentTypeModelPhoto && (
          <div className='EquipmentAdditionForm-DefaultModelPhotoContainer'>
            <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentAdditionForm-DefaultModelIcon'/>
        </div>
        )}
        {/* If there is not type or model, prompt to select. */}
        {(!equipmentAdditionInformation.type || !equipmentAdditionInformation.model) && (
          <div className='EquipmentAdditionForm-PromptContainer'>
            <HiPhotograph className='EquipmentAdditionForm-PromptIcon'/>
            <p className='paragraph-1 EquipmentAdditionForm-Prompt'>Please select type and model.</p>
          </div>
        )}       
      </div>
      {/* Form Container */}
      <div className='EquipmentAdditionForm-FormContainer'>
        {/* Equipment Information Group */}
        <div className='EquipmentAdditionForm-EquipmentInformationGroup'>   
          {/* Group Header */}     
          <p className='heading-5'>Equipment Information</p>
          {/* Serial Number Input Field */}
          <StandardTextInputField
            placeholder='Enter equipment serial number'
            name='serialNumber'
            value={equipmentAdditionInformation.serialNumber}
            onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            {/* Type DropDown */}
            <StandardDropDown
              placeholder='Select type'
              className='EquipmentAdditionForm-Field'
              name='type'
              options={equipmentTypeOptions}
              value={equipmentAdditionInformation.type}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            {/* Model DropDown */}
            <StandardDropDown
              placeholder='Select model'
              className='EquipmentAdditionForm-Field'
              name='model'
              value={equipmentAdditionInformation.model}
              options={equipmentModelOptions}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        {/* Equipment Status Group */}
        <div className='EquipmentAdditionForm-EquipmentStatusGroup'>
          {/* Group Header */}
          <p className='heading-5'>Status</p>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            {/* Maintenance Status DropDown */}
            <StandardDropDown
              placeholder='Select maintenance status'
              className='EquipmentAdditionForm-Field'
              name='maintenanceStatus'
              options={OPTIONS.equipment.maintenanceStatus}
              value={equipmentAdditionInformation.maintenanceStatus}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            {/* Reservation Status DropDown */}
            <StandardDropDown
              placeholder='Select reservation status'
              className='EquipmentAdditionForm-Field'
              name='reservationStatus'
              options={OPTIONS.equipment.reservationStatus}
              value={equipmentAdditionInformation.reservationStatus}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        {/* Equipment Location Group */}
        <div className='EquipmentAdditionForm-EquipmentLocationGroup'>
          {/* Group Header */}
          <p className='heading-5'>Location</p>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            {/* RFID Tag Input Field */}
            <StandardTextInputField 
              placeholder='Enter RFID tag'
              className='EquipmentAdditionForm-Field'
              name='rfidTag'
              value={equipmentAdditionInformation.rfidTag}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            {/* Home Location DropDown */}
            <StandardDropDown
              placeholder='Select home location'
              className='EquipmentAdditionForm-Field'
              name='homeLocation'
              options={[]}
              value={equipmentAdditionInformation.homeLocation}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        {/* Equipment Acquisition Information Group */}
        <div className='EquipmentAdditionForm-EquipmentAcquisitionInformationGroup'>
          {/* Group Header */}
          <p className='heading-5'>Acquisition Information</p>
          {/* Condition DropDown */}
          <StandardDropDown
            placeholder='Select condition'
            className='EquipmentAdditionForm-Field'
            name='condition'
            options={OPTIONS.equipment.conditions}
            value={equipmentAdditionInformation.condition}
            onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            {/* Purchase Cost Input Field */}
            <StandardTextInputField
              placeholder='Enter purchase cost (U.S. dollar)'
              className='EquipmentAdditionForm-Field'
              name='purchaseCost'
              value={equipmentAdditionInformation.purchaseCost}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            {/* TODO: PurchaseDate Date Select */}
            <StandardTextInputField
              placeholder='Enter purchase date'
              className='EquipmentAdditionForm-Field EquipmentAdditionForm-MarginField'
              name='purchaseDate'
              value={equipmentAdditionInformation.purchaseDate}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        {/* Instructions/Messages */}
        {!isError && (
          <p className='paragraph-1 EquipmentAdditionForm-Instructions'>
            Please provide the details of the equipment.
          </p>
        )}
        {/* Error Message */}
        <Message 
            icon={HiExclamationCircle} 
            message={errorMessage} 
            className='EquipmentAdditionForm-ErrorMessageContainer' 
            visibility={isError}/>
      </div>
    </div>
  )
};

// Define PropTypes for the Form component
EquipmentAdditionForm.propTypes = {
  className: PropTypes.string,
  equipmentAdditionInformation: PropTypes.any.isRequired,
  setEquipmentAdditionInformation: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

// Define Default Props for the component
EquipmentAdditionForm.defaultProps = {
  className: '',
  isError: false,
  errorMessage: '',
};

// Exports the EquipmentAdditionForm component as the default export for the EquipmentAdditionForm module.
export default EquipmentAdditionForm;
