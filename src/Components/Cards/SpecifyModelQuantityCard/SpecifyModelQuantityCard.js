//#region Import Neccessary Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './SpecifyModelQuantityCard.css';

//#region Import UI Components
import IconButton from '../../Buttons/IconButton/IconButton';
//#endregion

//#region Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
//#endregion

function SpecifyModelQuantityCard(props) {

  // Destructure props
  const { className, modelId, modelName, modelPhoto, typeName, availableCount, quantity, onIncreaseQuantity, onDecreaseQuantity } = props;

  // State to handle model photo
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  // Singular or plural text based on available count
  const itemText = availableCount > 1 ? 'items' : 'item';

  // Event handler for increasing quantity
  const HandleIncreaseQuantity = () => {
    onIncreaseQuantity(modelId);
  }

  // Event handler for decreasing quantity
  const HandleDecreaseQuantity = () => {
    onDecreaseQuantity(modelId);
  }

  return (
    <div className={`SpecifyModelQuantityCard-GeneralContainer  ${className}`}>
      <div className='SpecifyModelQuantityCard-Container'>
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
 
// Define propTypes for SpecifyModelQuantityCard
SpecifyModelQuantityCard.propTypes = {
  className: PropTypes.string,
  modelId: PropTypes.number.isRequired,
  modelName: PropTypes.string.isRequired,
  modelPhoto: PropTypes.any,
  typeName: PropTypes.string.isRequired,
  availableCount: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onIncreaseQuantity: PropTypes.func.isRequired,
  onDecreaseQuantity: PropTypes.func.isRequired
};

// Define defaultProps for SpecifyModelQuantityCard
SpecifyModelQuantityCard.defaultProps = {
  className: '',
  modelPhoto: null,
};

// Exports the SpecifyModelQuantityCard component as the default export for the SpecifyModelQuantityCard module.
export default SpecifyModelQuantityCard;
