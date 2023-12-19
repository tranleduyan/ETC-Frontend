// Import Components
import React, { useState, useEffect, useCallback } from 'react';
import GeneralPage from '../../../Pages/GeneralPage/GeneralPage';
import FilterButton from '../../Buttons/FilterButton/FilterButton';

// Import Stylings
import './StudentDashboard.css';
import Logo from '../../Logo/Logo';
import IconButton from '../../Buttons/IconButton/IconButton';
import { HiCalendar, HiClipboardList, HiLogout, HiMinusCircle, HiPencilAlt, HiX } from 'react-icons/hi';
import ReservationList from '../../Lists/ReservationList/ReservationList';
import StandardButton from '../../Buttons/StandardButton';
import DetailSection from '../../Sections/DetailSection/DetailSection';

// Define Student Dashboard Component;
function StudentDashboard() {

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

  const OnMakeReservationClick = () => {
    console.log('reserve');
  }

  const SignOut = () => {
    console.log('Sign Out');
  };

  const OnReservationCardClick = async(selectedReservation) => {
    // Set selected equipment filter to null
    setSelectedEquipmentFilter(null);
    
    // Toggle the selected reservations, await until finish setSelectedReservation then continue.
    await Promise.resolve(setSelectedReservation((prevSelectedReservation) => 
      prevSelectedReservation === selectedReservation ? null : selectedReservation
    ));

    console.log('handle');
  };

  // Function triggered when reservation status filter button is clicked
  const OnReservationStatusFilterButtonClick = (status) => {
    setReservationsFilterStatus(status);
    setSelectedReservation(null);
  };

  const OnEditReservationClick = () => {
    console.log('not yet');
  }

  const OnCancelReservationClick = () => {
    console.log('...');
  }

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

  const CloseDetailSection = () => {
    console.log('Close Detail Section');
  };

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
              <div className='FilterCardList-Container StudentDashboard-EquipmentFilterCardList'>
                <div className='FilterCard-Container'>
                  <HiClipboardList className='FilterCard-Icon'/>
                  <div className='FilterCard-Information'>
                    {/* Filter Card Title */}
                    <p className='heading-5'>Currently Using</p>
                    <p className='paragraph-1'>1 items</p>
                  </div>
                </div>
                <div className='FilterCard-Container'>
                  <HiClipboardList className='FilterCard-Icon'/>
                  <div className='FilterCard-Information'>
                    {/* Filter Card Title */}
                    <p className='heading-5'>Recently Used</p>
                    <p className='paragraph-1'>4 items</p>
                  </div>
                </div>
              </div>
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
                      title={"Edit"}
                      onClick={OnEditReservationClick}
                      className='StudentDashboard-ReservationActionButton'
                      icon={HiPencilAlt}/>
                    <StandardButton
                      title={"Cancel"}
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
}

export default StudentDashboard;
