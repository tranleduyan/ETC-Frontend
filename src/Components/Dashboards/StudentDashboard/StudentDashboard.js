// Import Components
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GeneralPage from '../../../Pages/GeneralPage/GeneralPage';
import FilterButton from '../../Buttons/FilterButton/FilterButton';
import Logo from '../../Logo/Logo';
import IconButton from '../../Buttons/IconButton/IconButton';
import ReservationList from '../../Lists/ReservationList/ReservationList';
import StandardButton from '../../Buttons/StandardButton';
import DetailSection from '../../Sections/DetailSection/DetailSection';
import EquipmentFilterCardList from '../../Lists/EquipmentFilterCardList/EquipmentFilterCardList';
import { resetUserData } from '../../../storage';

// Import Stylings
import './StudentDashboard.css';

// Import Icons
import { HiCalendar, HiLogout, HiMinusCircle, HiPencilAlt, HiX } from 'react-icons/hi';

// Define Student Dashboard Component;
function StudentDashboard(props) {

  const { resetUserData } = props;

  const navigate = useNavigate();

  // State for handle mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(window.innerWidth >= 480);

  // State for reservations filter status and equipment filter 
  const [reservationsFilterStatus, setReservationsFilterStatus] = useState('Approved');
  const [selectedEquipmentFilter, setSelectedEquipmentFilter] = useState(null);

  // State for selected reservation
  const [selectedReservation, setSelectedReservation] = useState(null);

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
    setSelectedReservation((prevSelectedReservation) => 
      prevSelectedReservation === selectedReservation ? null : selectedReservation
    );
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
  //#endregion

  return (
    <GeneralPage>
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
            <div className='StudentDashboard-EquipmentFilterSection'>
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
                    additionalInformation={`MM/DD/YYYY - MM/DD/YYYY`}
                    equipmentDetails={[]}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}
                    detailsType='reservation'/>
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
};

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Connect the component to Redux, mapping state and actions to props
export default connect(null, mapDispatchToProps)(StudentDashboard);
