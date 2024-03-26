//#region Import Necessary Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API } from '../../../Constants';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetUserData } from '../../../storage';
//#endregion

// Import Stylings
import './StudentDashboard.css';

//#region Import UI Components
import GeneralPage from '../../../Pages/GeneralPage/GeneralPage';
import FilterButton from '../../Buttons/FilterButton/FilterButton';
import Logo from '../../Logo/Logo';
import IconButton from '../../Buttons/IconButton/IconButton';
import ReservationList from '../../Lists/ReservationList/ReservationList';
import StandardButton from '../../Buttons/StandardButton';
import DetailSection from '../../Sections/DetailSection/DetailSection';
import EquipmentFilterCardList from '../../Lists/EquipmentFilterCardList/EquipmentFilterCardList';
import IconModal from '../../Modals/IconModal/IconModal';
//#endregion

// Import Icons
import { HiLogout, HiCalendar, HiX, HiPencilAlt, HiMinusCircle, HiExclamationCircle, HiRefresh } from 'react-icons/hi';

// Define Student Dashboard Component;
function StudentDashboard(props) {

  const { resetUserData, schoolId } = props;

  const navigate = useNavigate();

  // State for handle mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(window.innerWidth >= 480);

  // State for reservations filter status and equipment filter 
  const [reservations, setReservations] = useState([]);
  const [reservationsFilterStatus, setReservationsFilterStatus] = useState('Approved');
  const [selectedEquipmentFilter, setSelectedEquipmentFilter] = useState(null);

  // State for selected reservation
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedReservationDetails, setSelectedReservationDetails] = useState([]);

  // State variable for icon modal
  const [iconModal, setIconModal] = useState({
    message: '',
    visibility: false,
    icon: HiExclamationCircle,
    isIconSpin: false,
  });

  // UpdateMobileView - To set the isMobileVIew if window.innerWidth is smaller than 480px.
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

  const OnEquipmentFilterCardClick = (selectedEquipmentFilter) => {
    // Set selected reservation to null
    setSelectedReservation(null);

    // Toggle the selected equipment filter, await until finish then continue.
    setSelectedEquipmentFilter((prevSelectedEquipmentFilter) => 
      prevSelectedEquipmentFilter === selectedEquipmentFilter ? null : selectedEquipmentFilter
    );
  };

  // Function triggered when reservation status filter button is clicked
  const OnReservationStatusFilterButtonClick = (status) => {
    setReservationsFilterStatus(status);
    setSelectedReservation(null);
  };

  // OnReservationCardClick - Handle to set selectedreservation
  const OnReservationCardClick = async(selectedReservation) => {
    // Set selected equipment filter to null
    setSelectedEquipmentFilter(null);
    
    // Toggle the selected reservations, await until finish setSelectedReservation then continue.
    await Promise.resolve(setSelectedReservation((prevSelectedReservation) => 
      prevSelectedReservation === selectedReservation.reservationID ? null : selectedReservation.reservationID
    ));

    setSelectedReservationDetails(selectedReservation);
  };

  // OnEditReservationClick - TODO: Navigate to update reservation.
  const OnEditReservationClick = () => {
    console.log('Edit Reservation');
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
        }, 1500);
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
        }, 1500);
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
  //#endregion

  return (
    <GeneralPage>
      <IconModal 
        className='StudentDashboard-IconModalContainer'
        icon={iconModal.icon}
        iconClassName='StudentDashboard-IconModalIcon'
        message={iconModal.message}
        isVisible={iconModal.visibility}
        isSpinning={iconModal.isIconSpin}/>
      <div className='StudentDashboard-PageContentContainer'>
        {/* Page Header - Student Dashboard */}
        <div className='StudentDashboard-PageHeaderContainer'>
          <div className='StudentDashboard-PageHeader'>
            <Logo className='StudentDashboard-LogoContainer'/>
            <p className='heading-2'>Dashboard</p>
          </div>
          <div className='StudentDashboard-ActionContainer'>
            {/* Sign Out Button */}
            <IconButton
              icon={HiLogout}
              className='StudentDashboard-ActionButton'
              onClick={SignOut} />
          </div>
        </div>
        {/* Page Content */}
        <div className='StudentDashboard-ContentContainer'>
          {/* Left Content Panel */}
          <div className={`StudentDashboard-LeftContentPanel ${isMobileView && isRightPanelVisible ? 'StudentDashboard-Hide' : ''}`}>
            {/* Equipment Filter Section */}
            <div className='StudentDashboard-EquipmentFilterSection StudentDashboard-Hide'>
              {/* Section Header */}
              <div className='StudentDashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Equipment</p>
                {/* Make Reservation Button - Mobile */}
                <StandardButton
                  title='Make Reservation'
                  onClick={OnMakeReservationClick}
                  className='StudentDashboard-MobileMakeReservationButton'
                  icon={HiCalendar}/>
              </div>
              {/* Equipment Filters */}
              <EquipmentFilterCardList 
                className='StudentDashboard-EquipmentFilterCardList'
                selectedEquipmentFilter={selectedEquipmentFilter}
                OnEquipmentFilterCardClick={OnEquipmentFilterCardClick}/>
            </div>
            {/* Reservation Section */}
            <div className='StudentDashboard-ReservationSection'>
              {/* Section Header */}
              <div className='StudentDashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Reservations</p>
                {/* Filters */}
                <div className='StudentDashboard-ReservationFilterContainer'>
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
                className='StudentDashboard-ReservationList'
                filterMode='upcoming'
                filterStatus={reservationsFilterStatus}
                reservations={reservations}
                selectedReservation={selectedReservation}
                OnReservationCardClick={OnReservationCardClick}/>
            </div>
          </div>
          {/* Right Content Panel */}
          <div className={`StudentDashboard-RightContentPanel${isMobileView && isRightPanelVisible ? 'Active' : ''}`}>
            <div className='StudentDashboard-RightContent'>
              {!isMobileView && selectedEquipmentFilter === null && selectedReservation === null && (
                <StandardButton
                  title='Make Reservation'
                  onClick={OnMakeReservationClick}
                  className='StudentDashboard-MakeReservationButton'
                  icon={HiCalendar}/>
              )}
              {
                selectedEquipmentFilter === 'Currently Using' && (
                    <DetailSection
                      className='StudentDashboard-CurrentlyUsingSection'
                      title='Currently Using'
                      additionalInformation={`MM/DD/YYYY`}
                      equipmentDetails={[]}
                      actionIcon={(isMobileView) ? HiX : null}
                      action={CloseDetailSection}
                      isMargin={true}/>
                )
              }
              {
                selectedEquipmentFilter === 'Recently Used' && (
                  <DetailSection
                    className='StudentDashboard-RecentlyUsedSection'
                    title='Recently Used'
                    additionalInformation={`MM/DD/YYYY - MM/DD/YYYY`}
                    equipmentDetails={[]}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}
                    isMargin={true}/>
                )
              }
              {selectedReservation && (
                <>
                  <DetailSection
                    className='StudentDashboard-ReservationDetailSection'
                    title='Reservation Details'
                    additionalInformation={`${selectedReservationDetails?.formattedStartDate} - ${selectedReservationDetails?.formattedEndDate}`}
                    equipmentDetails={selectedReservationDetails?.details}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}
                    detailsType='reservation'/>
                  {reservationsFilterStatus === 'Requested' && (
                    <div className='StudentDashboard-ReservationActionContainer'>
                      <StandardButton
                        title='Edit'
                        onClick={OnEditReservationClick}
                        className='StudentDashboard-ReservationActionButton'
                        icon={HiPencilAlt}/>
                      <StandardButton
                        title='Cancel'
                        onClick={OnCancelReservationClick}
                        className='StudentDashboard-ReservationActionButton'
                        icon={HiMinusCircle}/>
                    </div>   
                  )}
                  {reservationsFilterStatus === 'Approved' && (
                    <div className='StudentDashboard-ReservationActionContainer'>
                      <StandardButton
                        title='Cancel'
                        onClick={OnCancelReservationClick}
                        className='StudentDashboard-ReservationActionButton'
                        icon={HiMinusCircle}/>
                    </div>   
                  )}
                </>   
              )}
            </div>
          </div>
        </div>
      </div>
    </GeneralPage>
  )
};

// Define PropTypes for the NavigationBar component
StudentDashboard.propTypes = {
  resetUserData: PropTypes.func.isRequired,
  schoolId: PropTypes.string,
};

// Define defaultProps for the component
StudentDashboard.defaultProps = {
  schoolId: '',
};

const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Connect the component to Redux, mapping state and actions to props
export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
