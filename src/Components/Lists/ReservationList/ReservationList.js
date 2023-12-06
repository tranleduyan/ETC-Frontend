// Import Components
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReservationCard from '../../Cards/ReservationCard/ReservationCard';
import { AllReservationsResponse } from '../../../ResponseBody';

// Import Stylings
import './ReservationList.css';

// Import Icons

// Render Reservation List
function ReservationList(props) {

  const { className, filterMode, OnReservationCardClick, selectedReservation } = props;

  const [sortedReservations, setSortedReservations] = useState([]);

  const sortReservations = (reservations) => {
    const today = new Date();
    switch(filterMode) {
      case 'upcoming':
        return reservations.filter((reservation) => new Date(reservation.startDate) >= today).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      case 'all':
        return reservations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));  
      case 'past':
        return reservations.filter((reservation) => new Date(reservation.startDate) < today).sort((a, b) => new Date(a.startDate) - new Date(b.startEnd));
      default:
        return reservations;
    }
  };

  useEffect(() => {
    setSortedReservations(sortReservations(AllReservationsResponse));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMode]);

  return (
    <div className={`${className} ReservationList-Container`}>
      {sortedReservations.map((reservation) => (
        <ReservationCard 
          key={reservation.reservationID}
          reservationID={reservation.reservationID}
          renterName={reservation.renterName}
          startDate={reservation.startDate}
          endDate={reservation.endDate}
          status={reservation.status}
          reserveAmount={reservation.reserveAmount}
          isSelected={selectedReservation === reservation.reservationID}
          OnReservationCardClick={OnReservationCardClick}/>
      ))}
    </div>
  )
}

ReservationList.propTypes = {
  className: PropTypes.string,
  filterMode: PropTypes.oneOf(['all', 'past', 'upcoming']),
  selectedReservation: PropTypes.number,
  OnReservationCardClick: PropTypes.func,
}

ReservationList.defaultProps = {
  className: '',
  filterMode: 'all',
  selectedReservation: null,
  OnReservationCardClick: null,
}

export default ReservationList;
