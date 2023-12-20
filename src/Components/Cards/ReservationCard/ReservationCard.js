// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './ReservationCard.css'

// Import Icon
import { HiClock } from 'react-icons/hi';

// Define the reservation card Component
function ReservationCard(props) {

  // Destructure props to extract relevant information
  const { className, reservationID, startDate, endDate, renterName, reserveAmount, isSelected, OnReservationCardClick } = props;

  // Determine whether to use 'item' or 'items' based on the reservation amount
  const itemText = reserveAmount > 1 ? 'items' : 'item';

  // Function triggered when the card is clicked
  const OnCardClick = () => {
    // Check if the click handler is provided before invoking it
    if(OnReservationCardClick) {
      OnReservationCardClick(reservationID);
    }
  };

  return (
    <button 
      className={`${className} ReservationCard-Container ${isSelected ? 'ReservationCard-Active' : ''}`}
      onClick={OnCardClick}>
      {/* Clock icon representing a reservation */}
      <HiClock className='ReservationCard-Icon'/>
      {/* Container for reservation information */}
      <div className='ReservationCard-InformationContainer'>
        {/* Display reservation date range */}
        <p className='heading-5 ReservationCard-ReserveDate'>{startDate} - {endDate}</p>
        {/* Container for renter name and reservation amount */}
        <div className='ReservationCard-Information'>
          {/* Renter's name */}
          <p className='paragraph-3 ReservationCard-RenterName'>{renterName}</p>
          {/* Colon separator */}
          <p className='paragraph-3'>:&nbsp;</p>
          {/* Display the reservation amount and item text */}
          <p className='paragraph-3 ReservationCard-ReserveAmount'>{reserveAmount} {itemText}</p>
        </div>
      </div>
    </button>
  )
}

// Define PropTypes for type-checking and documentation
ReservationCard.propTypes = {
  className: PropTypes.string,
  reservationID: PropTypes.number.isRequired,
  renterName: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  reserveAmount: PropTypes.number,
  isSelected: PropTypes.bool,
  OnReservationCardClick: PropTypes.func,
}

// Set default values for props to avoid potential issues if not provided
ReservationCard.defaultProps = {
  className: '',
  renterName: 'Unknown User',
  startDate: '01/01/2000',
  endDate: '01/01/2000',
  reserveAmount: 0,
  isSelected: true,
  OnReservationCardClick: null,
}

export default ReservationCard;
