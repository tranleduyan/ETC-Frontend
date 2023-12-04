// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './ReservationCard.css'

// Import Icon
import { HiClock } from 'react-icons/hi';

// Render the reservation card
function ReservationCard(props) {
  
  const { className, startDate, endDate, renterName, reserveAmount} = props;

  const itemText = reserveAmount > 1 ? 'items' : 'item';

  return (
    <div className={`${className} ReservationCard-Container`}>
      <HiClock className='ReservationCard-Icon'/>
        <div className='ReservationCard-InformationContainer'>
          <p className='heading-5'>{startDate} - {endDate}</p>
            <div className='ReservationCard-Information'>
              <p className='paragraph-3 ReservationCard-RenterName'>{renterName}</p>
              <p className='paragraph-3'>:&nbsp;</p>
              <p className='paragraph-3 ReservationCard-ReserveAmount'>{reserveAmount} {itemText}</p>
            </div>
        </div>
    </div>
  )
}

ReservationCard.propTypes = {
  className: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  renterName: PropTypes.string,
  reserveAmount: PropTypes.number,
}

ReservationCard.defaultProps = {
  className: '',
  startDate: '01/01/2000',
  endDate: '01/01/2000',
  renterName: 'Unknown User',
  reserveAmount: 0,
}

export default ReservationCard;
