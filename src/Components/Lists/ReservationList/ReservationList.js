//#region Import Necessary Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE } from '../../../Constants';
//#endregion

// Import Stylings
import './ReservationList.css';

// Import UI Components
import ReservationCard from '../../Cards/ReservationCard/ReservationCard';

// Define Reservation List Commponent
function ReservationList(props) {

  // Destructure props to extract relevant information
  const { className, reservations, filterMode, filterStatus, OnReservationCardClick, selectedReservation, startDate, endDate } = props;

  // State to hold the sorted reservations
  const [sortedReservations, setSortedReservations] = useState([]);
  const [filter, setFilter] = useState(filterMode);

  // Function to sort and filter reservations based on filterMode and filterStatus
  const sortReservations = (reservations) => {
    if (reservations?.length === 0) {
      return;
    }
    console.log(filter);
    const today = new Date();
    let filteredReservations = reservations;

    // Filter reservations based on filterMode
    switch(filter) {
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
      case 'in-range':
        // Filter reservations based on start date and end date conditions
        filteredReservations = filteredReservations.filter((reservation) => {
          const reservationStartDate = new Date(reservation.startDate);
          const reservationEndDate = new Date(reservation.endDate);

          if (startDate && !endDate) {
            // Show reservations starting from the provided start date
            return reservationStartDate >= startDate;
          } 
          else if (!startDate && endDate) {
            // Show reservations ending until the provided end date
            console.log('i')
            return reservationEndDate <= endDate;
          } 
          else if (startDate && endDate) {
            // Show reservations within the provided date range
            return reservationStartDate >= startDate && reservationEndDate <= endDate;
          } 
          else {
            return true;
          }
        });
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
    if(startDate || endDate) {
       setFilter('in-range');
       console.log('start', startDate);
       console.log('end', endDate);
    }
    else {
      setFilter(filterMode);
    }
    setSortedReservations(sortReservations(reservations));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations, filter, filterMode, filterStatus, startDate, endDate]);

  return (
    <div className={`${sortedReservations?.length > 0 ? 'ReservationList-Container' : 'ReservationList-Message'} ${className}`}>
      {/* Render ReservationCard components for each reservation */}
      {sortedReservations?.length > 0 
        ? 
        sortedReservations.map((reservation) => (
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
  filterMode: PropTypes.oneOf(['all', 'past', 'upcoming', 'in-range']),
  filterStatus: PropTypes.oneOf(['Approved', 'Requested']),
  selectedReservation: PropTypes.number,
  OnReservationCardClick: PropTypes.func,
  reservations: PropTypes.array,
};

// Set default values for props to avoid potential issues if not provided
ReservationList.defaultProps = {
  className: '',
  filterMode: 'all',
  filterStatus: 'Approved',
  selectedReservation: null,
  OnReservationCardClick: null,
  reservation: [],
};

// Exports the ReservationList component as the default export for the ReservationList module.
export default ReservationList;
