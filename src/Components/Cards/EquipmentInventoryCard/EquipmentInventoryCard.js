//#region Import Necessary Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import UI Components
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './EquipmentInventoryCard.css';

//#region Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
//#endregion

// Define Equipment Inventory Card
function EquipmentInventoryCard(props) {

  const { className, modelPhoto, typeName, serialId, maintenanceStatus, isSelected, onSelect, onClick } = props;

  // State to handle equipment model photo loading errors
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  // HandleOnSelect - Handler for model selection
  const HandleOnSelect = () => {
    onSelect(serialId);
  };

  return (
    <div className={`EquipmentInventoryCard-Container ${isSelected ? 'EquipmentInventoryCard-Active' : ''} ${className}`}
         onClick={onClick}>
      <div className='EquipmentInventoryCard-ModelPhoto'>
        {/* Display Equipment Model Photo */}
        {equipmentModelPhoto && (
          <img src={modelPhoto}
               alt='Equipment Model'
               onError={() => setEquipmentModelPhoto(null)}/>
        )}
        {/* Display Default Equipment Model Icon */}
        {!equipmentModelPhoto && (
          <FontAwesomeIcon 
            icon={faScrewdriverWrench} 
            className='EquipmentInventoryCard-DefaultModelIcon'/>
        )}
      </div>
      {/* Equipment Information Section */}
      <div className='EquipmentInventoryCard-InformationContainer'>
        <p className='heading-5'>{typeName}</p>
        <div className='EquipmentInventoryCard-Information'>
          <p className='paragraph-3'>{serialId}</p>
          <p className='paragraph-3'>{maintenanceStatus}</p>
        </div>
      </div>
      {/* Equipment Selection Button */}
      <div className='EquipmentInventoryCard-SelectionContainer'>
        <IconButton
          icon={!isSelected ? MdCheckBoxOutlineBlank : MdCheckBox}
          className={`EquipmentInventoryCard-SelectButton${isSelected ? 'Active' : ''}`}
          onClick={HandleOnSelect}/>
      </div>
    </div>
  )
};

// Define PropTypes for the component
EquipmentInventoryCard.propTypes = {
  className: PropTypes.string,
  modelPhoto: PropTypes.string.isRequired,
  typeName: PropTypes.string.isRequired,
  serialId: PropTypes.string.isRequired,
  maintenanceStatus: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
};

// Define the defaultProps for the component
EquipmentInventoryCard.defaultProps = {
  className: '',
  isSelected: false,
  onSelect: () => {},
  onClick: () => {},
};

// Exports the EquipmentInventoryCard component as the default export for the EquipmentInventoryCard module.
export default EquipmentInventoryCard;
