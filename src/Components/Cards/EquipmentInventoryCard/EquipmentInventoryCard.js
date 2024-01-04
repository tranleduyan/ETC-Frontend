// Import Components
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './EquipmentInventoryCard.css';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

// Define Equipment Inventory Card
function EquipmentInventoryCard(props) {

  const { className, modelPhoto, typeId, typeName, serialNumber, maintenanceStatus, isSelected } = props;

  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  return (
    <div className={`EquipmentInventoryCard-Container ${className}`}>
      <div className='EquipmentInventoryCard-ModelPhoto'>
        {equipmentModelPhoto && (
          <img src={modelPhoto}
               alt='Equipment Model'
               onError={() => setEquipmentModelPhoto(null)}/>
        )}
        {!equipmentModelPhoto && (<FontAwesomeIcon 
          icon={faScrewdriverWrench} 
          className='EquipmentInventoryCard-DefaultModelIcon'/>
        )}
      </div>
      <div className='EquipmentInventoryCard-InformationContainer'>
        <p className='heading-5'>{typeName}</p>
        <div className='EquipmentInventoryCard-Information'>
          <p className='paragraph-3'>{serialNumber}</p>
          <p className='paragraph-3'>{maintenanceStatus}</p>
        </div>
      </div>
      <div className='EquipmentInventoryCard-SelectionContainer'>
        <IconButton
          icon={MdCheckBoxOutlineBlank}
          className='EquipmentInventoryCard-SelectButton'
          onClick={()=>{}}/>
      </div>
    </div>
  )
};

// Define PropTypes for the component
EquipmentInventoryCard.propTypes = {
  className: PropTypes.string,
  modelPhoto: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
  typeName: PropTypes.string.isRequired,
  serialNumber: PropTypes.string.isRequired,
  maintenanceStatus: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

// Define the defaultProps for the component
EquipmentInventoryCard.defaultProps = {
  className: '',
  isSelected: false,
};

// Exports the EquipmentInventoryCard component as the default export for the EquipmentInventoryCard module.
export default EquipmentInventoryCard;
