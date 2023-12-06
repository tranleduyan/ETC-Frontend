// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './EquipmentTypeSummaryCard.css'

// Import Icons
import { HiArchive } from 'react-icons/hi';

// Render Equipment Type Summary Card
function EquipmentTypeSummaryCard(props) {

  const { className, typeID, typeName, inventoryAmount, reservationAmount, isSelected, OnEquipmentTypeSummaryCardClick } = props;

  const itemText = inventoryAmount > 1 ? 'items' : 'item';

  const OnCardClick = () => {
    if(OnEquipmentTypeSummaryCardClick) {
      OnEquipmentTypeSummaryCardClick(typeID);
    }    
  }

  return (
    <button 
      className={`${className} EquipmentTypeSummaryCard-Container ${isSelected ?  'EquipmentTypeSummaryCard-Active' : ''}`}
      onClick={OnCardClick}>
        <div className='EquipmentTypeSummaryCard-InformationContainer'>
            <HiArchive className='EquipmentTypeSummaryCard-Icon'/>
            <div className='EquipmentTypeSummaryCard-Information'>
                <p className='heading-5 EquipmentTypeSummaryCard-TypeName'>{typeName}</p>
                <p className='paragraph-1'>{inventoryAmount} {itemText}</p>
            </div>
        </div>
        <p className='paragraph-1'>Reserved: {reservationAmount}</p>
    </button>
  )
}

EquipmentTypeSummaryCard.propTypes = {
  className: PropTypes.string,
  typeID: PropTypes.number.isRequired,
  typeName: PropTypes.string,
  inventoryAmount: PropTypes.number,
  reservationAmount: PropTypes.number,
  isSelected: PropTypes.bool,
  OnEquipmentTypeSummaryCardClick: PropTypes.func,
}

EquipmentTypeSummaryCard.defaultProps = {
  className: '',
  typeName: 'Unknown',
  inventoryAmount: 0,
  reservationAmount: 0,
  isSelected: false,
  OnEquipmentTypeSummaryCardClick: null,
}

export default EquipmentTypeSummaryCard;
