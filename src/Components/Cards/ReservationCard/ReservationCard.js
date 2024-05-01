//#region Import Neccessary Dependencies
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//#endregion

// Import Stylings
import "./ReservationCard.css";

// Import Icon
import { HiClock } from "react-icons/hi";

// Define the reservation card Component
function ReservationCard(props) {
  // Destructure props to extract relevant information
  const {
    className,
    reservationID,
    startDate,
    endDate,
    renterName,
    reserveAmount,
    isSelected,
    OnReservationCardClick,
    details,
    status,
    renterSchoolId,
    userRole,
  } = props;

  // Determine whether to use 'item' or 'items' based on the reservation amount
  const itemText = reserveAmount > 1 ? "items" : "item";

  // Function triggered when the card is clicked
  const OnCardClick = () => {
    // Check if the click handler is provided before invoking it
    if (OnReservationCardClick) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      OnReservationCardClick({
        reservationID,
        formattedStartDate,
        formattedEndDate,
        renterName,
        reserveAmount,
        details,
        status,
        renterSchoolId,
      });
    }
  };

  // Define a utility function to format date to mm/dd/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <button
      className={`${className} ReservationCard-Container ${
        isSelected ? "ReservationCard-Active" : ""
      }`}
      onClick={OnCardClick}
    >
      {/* Clock icon representing a reservation */}
      <HiClock className="ReservationCard-Icon" />
      {/* Container for reservation information */}
      <div className="ReservationCard-InformationContainer">
        {/* Display reservation date range */}
        <p className="heading-5 ReservationCard-ReserveDate">
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
        {/* Container for renter name and reservation amount */}
        <div className="ReservationCard-Information">
          {(userRole === "Admin" || userRole === "Faculty") && (
            <>
              <p className="paragraph-3 ReservationCard-RenterName">
                {renterName}
              </p>
              <p className="paragraph-3">:&nbsp;</p>
            </>
          )}
          {userRole === "Student" && (
            <p className="paragraph-3">Quantity:&nbsp;</p>
          )}
          {/* Display the reservation amount and item text */}
          <p className="paragraph-3 ReservationCard-ReserveAmount">
            {reserveAmount} {itemText}
          </p>
        </div>
      </div>
    </button>
  );
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
  details: PropTypes.array,
  status: PropTypes.string.isRequired,
  renterSchoolId: PropTypes.string,
  userRole: PropTypes.string,
};

// Set default values for props to avoid potential issues if not provided
ReservationCard.defaultProps = {
  className: "",
  renterName: "Unknown User",
  startDate: "01/01/2000",
  endDate: "01/01/2000",
  reserveAmount: 0,
  isSelected: true,
  OnReservationCardClick: null,
  details: [],
  renterSchoolId: "",
  userRole: "",
};

// Map the userRole from Redux store to props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
});

// Exports the ReservationCard component as the default export for the ReservationCard module.
export default connect(mapStateToProps)(ReservationCard);
