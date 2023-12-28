// Import Components
import React, { useState } from 'react';
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';
import StandardDropDown from '../../DropDowns/StandardDropDown/StandardDropDown';
import { HiPhotograph } from 'react-icons/hi';
import { OPTIONS } from '../../../Constants';

// Import Stylings
import './EquipmentAdditionForm.css';

// Define EquipmentAdditionForm Component
function EquipmentAdditionForm(props) {

  const { equipmentAdditionInformation, setEquipmentAdditionInformation } = props;

  const HandleEquipmentAdditionInputChange = (propertyName, selectedValue) => {
    setEquipmentAdditionInformation({...equipmentAdditionInformation, [propertyName]: selectedValue})
  };
  
  return (
    <div className='EquipmentAdditionForm-Container'>
      <div className='EquipmentAdditionForm-VisualContainer'>
        <div className='EquipmentAdditionForm-PromptContainer'>
          <HiPhotograph className='EquipmentAdditionForm-PromptIcon'/>
          <p className='paragraph-1 EquipmentAdditionForm-Prompt'>Please select type and model</p>
        </div>
      </div>
      <div className='EquipmentAdditionForm-FormContainer'>
        <div className='EquipmentAdditionForm-EquipmentInformationGroup'>        
          <p className='heading-5'>Equipment Information</p>
          <StandardTextInputField
            placeholder='Enter equipment serial number'
            name='serialNumber'
            onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            <StandardDropDown
              placeholder='Select type'
              className='EquipmentAdditionForm-Field'
              name='type'
              options={[]}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardDropDown
              placeholder='Select model'
              className='EquipmentAdditionForm-Field'
              name='model'
              options={[]}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        <div className='EquipmentAdditionForm-EquipmentStatusGroup'>
          <p className='heading-5'>Status</p>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            <StandardDropDown
              placeholder='Select maintenance status'
              className='EquipmentAdditionForm-Field'
              name='maintenanceStatus'
              options={OPTIONS.equipment.maintenanceStatus}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardDropDown
              placeholder='Select reservation status'
              className='EquipmentAdditionForm-Field'
              name='reservationStatus'
              options={OPTIONS.equipment.reservationStatus}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        <div className='EquipmentAdditionForm-EquipmentLocationGroup'>
          <p className='heading-5'>Location</p>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            <StandardTextInputField 
              placeholder='Enter RFID tag'
              className='EquipmentAdditionForm-Field'
              name='rfidTag'
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardDropDown
              placeholder='Select home location'
              className='EquipmentAdditionForm-Field'
              name='homeLocation'
              options={[]}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        <div className='EquipmentAdditionForm-EquipmentAcquisitionInformationGroup'>
          <p className='heading-5'>Acquisition Information</p>
          <StandardDropDown
            placeholder='Select condition'
            className='EquipmentAdditionForm-Field'
            name='condition'
            options={OPTIONS.equipment.conditions}
            onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            <StandardTextInputField
              placeholder='Enter purchase cost (U.S. dollar)'
              className='EquipmentAdditionForm-Field'
              name='purchaseCost'
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardTextInputField
              placeholder='Enter purchase date'
              className='EquipmentAdditionForm-Field'
              name='purchaseDate'
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          </div>
        </div>
        <p className='paragraph-1 EquipmentAdditionForm-Instructions'>
          Please provide the details of the equipment.
        </p>
      </div>
    </div>
  )
};

// Exports the EquipmentAdditionForm component as the default export for the EquipmentAdditionForm module.
export default EquipmentAdditionForm;
