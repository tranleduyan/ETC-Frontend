// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './ReservationCard.css'

// Import Icon
import { HiClock } from 'react-icons/hi';

// Render the reservation card
function ReservationCard(props) {
  
  const { className, reservationID, startDate, endDate, renterName, reserveAmount, status, isSelected, OnReservationCardClick } = props;

  const itemText = reserveAmount > 1 ? 'items' : 'item';

  const OnCardClick = () => {
    if(OnReservationCardClick) {
      OnReservationCardClick(reservationID);
    }
  }

  return (
    <button 
      className={`${className} ReservationCard-Container ${isSelected ? 'ReservationCard-Active' : ''}`}
      onClick={OnCardClick}>
      <HiClock className='ReservationCard-Icon'/>
        <div className='ReservationCard-InformationContainer'>
          <p className='heading-5'>{startDate} - {endDate}</p>
            <div className='ReservationCard-Information'>
              <p className='paragraph-3 ReservationCard-RenterName'>{renterName}</p>
              <p className='paragraph-3'>:&nbsp;</p>
              <p className='paragraph-3 ReservationCard-ReserveAmount'>{reserveAmount} {itemText}</p>
            </div>
        </div>
    </button>
  )
}

ReservationCard.propTypes = {
  className: PropTypes.string,
  reservationID: PropTypes.number.isRequired,
  renterName: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  status: PropTypes.oneOf(['Approved', 'Requested']),
  reserveAmount: PropTypes.number,
  isSelected: PropTypes.bool,
  OnReservationCardClick: PropTypes.func,
}

ReservationCard.defaultProps = {
  className: '',
  renterName: 'Unknown User',
  startDate: '01/01/2000',
  endDate: '01/01/2000',
  status: 'Requested',
  reserveAmount: 0,
  isSelected: true,
  OnReservationCardClick: null,
}

export default ReservationCard;
