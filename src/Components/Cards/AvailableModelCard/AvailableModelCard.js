import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import IconButton from '../../Buttons/IconButton/IconButton';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import './AvailableModelCard.css';

function AvailableModelCard(props) {

  const { className, modelId, modelName, modelPhoto, typeName, availableCount, isSelected, onSelect, isMakingReservation } = props;

  const [equipmentModelPhoto, setequipmentModelPhoto] = useState(modelPhoto);

  const itemText = availableCount > 1 ? 'items' : 'item';

  const HandleOnSelect = () => {
    onSelect(modelId);
  };

  return (
    <div className={`AvailableModelCard-Container ${isSelected ? 'AvailableModelCard-Active' : ''} ${className}`}>
      <button className='AvailableModelCard-ModelPhoto'
        onClick={isMakingReservation ? HandleOnSelect : undefined}>
          {equipmentModelPhoto && (
            <img src={modelPhoto}
                alt='Equipment Model'
                onError={() => setequipmentModelPhoto(null)}/>
          )}
          {!equipmentModelPhoto && (
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              className='AvailableModelCard-DefaultModelIcon'/>
          )}
      </button>
      <button className='AvailableModelCard-InformationContainer' 
        onClick={isMakingReservation ? HandleOnSelect : undefined}>
          <p className='heading-5'>{modelName}</p>
          <div className='AvailableModelCard-Information'>
            <p className='paragraph-3'>{typeName}</p>
            <p className='paragraph-3'>Available: {availableCount} {itemText}</p>
          </div>
        </button>
      <div className='AvailableModelCard-SelectionContainer'>
        {isMakingReservation && (
          <IconButton
          icon={!isSelected ? MdCheckBoxOutlineBlank : MdCheckBox}
          className={`AvailableModelCard-SelectButton${isSelected ? 'Active' : ''}`}
          onClick={HandleOnSelect}/>
        )}
      </div>
    </div>
  )
};

export default AvailableModelCard;
