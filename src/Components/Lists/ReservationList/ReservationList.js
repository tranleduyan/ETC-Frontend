//#region Import Necessary Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AllReservationsResponse } from '../../../ResponseBody';
import { MESSAGE } from '../../../Constants';
//#endregion

// Import Stylings
import './ReservationList.css';

// Import UI Components
import ReservationCard from '../../Cards/ReservationCard/ReservationCard';

// Define Reservation List Commponent
function ReservationList(props) {

  // Destructure props to extract relevant information
  const { className, reservations, filterMode, filterStatus, OnReservationCardClick, selectedReservation } = props;

  // State to hold the sorted reservations
  const [sortedReservations, setSortedReservations] = useState([]);

  // Function to sort and filter reservations based on filterMode and filterStatus
  const sortReservations = (reservations) => {
    if (reservations?.length === 0) {
      return;
    }
    const today = new Date();
    let filteredReservations = reservations;

    // Filter reservations based on filterMode
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

    // Filter reservations based on filterStatus
    if(filterStatus === 'Approved' || filterStatus === 'Requested') {
      filteredReservations = filteredReservations.filter(
        (reservation) => reservation.status === filterStatus
      );
    }

    // Sort the filtered reservations by start date
    const sorted = filteredReservations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return sorted;
  };

  // useEffect to update sortedReservations when filterMode or filterStatus changes
  useEffect(() => {
    setSortedReservations(sortReservations(reservations));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations, filterMode, filterStatus]);

  return (
    <div className={`${reservations?.length > 0 ? 'ReservationList-Container' : 'ReservationList-Message'} ${className}`}>
      {/* Render ReservationCard components for each reservation */}
      {reservations?.length > 0 
        ? 
        reservations.map((reservation) => (
          <ReservationCard 
            key={reservation.reservationId}
            reservationID={reservation.reservationId}
            renterName={reservation.renterName}
            startDate={reservation.startDate}
            endDate={reservation.endDate}
            status={reservation.status}
            reserveAmount={reservation.totalItems}
            details={reservation.items}
            isSelected={selectedReservation === reservation.reservationId}
            OnReservationCardClick={OnReservationCardClick}/>
      ))
       :
         <p className='paragraph-1'>{MESSAGE.emptyReservation}</p>
      }
    </div>
  )
};

// Define PropTypes for type-checking and documentation
ReservationList.propTypes = {
  className: PropTypes.string,
  filterMode: PropTypes.oneOf(['all', 'past', 'upcoming']),
  filterStatus: PropTypes.oneOf(['Approved', 'Requested']),
  selectedReservation: PropTypes.number,
  OnReservationCardClick: PropTypes.func,
};

// Set default values for props to avoid potential issues if not provided
ReservationList.defaultProps = {
  className: '',
  filterMode: 'all',
  filterStatus: 'Approved',
  selectedReservation: null,
  OnReservationCardClick: null,
};

// Exports the ReservationList component as the default export for the ReservationList module.
export default ReservationList;
