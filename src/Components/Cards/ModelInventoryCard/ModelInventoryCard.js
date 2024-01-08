// Import Components
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './ModelInventoryCard.css';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

// Define ModelInventoryCard Component
function ModelInventoryCard(props) {

  const { className, modelId, modelPhoto, modelName, typeName, equipmentAmount, isSelected, onSelect } = props;

  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  const itemText = equipmentAmount > 1 ? 'items' : 'item';

  const HandleOnSelect = () => {
    onSelect(modelId);
  };

  return (
    <div className={`ModelInventoryCard-Container ${isSelected ? 'ModelInventoryCard-Active' : ''} ${className}`}>
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
          icon={!isSelected ? MdCheckBoxOutlineBlank : MdCheckBox}
          className={`ModelInventoryCard-SelectButton${isSelected ? 'Active' : ''}`}
          onClick={HandleOnSelect}/>
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
  onSelect: PropTypes.func,
};

ModelInventoryCard.defaultProps = {
  className: '',
  isSelected: false,
  onSelect: () => {},
};

// Exports the ModelInventoryCard component as the default export for the ModelInventoryCard module.
export default ModelInventoryCard;
