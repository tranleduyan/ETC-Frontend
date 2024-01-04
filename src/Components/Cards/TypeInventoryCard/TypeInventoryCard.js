// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './TypeInventoryCard.css';

// Import Icons
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { HiArchive } from 'react-icons/hi';

// Define TypeInventoryCard Component
function TypeInventoryCard(props) {

  const { className, typeId, typeName, modelAmount, equipmentAmount, isSelected } = props;

  const modelText = modelAmount > 1 ? 'models' : 'model';

  const itemText = equipmentAmount > 1 ? 'items' : 'item';

  return (
    <div className={`TypeInventoryCard-Container ${className}`}>
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
          icon={MdCheckBoxOutlineBlank}
          className='TypeInventoryCard-SelectButton'
          onClick={() => {}}/>
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
};

// Define defaultProps for TypeInventoryCard
TypeInventoryCard.defaultProps = {
  className: '',
  isSelected: false,
};

// Exports the TypeInventoryCard component as the default export for the TypeInventoryCard module.
export default TypeInventoryCard;
