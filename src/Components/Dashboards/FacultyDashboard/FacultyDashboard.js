//#region Import Necessary Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API } from '../../../Constants';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetUserData } from '../../../storage';
//#endregion

// Import Stylings
import './FacultyDashboard.css';

//#region Import UI Components
import GeneralPage from '../../../Pages/GeneralPage/GeneralPage';
import Logo from '../../Logo/Logo';
import IconButton from '../../Buttons/IconButton/IconButton';
import StandardButton from '../../Buttons/StandardButton';
import EquipmentFilterCardList from '../../Lists/EquipmentFilterCardList/EquipmentFilterCardList';
import FilterButton from '../../Buttons/FilterButton/FilterButton';
import ReservationList from '../../Lists/ReservationList/ReservationList';
import DetailSection from '../../Sections/DetailSection/DetailSection';
import IconModal from '../../Modals/IconModal/IconModal';
//#endregion

// Import Icons
import { HiLogout, HiCalendar, HiX, HiMinusCircle, HiCheck, HiExclamationCircle, HiRefresh } from 'react-icons/hi';

// Define FacultyDashboard Component
function FacultyDashboard(props) {

  const { resetUserData, schoolId } = props;
  
  const navigate = useNavigate();

  // State for handle mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(window.innerWidth >= 480);

  // State for reservations filter status and equipment filter
  const [reservationsFilterStatus, setReservationsFilterStatus] = useState('Approved');
  const [selectedEquipmentFilter, setSelectedEquipmentFilter] = useState(null);

  // State for selected reservation
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedReservationDetails, setSelectedReservationDetails] = useState([]);

  const [isMyReservation, setIsMyReservation] = useState(false);

  // State variable for icon modal
  const [iconModal, setIconModal] = useState({
    message: '',
    visibility: false,
    icon: HiExclamationCircle,
    isIconSpin: false,
  });

  // UpdateMobileView
  // Set the isMobileView if window.innerWidth is smaller than 480 or not
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

  const OnEquipmentFilterCardClick = (selectedEquipmentFilter) => {
    // set selected reservation to null
    setSelectedReservation(null);

    // Toggle the selected equipment filter
    setSelectedEquipmentFilter((prevSelectedEquipmentFilter) => 
      prevSelectedEquipmentFilter === selectedEquipmentFilter ? null : selectedEquipmentFilter
    );
  };

  // Function Triggered when reservation status filter button is clicked
  const OnReservationStatusFilterButtonClick = (status) => {
    setReservationsFilterStatus(status);
    setSelectedReservation(null);
  };

  // OnReservationCardClick
  // Handle to set selectedreservation
  const OnReservationCardClick = async(selectedReservation) => {
    // Set selected equipment filter to null
    setSelectedEquipmentFilter(null);
    
    // Toggle the selected reservations, await until finish setSelectedReservation then continue.
    await Promise.resolve(setSelectedReservation((prevSelectedReservation) => 
      prevSelectedReservation === selectedReservation.reservationID ? null : selectedReservation.reservationID
    ));

    setSelectedReservationDetails(selectedReservation);
  };

  // Handle when "Reject" button is clicked for a reservation
  const OnRejectReservationClick = () => {
    console.log("Reject Reservation");
  };

  // Handle when "Approve" button is clicked for a reservation
  const OnApproveReservationClick = () => {
    console.log("Approve Reservation");
  };

  const FetchApprovedReservations = () => {
    setIconModal({
      message: 'Looking for approved reservations...',
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .get(`${API.domain}/api/user/${schoolId}/approved-reservation`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
          setReservations(response.data.responseObject);
        }, 500);
      })
      .catch(() => {
        setIconModal({
          message: 'There is an error occurred. Please try again.',
          icon: HiExclamationCircle,
          visibility: true,
          isIconSpin: false,
        });       
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
          setReservations([]);
        }, 1500);
      });
  };

  const FetchRequestedReservations = () => {
    setIconModal({
      message: 'Looking for requested reservations...',
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .get(`${API.domain}/api/user/${schoolId}/requested-reservation`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
          setReservations(response.data.responseObject);
        }, 500);
      })
      .catch(() => {
        setIconModal({
          message: 'There is an error occurred. Please try again.',
          icon: HiExclamationCircle,
          visibility: true,
          isIconSpin: false,
        });       
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
          setReservations([]);
        }, 1500);
      });
  };
  
  // OnCancelReservationClick - TODO: Implement Cancel Reservation API
  const OnCancelReservationClick = () => {
    console.log('Cancel Reservation');
  };

  // Navigate to Make Reservation Page.
  const OnMakeReservationClick = () => {
    navigate('/Reservations');
  };

  // Sign Out - Reset the data.
  const SignOut = () => {
    //Dispatch the resetUserData action
    resetUserData();
    navigate('/');
  };

  // Close the detail section
  const CloseDetailSection = () => {
    setSelectedEquipmentFilter(null);
    setSelectedReservation(null);
  };

  //#region side effects
  useEffect(() => {
    // Add event listener for window resize to update mobile view
    window.addEventListener('resize', UpdateMobileView);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('resize', UpdateMobileView);
    }
  }, [UpdateMobileView]);

  useEffect(() => {
    // If in mobile view, hide right panel when no selection, show when there's a selection
    if(isMobileView) {
      if(!selectedEquipmentFilter && !selectedReservation) {
        setIsRightPanelVisible(false);
      }
      else if (selectedEquipmentFilter || selectedReservation) {
        setIsRightPanelVisible(true);
      }
    }
  }, [selectedEquipmentFilter, selectedReservation, isMobileView]);

  useEffect(() => {
    if(reservationsFilterStatus === 'Approved') {
      FetchApprovedReservations();
    }
    else if(reservationsFilterStatus === 'Requested') {
      FetchRequestedReservations();
    }
    // eslint-disable-next-line
  }, [reservationsFilterStatus]);

  useEffect(() => {
    if(selectedReservationDetails?.renterSchoolId === schoolId) {
      setIsMyReservation(true);
    }
    else {
      setIsMyReservation(false);
    }
    // eslint-disable-next-line
  }, [selectedReservationDetails]);
  //#endregion

  return (
    <GeneralPage>
      <IconModal 
        className='AdminDashboard-IconModalContainer'
        icon={iconModal.icon}
        iconClassName='AdminDashboard-IconModalIcon'
        message={iconModal.message}
        isVisible={iconModal.visibility}
        isSpinning={iconModal.isIconSpin}/>
      <div className='FacultyDashboard-PageContentContainer'>
        {/* Page Header - Faculty Dashboard */}
        <div className='FacultyDashboard-PageHeaderContainer'>
          <div className='FacultyDashboard-PageHeader'>
            <Logo className='FacultyDashboard-LogoContainer'/>
            <p className='heading-2'>Dashboard</p>
          </div>
          <div className='FacultyDashboard-ActionContainer'>
            {/* Sign Out Button */}
            <IconButton
              icon={HiLogout}
              className='FacultyDashboard-ActionButton'
              onClick={SignOut}/>
          </div>
        </div>
        {/* Page Content */}
        <div className='FacultyDashboard-ContentContainer'>
          {/* Left Content Panel */}
          <div className={`FacultyDashboard-LeftContentPanel ${isMobileView && isRightPanelVisible ? 'FacultyDashboard-Hide' : ''}`}>
            {/* Equipment Filter Section TODO: Hide for now*/}
            <div className='FacultyDashboard-EquipmentFilterSection FacultyDashboard-Hide'>
              {/* Section Header */}
              <div className='FacultyDashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Equipment</p>
                {/* Make Reservation Button for Mobile */}
                <StandardButton
                  title='Make Reservation'
                  onClick={OnMakeReservationClick}
                  className='FacultyDashboard-MobileMakeReservationButton'
                  icon={HiCalendar}/>
              </div>
              {/* Equipment Filters */}
              <EquipmentFilterCardList 
                className='FacultyDashboard-EquipmentFilterCardList'
                selectedEquipmentFilter={selectedEquipmentFilter}
                OnEquipmentFilterCardClick={OnEquipmentFilterCardClick}/>
            </div>
            {/* Reservation Section */}
            <div className='FacultyDashboard-ReservationSection'>
              {/* Section Header */}
              <div className='FacultyDashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Reservations</p>
                {/* Filters */}
                <div className='FacultyDashboard-ReservationFilterContainer'>
                  <FilterButton
                    title='Approved'
                    isActive={reservationsFilterStatus === 'Approved'}
                    onClick={() => OnReservationStatusFilterButtonClick('Approved')}/>
                  <FilterButton
                    title='Requested'
                    isActive={reservationsFilterStatus === 'Requested'}
                    onClick={() => OnReservationStatusFilterButtonClick('Requested')}/>
                </div>
              </div>
              {/* Reservation List */}
              <ReservationList 
                className='FacultyDashboard-ReservationList'
                filterMode='upcoming'
                filterStatus={reservationsFilterStatus}
                selectedReservation={selectedReservation}
                reservations={reservations}
                OnReservationCardClick={OnReservationCardClick}/>
            </div>
          </div>
          {/* Right Content Panel */}
          <div className={`FacultyDashboard-RightContentPanel${isMobileView && isRightPanelVisible ? 'Active' : ''}`}>
            <div className='FacultyDashboard-RightContent'>
              {!isMobileView && selectedEquipmentFilter === null && selectedReservation === null && (
                <StandardButton
                  title='Make Reservation'
                  onClick={OnMakeReservationClick}
                  className='FacultyDashboard-MakeReservationButton'
                  icon={HiCalendar}/>
              )}
              {
                selectedEquipmentFilter === 'Currently Using' && (
                  <DetailSection 
                    className='FacultyDashboard-CurrentlyUsingSection'
                    title='Currently Using'
                    additionalInformation={'MM/DD/YYYY'}
                    equipmentDetails={[]}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}
                    isMargin={true}/>
                )
              }
              {
                selectedEquipmentFilter === 'Recently Used' && (
                  <DetailSection
                    className='FacultyDashboard-RecentlyUsedSection'
                    title='Recently Used'
                    additionalInformation={'MM/DD/YYYY - MM/DD/YYYY'}
                    equipmentDetails={[]}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}
                    isMargin={true}/>
                )
              }
              {
                selectedReservation && (
                  <>
                    <DetailSection
                      className='FacultyDashboard-ReservationDetailSection'
                      title='Reservation Details'
                      additionalInformation={`${selectedReservationDetails?.formattedStartDate} - ${selectedReservationDetails?.formattedEndDate}`}
                      equipmentDetails={selectedReservationDetails?.details}
                      actionIcon={(isMobileView) ? HiX : null}
                      action={CloseDetailSection}
                      detailsType='reservation'/>
                    {reservationsFilterStatus === 'Requested' && (
                      <div className='FacultyDashboard-ReservationActionContainer'>
                          <StandardButton
                            title={"Approve"}
                            onClick={OnApproveReservationClick}
                            className='FacultyDashboard-ReservationActionButton'
                            icon={HiCheck}/>
                          <StandardButton
                            title={"Reject"}
                            onClick={OnRejectReservationClick}
                            className='FacultyDashboard-ReservationActionButton'
                            icon={HiX}/>
                      </div>
                    )}
                    {reservationsFilterStatus === 'Approved' && (isMyReservation) && (
                      <div className='FacultyDashboard-ReservationActionContainer'>
                        <StandardButton
                          title={"Cancel"}
                          onClick={OnCancelReservationClick}
                          className='FacultyDashboard-ReservationActionButton'
                          icon={HiMinusCircle}/>
                      </div>
                    )}
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </GeneralPage>
    
  )
};

// Define PropTypes for type-checking and documentation
FacultyDashboard.propTypes = {
  resetUserData: PropTypes.func.isRequired,
  schoolId: PropTypes.string,
};

// Define defaultProps for the component
FacultyDashboard.defaultProps = {
  schoolId: '',
};

const mapStateToProps = (state) => ({
  schoolId: state.user.userData?.schoolId,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Connect the component to Redux, mapping state and actions to props
export default connect(mapStateToProps, mapDispatchToProps)(FacultyDashboard);
