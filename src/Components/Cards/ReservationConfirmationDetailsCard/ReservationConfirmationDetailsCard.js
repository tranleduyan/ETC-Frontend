//#region Import Neccessary Dependencies
import React, { useState } from 'react';
//#endregion

// Import Stylings
import './ReservationConfirmationDetailsCard.css';

//#region Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
//#endregion

function ReservationConfirmationDetailsCard(props) {

  const { className, modelName, modelPhoto, typeName, availableCount, quantity } = props;

  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  const itemText = availableCount > 1 ? 'items' : 'item';

  return (
    <div className={`ReservationConfirmationDetailsCard-GeneralContainer ${className}`}>
      <div className='ReservationConfirmationDetailsCard-Container'>
        <div className='ReservationConfirmationDetailsCard-ModelPhoto'>
          {equipmentModelPhoto && (
            <img src={modelPhoto}
              alt='Equipment Model'
              onError={() => setEquipmentModelPhoto(null)}/>
          )}
          {!equipmentModelPhoto && (
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              className='ReservationConfirmationDetailsCard-DefaultModelIcon'/>
          )}
        </div>
        <div className='ReservationConfirmationDetailsCard-InformationContainer'>
          <p className='heading-5'>{modelName}</p>
          <div className='ReservationConfirmationDetailsCard-Information'>
            <p className='paragraph-3'>{typeName}</p>
            <p className='paragraph-3'>Available: {availableCount} {itemText}</p>
          </div>
        </div>
        <div className='ReservationConfirmationDetailsCard-SelectionContainer'></div>
      </div>
      <div className='ReservationConfirmationDetailsCard-QuantityContainer'>
        <p className='paragraph-1'>Quantity: {quantity}</p>
      </div>
    </div>
  )
}

export default ReservationConfirmationDetailsCard