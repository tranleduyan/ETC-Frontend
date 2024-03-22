//#region Import Neccessary Dependencies
import React, { useState } from 'react';
//#endregion

// Import Stylings
import './SpecifyModelQuantityCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../Buttons/IconButton/IconButton';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

//#region Import Icons

//#endregion

function SpecifyModelQuantityCard(props) {

  const { className, modelId, modelName, modelPhoto, typeName, availableCount, quantity, onIncreaseQuantity, onDecreaseQuantity } = props;

  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  const itemText = availableCount > 1 ? 'items' : 'item';

  const HandleIncreaseQuantity = () => {
    onIncreaseQuantity(modelId);
  }

  const HandleDecreaseQuantity = () => {
    onDecreaseQuantity(modelId);
  }

  return (
    <div className='SpecifyModelQuantityCard-GeneralContainer'>
      <div className={`SpecifyModelQuantityCard-Container ${className}`}>
        <div className='SpecifyModelQuantityCard-ModelPhoto'>
          {equipmentModelPhoto && (
            <img src={modelPhoto}
              alt='Equipment Model'
              onError={() => setEquipmentModelPhoto(null)}/>
          )}
          {!equipmentModelPhoto && (
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              className='SpecifyModelQuantityCard-DefaultModelIcon'/>
          )}
        </div>
        <div className='SpecifyModelQuantityCard-InformationContainer'>
          <p className='heading-5'>{modelName}</p>
          <div className='SpecifyModelQuantityCard-Information'>
            <p className='paragraph-3'>{typeName}</p>
            <p className='paragraph-3'>Available: {availableCount} {itemText}</p>
          </div>
        </div>
        <div className='SpecifyModelQuantityCard-SelectionContainer'></div>
      </div>
      <div className='SpecifyModelQuantityCard-QuantityContainer'>
        <p className='paragraph-1'>{quantity}</p>
        <div className='SpecifyModelQuantityCard-ActionContainer'>
            <IconButton className='SpecifyModelQuantityCard-QuantityUpdateButton'
              onClick={HandleIncreaseQuantity}
              icon={HiPlusSm}/>
            <IconButton className='SpecifyModelQuantityCard-QuantityUpdateButton'
              onClick={HandleDecreaseQuantity}
              icon={HiMinusSm}/>
        </div>
      </div>
    </div>
  )
};

export default SpecifyModelQuantityCard;
