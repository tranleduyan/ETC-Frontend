//#region Import Necessary Dependencies
import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import { OPTIONS } from '../../../Constants';
//#endregion

//#region Import UI Components
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';
import StandardDropDown from '../../DropDowns/StandardDropDown/StandardDropDown';
import Message from '../../Message/Message';
import DatePickerInputField from '../../InputFields/DatePickerInputField/DatePickerInputField';
//#endregion

// Import Stylings
import './EquipmentForm.css';

//#region Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { HiPhotograph, HiExclamationCircle } from 'react-icons/hi';
//#endregion

// Define EquipmentForm Component
function EquipmentForm(props) {

  // Extract relevant information
  const { className, equipmentModels, equipmentModelOptions, equipmentTypeOptions, equipmentInformation, setEquipmentInformation, isError, errorMessage,
          disableSerialNumber, disableReservationStatus} = props;

  // Photo of the equipment model
  const [equipmentTypeModelPhoto, setEquipmentTypeModelPhoto] = useState(null);

  // HandleEquipmentInputChange - Update the information of equipmentInformation with the new value to the propertyName
  const HandleEquipmentInputChange = (propertyName, value) => {
    setEquipmentInformation({...equipmentInformation, [propertyName]: value})
  };

  // #region Side Effects
  // Set the model photo when there is type and model selected.
  useEffect(() => {
    // If the type and model and equipment models is not null or has value, find the selected model and if it exists, set the model photo.
    if(equipmentInformation.type && equipmentInformation.model && equipmentModels) {
      const selectedModel = equipmentModels.find(
        (model) => model.modelId === equipmentInformation.model.value
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
    
    else {
      setEquipmentTypeModelPhoto(null);
    }
  }, [equipmentInformation.type, equipmentInformation.model, equipmentModels]);
  // #endregion
  
  return (
    <div className={`EquipmentForm-Container ${className}`}>
      {/* Visual/Media Container */}
      <div className='EquipmentForm-VisualContainer'>
        {/* If there is type and model selected and model photo, show the photo */}
        {equipmentInformation.type && equipmentInformation.model && equipmentTypeModelPhoto && (
          <div className='EquipmentForm-TypeModelPhoto'>
            {/* Model Photo */}
            <img src={equipmentTypeModelPhoto} 
                 alt='Equipment Model' 
                 onError={() => setEquipmentTypeModelPhoto(null)} />
          </div>
        )}
        {/* If there is type and model selected but not model photo, means photo is not uploaded or empty, show the default equipment visual icon */}
        {equipmentInformation.type && equipmentInformation.model && !equipmentTypeModelPhoto && (
          <div className='EquipmentForm-DefaultModelPhotoContainer'>
            <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentForm-DefaultModelIcon'/>
        </div>
        )}
        {/* If there is not type or model, prompt to select. */}
        {(!equipmentInformation.type || !equipmentInformation.model) && (
          <div className='EquipmentForm-PromptContainer'>
            <HiPhotograph className='EquipmentForm-PromptIcon'/>
            <p className='paragraph-1 EquipmentForm-Prompt'>Please select type and model.</p>
          </div>
        )}       
      </div>
      {/* Form Container */}
      <div className='EquipmentForm-FormContainer'>
        {/* Equipment Information Group */}
        <div className='EquipmentForm-EquipmentInformationGroup'>   
          {/* Group Header */}     
          <p className='heading-5'>Equipment Information</p>
          {/* Serial Number Input Field */}
          <StandardTextInputField
            placeholder='Enter equipment serial number'
            name='serialNumber'
            value={equipmentInformation.serialNumber}
            onChange={(name, value) => HandleEquipmentInputChange(name, value)}
            disabled={disableSerialNumber}/>
          <div className='EquipmentForm-BinaryFieldGroup'>
            {/* Type DropDown */}
            <StandardDropDown
              placeholder='Select type'
              className='EquipmentForm-Field'
              name='type'
              options={equipmentTypeOptions}
              value={equipmentInformation.type}
              onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
            {/* Model DropDown */}
            <StandardDropDown
              placeholder='Select model'
              className='EquipmentForm-Field'
              name='model'
              value={equipmentInformation.model}
              options={equipmentModelOptions}
              onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
          </div>
        </div>
        {/* Equipment Status Group */}
        <div className='EquipmentForm-EquipmentStatusGroup'>
          {/* Group Header */}
          <p className='heading-5'>Status</p>
          <div className='EquipmentForm-BinaryFieldGroup'>
            {/* Maintenance Status DropDown */}
            <StandardDropDown
              placeholder='Select maintenance status'
              className='EquipmentForm-Field'
              name='maintenanceStatus'
              options={OPTIONS.equipment.maintenanceStatus}
              value={equipmentInformation.maintenanceStatus}
              onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
            {/* Reservation Status DropDown */}
            <StandardDropDown
              placeholder='Select reservation status'
              className='EquipmentForm-Field'
              name='reservationStatus'
              isDisabled={disableReservationStatus}
              options={OPTIONS.equipment.reservationStatus}
              value={equipmentInformation.reservationStatus}
              onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
          </div>
        </div>
        {/* Equipment Location Group */}
        <div className='EquipmentForm-EquipmentLocationGroup'>
          {/* Group Header */}
          <p className='heading-5'>Location</p>
          <div className='EquipmentForm-BinaryFieldGroup'>
            {/* RFID Tag Input Field */}
            <StandardTextInputField 
              placeholder='Enter RFID tag'
              className='EquipmentForm-Field'
              name='rfidTag'
              value={equipmentInformation.rfidTag}
              onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
            {/* Home Location DropDown */}
            <StandardDropDown
              placeholder='Select home location'
              className='EquipmentForm-Field'
              name='homeLocation'
              options={[]}
              value={equipmentInformation.homeLocation}
              onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
          </div>
        </div>
        {/* Equipment Acquisition Information Group */}
        <div className='EquipmentForm-EquipmentAcquisitionInformationGroup'>
          {/* Group Header */}
          <p className='heading-5'>Acquisition Information</p>
          {/* Condition DropDown */}
          <StandardDropDown
            placeholder='Select condition'
            className='EquipmentForm-Field'
            name='condition'
            options={OPTIONS.equipment.conditions}
            value={equipmentInformation.condition}
            onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
          <div className='EquipmentForm-PurchaseGroup'>
            {/* Purchase Cost Input Field */}
            <StandardTextInputField
              placeholder='Enter purchase cost (U.S. dollar)'
              className='EquipmentForm-PurchaseCostField'
              name='purchaseCost'
              type='number'
              value={equipmentInformation.purchaseCost}
              onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
            {/* PurchaseDate Date Select */}
            <DatePickerInputField className='EquipmentForm-Field EquipmentAdditionForm-MarginField'
                                  name='purchaseDate'
                                  placeholder='Select purchase date'
                                  value={equipmentInformation.purchaseDate}
                                  onChange={(name, value) => HandleEquipmentInputChange(name, value)}/>
          </div>
        </div>
        {/* Instructions/Messages */}
        {!isError && (
          <p className='paragraph-1 EquipmentForm-Instructions'>
            Please provide the details of the equipment.
          </p>
        )}
        {/* Error Message */}
        <Message 
            icon={HiExclamationCircle} 
            message={errorMessage} 
            className='EquipmentForm-ErrorMessageContainer' 
            visibility={isError}/>
      </div>
    </div>
  )
};

// Define PropTypes for the Form component
EquipmentForm.propTypes = {
  className: PropTypes.string,
  equipmentInformation: PropTypes.any.isRequired,
  setEquipmentInformation: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  equipmentModels: PropTypes.array.isRequired,
  equipmentModelOptions: PropTypes.array.isRequired,
  equipmentTypeOptions: PropTypes.array.isRequired,
  disableReservationStatus: PropTypes.bool,
  disableSerialNumber: PropTypes.bool,
};

// Define Default Props for the component
EquipmentForm.defaultProps = {
  className: '',
  isError: false,
  errorMessage: '',
  disableReservationStatus: false,
  disableSerialNumber: false,
};

// Exports the EquipmentForm component as the default export for the EquipmentForm module.
export default EquipmentForm;
