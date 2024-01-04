// Import Components
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './ModelInventoryCard.css';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

// Define ModelInventoryCard Component
function ModelInventoryCard(props) {

  const { className, modelId, modelPhoto, modelName, typeName, equipmentAmount, isSelected } = props;

  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  const itemText = equipmentAmount > 1 ? 'items' : 'item';

  return (
    <div className={`ModelInventoryCard-Container ${className}`}>
      <div className='ModelInventoryCard-ModelPhoto'>
        {equipmentModelPhoto && (
          <img src={modelPhoto}
               alt='Model of a Type'
               onError={() => setEquipmentModelPhoto(null)}/>
        )}
        {!equipmentModelPhoto && (
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className='ModelInventoryCard-DefaultModelIcon'/>
        )}
      </div>
      <div className='ModelInventoryCard-InformationContainer'>
        <p className='heading-5'>{modelName}</p>
        <div className='ModelInventoryCard-Information'>
          <p className='paragraph-3'>{typeName}</p>
          <p className='paragraph-3'>{equipmentAmount} {itemText}</p>
        </div>
      </div>
      <div className='ModelInventoryCard-SelectionContainer'>
        <IconButton
          icon={MdCheckBoxOutlineBlank}
          className='ModelInventoryCard-SelectButton'
          onClick={() => {}}/>
      </div>
    </div>
  )
};

ModelInventoryCard.propTypes = {
  className: PropTypes.string,
  modelId: PropTypes.number.isRequired,
  modelPhoto: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  typeName: PropTypes.string.isRequired,
  equipmentAmount: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
};

ModelInventoryCard.defaultProps = {
  className: '',
  isSelected: false,
};

// Exports the ModelInventoryCard component as the default export for the ModelInventoryCard module.
export default ModelInventoryCard;
