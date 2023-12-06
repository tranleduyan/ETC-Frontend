// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import ReservationCard from '../../Cards/ReservationCard/ReservationCard';

// Import Stylings
import './ReservationList.css';

// Import Icons

// Render Reservation List
function ReservationList(props) {

  const { className, OnReservationCardClick, selectedReservation } = props;

  return (
    <div className={`${className} ReservationList-Container`}>
      <ReservationCard 
        renterName='Kim Yoo'
        isSelected={selectedReservation === 'Kim Yoo'}
        OnReservationCardClick={OnReservationCardClick}/>
      <ReservationCard 
        renterName='Michale Yoo'
        isSelected={selectedReservation === 'Michale Yoo'}
        OnReservationCardClick={OnReservationCardClick}/>
    </div>
  )
}

ReservationList.propTypes = {
  className: PropTypes.string,
  selectedReservation: PropTypes.string,
  OnReservationCardClick: PropTypes.func,
}

ReservationList.defaultProps = {
  className: '',
  selectedReservation: '',
  OnReservationCardClick: null,
}

export default ReservationList;
