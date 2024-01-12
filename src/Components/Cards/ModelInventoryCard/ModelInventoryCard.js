//#region Import Necessary Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import UI Components
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './ModelInventoryCard.css';

//#region Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
//#endregion

// Define ModelInventoryCard Component
function ModelInventoryCard(props) {

  // Extract necessary props
  const { className, modelId, modelPhoto, modelName, typeName, equipmentAmount, isSelected, onSelect } = props;

  // State to handle equipment model photo loading errors
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  // Text for item count display
  const itemText = equipmentAmount > 1 ? 'items' : 'item';

  // HandleOnSelect - Handler for model selection
  const HandleOnSelect = () => {
    onSelect(modelId);
  };

  return (
    <div className={`ModelInventoryCard-Container ${isSelected ? 'ModelInventoryCard-Active' : ''} ${className}`}>
      <div className='ModelInventoryCard-ModelPhoto'>
        {/* Display Model Photo */}
        {equipmentModelPhoto && (
          <img src={equipmentModelPhoto}
               alt='Model of a Type' 
               onError={() => setEquipmentModelPhoto(null)}/>
        )}
        {/* Display Default Model Icon */}
        {!equipmentModelPhoto && (
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className='ModelInventoryCard-DefaultModelIcon'/>
        )}
      </div>
      {/* Model Information Section */}
      <div className='ModelInventoryCard-InformationContainer'>
        <p className='heading-5'>{modelName}</p>
        <div className='ModelInventoryCard-Information'>
          <p className='paragraph-3'>{typeName}</p>
          <p className='paragraph-3'>{equipmentAmount} {itemText}</p>
        </div>
      </div>
      {/* Model Selection Button */}
      <div className='ModelInventoryCard-SelectionContainer'>
        <IconButton
          icon={!isSelected ? MdCheckBoxOutlineBlank : MdCheckBox}
          className={`ModelInventoryCard-SelectButton${isSelected ? 'Active' : ''}`}
          onClick={HandleOnSelect}/>
      </div>
    </div>
  )
};

// Define PropTypes for the component
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

// Define DefaultProps for the component
ModelInventoryCard.defaultProps = {
  className: '',
  isSelected: false,
  onSelect: () => {},
};

// Exports the ModelInventoryCard component as the default export for the ModelInventoryCard module.
export default ModelInventoryCard;
