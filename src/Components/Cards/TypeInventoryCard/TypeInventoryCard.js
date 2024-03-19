//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './TypeInventoryCard.css';

// Import UI Components
import IconButton from '../../Buttons/IconButton/IconButton';

//#region Import Icons
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { HiArchive } from 'react-icons/hi';
//#endregion

// Define TypeInventoryCard Component
function TypeInventoryCard(props) {

  // Extract necessary props
  const { className, typeId, typeName, modelAmount, equipmentAmount, isSelected, onSelect } = props;

  // Text for model count display
  const modelText = modelAmount > 1 ? 'models' : 'model';

  // Text for item count display
  const itemText = equipmentAmount > 1 ? 'items' : 'item';

  // HandleOnSelect - Handler for type selections
  const HandleOnSelect = () => {
    onSelect(typeId);
  };

  return (
    <div className={`TypeInventoryCard-Container ${isSelected ? 'TypeInventoryCard-Active' : ''}${className}`}>
      {/* Type Icon */}
      <div className='TypeInventoryCard-IconContainer'>
        <HiArchive className='TypeInventoryCard-Icon'/>
      </div>
      {/* Type Information Section */}
      <div className='TypeInventoryCard-InformationContainer'>
        <p className='heading-5'>{typeName}</p>
        <div className='TypeInventoryCard-Information'>
          <p className='paragraph-3'>{modelAmount} {modelText}</p>
          <p className='paragraph-3'>{equipmentAmount} {itemText}</p>
        </div>
      </div>
      {/* Type Selection Button */}
      <div className='TypeInventoryCard-SelectionContainer'>
        <IconButton 
          icon={!isSelected ? MdCheckBoxOutlineBlank :  MdCheckBox}
          className={`TypeInventoryCard-SelectButton${isSelected ? 'Active' : ''}`}
          onClick={HandleOnSelect}/>
      </div>
    </div>
  )
};

// Define propTypes for TypeInventoryCard
TypeInventoryCard.propTypes = {
  className: PropTypes.string,
  typeId: PropTypes.number.isRequired,
  typeName: PropTypes.string.isRequired,
  modelAmount: PropTypes.number.isRequired,
  equipmentAmount: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};

// Define defaultProps for TypeInventoryCard
TypeInventoryCard.defaultProps = {
  className: '',
  isSelected: false,
  onSelect: () => {},
};

// Exports the TypeInventoryCard component as the default export for the TypeInventoryCard module.
export default TypeInventoryCard;
