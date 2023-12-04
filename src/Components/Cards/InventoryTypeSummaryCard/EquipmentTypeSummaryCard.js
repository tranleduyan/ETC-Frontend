// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './EquipmentTypeSummaryCard.css'

// Import Icons
import { HiArchive } from 'react-icons/hi';

function EquipmentTypeSummaryCard(props) {

  const { className, typeName, inventoryAmount, reservationAmount} = props;

  const itemText = inventoryAmount > 1 ? 'items' : 'item';

  // TODO: inventoryAmount and reservationAmount maybe will be calculated with in this component.
  return (
    <div className={`${className} EquipmentTypeSummaryCard-Container`}>
        <div className='EquipmentTypeSummaryCard-InformationContainer'>
            <HiArchive className='EquipmentTypeSummaryCard-Icon'/>
            <div className='EquipmentTypeSummaryCard-Information'>
                <p className='heading-5 EquipmentTypeSummaryCard-TypeName'>{typeName}</p>
                <p className='paragraph-1'>{inventoryAmount} {itemText}</p>
            </div>
        </div>
        <p className='paragraph-1'>Reserved: {reservationAmount}</p>
    </div>
  )
}

EquipmentTypeSummaryCard.propTypes = {
  className: PropTypes.string,
  typeName: PropTypes.string,
  inventoryAmount: PropTypes.number,
  reservationAmount: PropTypes.number,
}

EquipmentTypeSummaryCard.defaultProps = {
  className: '',
  typeName: 'Unknown',
  inventoryAmount: 0,
  reservationAmount: 0,
}

export default EquipmentTypeSummaryCard;
