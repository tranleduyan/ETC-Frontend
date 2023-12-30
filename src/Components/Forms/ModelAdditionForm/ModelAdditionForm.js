// Import Components
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API } from '../../../Constants';
import StandardTextInputField from '../../InputFields/StandardTextInputField/StandardTextInputField';
import StandardDropDown from '../../DropDowns/StandardDropDown/StandardDropDown';

// Import Stylings
import './ModelAdditionForm.css';

// Import Icons 
import { HiPhotograph } from 'react-icons/hi';
import EquipmentAdditionForm from '../EquipmentAdditionForm/EquipmentAdditionForm';

// Define ModelAdditionForm Component
function ModelAdditionForm(props) {

  const { className, modelAdditionInformation, setModelAdditionInformation } = props;
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState([]);

  const modelPhotoRef = useRef(null);

  const HandleModelAdditionInputChange = (propertyName, selectedValue) => {
    setModelAdditionInformation({...modelAdditionInformation, [propertyName]: selectedValue})
  }

  const HandleImageClick = (event) => {
    modelPhotoRef.current.click();
  };

  const HandleImageChange = (event) => {
    HandleModelAdditionInputChange('photo', event.target.files[0]);
  }

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
      setEquipmentTypeOptions(options);
    })
    .catch(error => {
      setEquipmentTypeOptions([]);
    });
  }, []);

  return (
    <div className={`ModelAdditionForm-Container ${className}`}>
      <div className='ModelAdditionForm-VisualContainer'>
        {!modelAdditionInformation.photo && (
          <button className='ModelAdditionForm-PromptContainer' onClick={HandleImageClick}>
            <HiPhotograph className='ModelAdditionForm-PromptIcon'/>
            <p className='paragraph-1 ModelAdditionForm-Prompt'>Upload the model photo here.</p>            
            <input
              type="file"
              ref={modelPhotoRef}
              accept="image/*"  // Specify accepted file types (images in this case)
              style={{ display: 'none' }}  // Hide the input visually
              onChange={HandleImageChange}
            />
          </button>
        )}
        {modelAdditionInformation.photo && (
          <button className='ModelAdditionForm-TypeModelPhoto' onClick={HandleImageClick}>
            <img src={URL.createObjectURL(modelAdditionInformation.photo)}  
                 alt='Equipment Model' />
            <input
              type='file'
              ref={modelPhotoRef}
              accept='image/png, image/jpeg, image/jpg'  // Specify accepted file types (images in this case)
              style={{ display: 'none' }}  // Hide the input visually
              onChange={HandleImageChange}/>
          </button>
        )}
      </div>
      <div className='ModelAdditionForm-FormContainer'>
        <div className='ModelAdditionForm-ModelInformationGroup'>
          <p className='heading-5'>Model Information</p>
          <StandardTextInputField
            placeholder='Enter model name'
            className='ModelAdditionForm-Field'
            name='name'
            value={modelAdditionInformation.name}
            onChange={(name, value) => HandleModelAdditionInputChange(name, value)}/>
          <StandardDropDown
            placeholder='Select type'
            className='ModelAdditionForm-Field ModelAdditionForm-MarginField'
            name='type'
            options={equipmentTypeOptions}
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
