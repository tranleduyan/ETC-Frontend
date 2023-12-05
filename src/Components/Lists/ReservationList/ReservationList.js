// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import ReservationCard from '../../Cards/ReservationCard/ReservationCard';

// Import Stylings
import './ReservationList.css';

// Import Icons

// Render Reservation List
function ReservationList(props) {

  const { className } = props;

  return (
    <div className={`${className} ReservationList-Container`}>
      <ReservationCard />
    </div>
  )
}

ReservationList.propTypes = {
  className: PropTypes.string,
}

ReservationList.defaultProps = {
  className: '',
}

export default ReservationList;
