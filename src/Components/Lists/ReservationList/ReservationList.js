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

  const { className, filterMode, filterStatus, OnReservationCardClick, selectedReservation } = props;

  const [sortedReservations, setSortedReservations] = useState([]);

  const sortReservations = (reservations) => {
    const today = new Date();
    let filteredReservations = reservations;
    switch(filterMode) {
      case 'upcoming':
        filteredReservations = filteredReservations.filter(
          (reservation) => new Date(reservation.startDate) >= today
        );
        break;
      case 'past':
        filteredReservations = filteredReservations.filter(
          (reservation) => new Date(reservation.startDate) < today
        );
        break;
      default:
        break;
    }

    if(filterStatus === 'Approved' || filterStatus === 'Requested') {
      filteredReservations = filteredReservations.filter(
        (reservation) => reservation.status === filterStatus
      );
    }

    const sorted = filteredReservations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return sorted;
  };

  useEffect(() => {
    setSortedReservations(sortReservations(AllReservationsResponse));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMode, filterStatus]);

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
  filterStatus: PropTypes.oneOf(['Approved', 'Requested']),
  selectedReservation: PropTypes.number,
  OnReservationCardClick: PropTypes.func,
}

ReservationList.defaultProps = {
  className: '',
  filterMode: 'all',
  filterStatus: 'Approved',
  selectedReservation: null,
  OnReservationCardClick: null,
}

export default ReservationList;
