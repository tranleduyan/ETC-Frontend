//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './EquipmentTypeSummaryCard.css'

// Import Icons
import { HiArchive } from 'react-icons/hi';

// Define Equipment Type Summary Card component
function EquipmentTypeSummaryCard(props) {

  // Destructure props to extract relevant information
  // eslint-disable-next-line
  const { className, typeID, typeName, inventoryAmount, reservationAmount, isSelected, OnEquipmentTypeSummaryCardClick } = props;

  // Determine whether to use 'item' or 'items' based on the inventory amount
  const itemText = inventoryAmount > 1 ? 'items' : 'item';

  // Function triggered when the card is clicked
  const OnCardClick = () => {
    if(OnEquipmentTypeSummaryCardClick) {
      // For future use, TODO: implement reserved equipment and rfid
      //OnEquipmentTypeSummaryCardClick(typeID);
      return;
    }    
    return;
  };

  return (
    <button 
      className={`${className} EquipmentTypeSummaryCard-Container ${isSelected ?  
                                                                                /* For Future use, TODO: implementing reserved equipment turn this on */
                                                                                /* 'EquipmentTypeSummaryCard-Active' */
                                                                               '' : ''}`}
      onClick={(OnCardClick)}>
        {/* Container for equipment type information */}
        <div className='EquipmentTypeSummaryCard-InformationContainer'>
            {/* Icon representing equipment type */}
            <HiArchive className='EquipmentTypeSummaryCard-Icon'/>
            {/* Information about the equipment type */}
            <div className='EquipmentTypeSummaryCard-Information'>
                <p className='heading-5 EquipmentTypeSummaryCard-TypeName'>{typeName}</p>
                <p className='paragraph-1'>{inventoryAmount} {itemText}</p>
            </div>
        </div>
        {/* Display the number of reserved items */}
        <p className='paragraph-1'>Reserved: {reservationAmount}</p>
    </button>
  )
};

// Define PropTypes for type-checking and documentation
EquipmentTypeSummaryCard.propTypes = {
  className: PropTypes.string,
  typeID: PropTypes.number.isRequired,
  typeName: PropTypes.string,
  inventoryAmount: PropTypes.number,
  reservationAmount: PropTypes.number,
  isSelected: PropTypes.bool,
  OnEquipmentTypeSummaryCardClick: PropTypes.func,
};

// Set default values for props to avoid potential issues if not provided
EquipmentTypeSummaryCard.defaultProps = {
  className: '',
  typeName: 'Unknown',
  inventoryAmount: 0,
  reservationAmount: 0,
  isSelected: false,
  OnEquipmentTypeSummaryCardClick: null,
};

// Exports the EquipmentTypeSummaryCard component as the default export for the EquipmentTypeSummaryCard module.
export default EquipmentTypeSummaryCard;
