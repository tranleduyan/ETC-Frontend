// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './TypeInventoryCard.css';

// Import Icons
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { HiArchive } from 'react-icons/hi';

// Define TypeInventoryCard Component
function TypeInventoryCard(props) {

  const { className, typeId, typeName, modelAmount, equipmentAmount, isSelected, onSelect } = props;

  const modelText = modelAmount > 1 ? 'models' : 'model';

  const itemText = equipmentAmount > 1 ? 'items' : 'item';

  const HandleOnSelect = () => {
    onSelect(typeId);
  };

  return (
    <div className={`TypeInventoryCard-Container ${isSelected ? 'TypeInventoryCard-Active' : ''}${className}`}>
      <div className='TypeInventoryCard-IconContainer'>
        <HiArchive className='TypeInventoryCard-Icon'/>
      </div>
      <div className='TypeInventoryCard-InformationContainer'>
        <p className='heading-5'>{typeName}</p>
        <div className='TypeInventoryCard-Information'>
          <p className='paragraph-3'>{modelAmount} {modelText}</p>
          <p className='paragraph-3'>{equipmentAmount} {itemText}</p>
        </div>
      </div>
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
