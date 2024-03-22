//#region Import Neccessary Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './ReservationConfirmationDetailsCard.css';

//#region Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
//#endregion

function ReservationConfirmationDetailsCard(props) {

  // Destructuring props
  const { className, modelName, modelPhoto, typeName, availableCount, quantity } = props;

  // State to handle model photo
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState(modelPhoto);

  // Singular or plural text based on available count
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

// Define PropTypes for ReservationConfirmationDetailsCard component
ReservationConfirmationDetailsCard.propTypes = {
  className: PropTypes.string,
  modelName: PropTypes.string.isRequired,
  modelPhoto: PropTypes.any.isRequired,
  typeName: PropTypes.string.isRequired,
  availableCount: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

// Define defaultProps for ReservationConfirmationDetailsCard
ReservationConfirmationDetailsCard.defaultProps = {
  className: '',
};

export default ReservationConfirmationDetailsCard;
