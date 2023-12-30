// Import Components
import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API } from '../../../Constants';
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';
import StandardDropDown from '../../DropDowns/StandardDropDown/StandardDropDown';
import { OPTIONS } from '../../../Constants';

// Import Stylings
import './EquipmentAdditionForm.css';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { HiPhotograph } from 'react-icons/hi';

// Define EquipmentAdditionForm Component
function EquipmentAdditionForm(props) {

  const { className, equipmentAdditionInformation, setEquipmentAdditionInformation } = props;

  const [equipmentTypes, setEquipmentTypes] = useState([]);

  const [equipmentModels, setEquipmentModels] = useState([]);

  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState([]);
  
  const [equipmentModelOptions, setEquipmentModelOptions] = useState([]);

  const [equipmentTypeModelPhoto, setEquipmentTypeModelPhoto] = useState(null);

  const HandleEquipmentAdditionInputChange = (propertyName, selectedValue) => {
    console.log(propertyName)
    setEquipmentAdditionInformation({...equipmentAdditionInformation, [propertyName]: selectedValue})
  };
  
  useEffect(() => {
    axios.get(`${API.domain}/api/inventory/types`, {
      headers: {
        'X-API-KEY': API.key,
      }
    })
    .then(response => {
      const options = response.data.responseObject.map(type => ({
        value: type.typeId,
        label: type.typeName,
      }));
      setEquipmentTypes(response.data.responseObject);
      setEquipmentTypeOptions(options);
    })
    .catch(error => {
      setEquipmentTypes([]);
      setEquipmentModels([]);
      setEquipmentTypeOptions([]);
      setEquipmentModelOptions([]);
      setEquipmentTypeModelPhoto(null);
    });
  }, []);

  useEffect(() => {
    console.log(equipmentModels);
    if(equipmentAdditionInformation.type != null) {
      axios.get(`${API.domain}/api/inventory/types/${equipmentAdditionInformation.type.value}/models`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        const options = response.data.responseObject?.map(model => ({
          value: model.modelId,
          label: model.modelName,
        }));
        setEquipmentModels(response.data.responseObject);
        setEquipmentModelOptions(options);
      })
      .catch(error => {
        if(error.response.status === 404) {
          setEquipmentModels([]);
          setEquipmentModelOptions([]);
        }
      });
    }
    HandleEquipmentAdditionInputChange('model', null);
    setEquipmentTypeModelPhoto(null);
  }, [equipmentAdditionInformation.type]);

  useEffect(() => {
    if(equipmentAdditionInformation.type && equipmentAdditionInformation.model && equipmentModels) {
      const selectedModel = equipmentModels.find(
        (model) => model.modelId === equipmentAdditionInformation.model.value
      );

      if (selectedModel) {
        setEquipmentTypeModelPhoto(selectedModel.modelPhoto);
      }
    }
  }, [equipmentAdditionInformation.type, equipmentAdditionInformation.model]);

  useEffect(() => {
    console.log(equipmentTypeModelPhoto);
  }, [equipmentTypeModelPhoto]);
  
  return (
    <div className={`EquipmentAdditionForm-Container ${className}`}>
      <div className='EquipmentAdditionForm-VisualContainer'>
        {equipmentAdditionInformation.type && equipmentAdditionInformation.model && equipmentTypeModelPhoto && (
          <div className='EquipmentAdditionForm-TypeModelPhoto'>
            <img src={equipmentTypeModelPhoto} 
                 alt='Equipment Model' 
                 onError={() => setEquipmentTypeModelPhoto(null)}/>
          </div>
        )}
        {equipmentAdditionInformation.type && equipmentAdditionInformation.model && !equipmentTypeModelPhoto && (
          <div className='EquipmentAdditionForm-PromptContainer'>
            <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentAdditionForm-PromptIcon'/>
        </div>
        )}
        {(!equipmentAdditionInformation.type || !equipmentAdditionInformation.model) && (
          <div className='EquipmentAdditionForm-PromptContainer'>
            <HiPhotograph className='EquipmentAdditionForm-PromptIcon'/>
            <p className='paragraph-1 EquipmentAdditionForm-Prompt'>Please select type and model</p>
          </div>
        )}       
      </div>
      <div className='EquipmentAdditionForm-FormContainer'>
        <div className='EquipmentAdditionForm-EquipmentInformationGroup'>        
          <p className='heading-5'>Equipment Information</p>
          <StandardTextInputField
            placeholder='Enter equipment serial number'
            name='serialNumber'
            value={equipmentAdditionInformation.serialNumber}
            onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            <StandardDropDown
              placeholder='Select type'
              className='EquipmentAdditionForm-Field'
              name='type'
              options={equipmentTypeOptions}
              value={equipmentAdditionInformation.type}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardDropDown
              placeholder='Select model'
              className='EquipmentAdditionForm-Field'
              name='model'
              value={equipmentAdditionInformation.model}
              options={equipmentModelOptions}
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
              value={equipmentAdditionInformation.maintenanceStatus}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardDropDown
              placeholder='Select reservation status'
              className='EquipmentAdditionForm-Field'
              name='reservationStatus'
              options={OPTIONS.equipment.reservationStatus}
              value={equipmentAdditionInformation.reservationStatus}
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
              value={equipmentAdditionInformation.rfidTag}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardDropDown
              placeholder='Select home location'
              className='EquipmentAdditionForm-Field'
              name='homeLocation'
              options={[]}
              value={equipmentAdditionInformation.homeLocation}
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
            value={equipmentAdditionInformation.condition}
            onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
          <div className='EquipmentAdditionForm-BinaryFieldGroup'>
            <StandardTextInputField
              placeholder='Enter purchase cost (U.S. dollar)'
              className='EquipmentAdditionForm-Field'
              name='purchaseCost'
              value={equipmentAdditionInformation.purchaseCost}
              onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
            <StandardTextInputField
              placeholder='Enter purchase date'
              className='EquipmentAdditionForm-Field EquipmentAdditionForm-MarginField'
              name='purchaseDate'
              value={equipmentAdditionInformation.purchaseDate}
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

// Define PropTypes for the Form component
EquipmentAdditionForm.propTypes = {
  className: PropTypes.string,
  equipmentAdditionInformation: PropTypes.any.isRequired,
  setEquipmentAdditionInformation: PropTypes.func.isRequired,
};

// Define Default Props for the component
EquipmentAdditionForm.defaultProps = {
  className: '',
};

// Exports the EquipmentAdditionForm component as the default export for the EquipmentAdditionForm module.
export default EquipmentAdditionForm;
