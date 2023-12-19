// Import Components 
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import GeneralPage from '../../../Pages/GeneralPage/GeneralPage';
import StandardButton from '../../Buttons/StandardButton';
import InventorySummaryList from '../../Lists/InventorySummaryList/InventorySummaryList';
import ReservationList from '../../Lists/ReservationList/ReservationList';
import FilterButton from '../../Buttons/FilterButton/FilterButton';
import SearchBarInputField from '../../InputFields/SearchBarInputField/SearchBarInputField';
import DetailSection from '../../Sections/DetailSection/DetailSection';
import Logo from '../../Logo/Logo';
import IconButton from '../../Buttons/IconButton/IconButton';
import { AllReservationsResponse, InUseAmmeter, InUseBarometer, InUseHydrometer, InUseLuxmeter, InUseManometer, 
         InUseMultimeter, InUseOscilloscope, InUseSpectrophotometer, InUseThermometer, InUseVoltmeter, 
         ReservationDetailsAmandaLeeResponse, 
         ReservationDetailsEmilyWilsonResponse, 
         ReservationDetailsRobertWhiteResponse, 
         ReservationDetailsSophiaJohnsonResponse, 
         UnderRepairAmmeter, UnderRepairBarometer, UnderRepairHydrometer, UnderRepairLuxmeter, UnderRepairManometer,
         UnderRepairMultimeter, UnderRepairOscilloscope, UnderRepairSpectrophotometer, UnderRepairThermometer, UnderRepairVoltmeter } from '../../../ResponseBody';

// Import Stylings
import './AdminDashboard.css';

// Import Icons
import { HiPlus, HiCheck, HiX, HiBell, HiCog } from 'react-icons/hi';

// Define the AdminDashboard Component
function AdminDashboard() {
  
  const navigate = useNavigate();

  // Search Query Object
  const [searchQuery, setSearchQuery] = useState({
    equipmentType: '',
  });

  // Arrays for in-use equipment details
  // TODO: Implement APIs.
  const inUseEquipmentDetailsResponse = [InUseVoltmeter, InUseThermometer, InUseBarometer, 
                                         InUseAmmeter, InUseMultimeter, InUseHydrometer, 
                                         InUseOscilloscope, InUseSpectrophotometer, InUseManometer, InUseLuxmeter];

  // Arrays for under-repair equipment details
  // TODO: Implement APIs.
  const underRepairEquipmentDetailsResponse = [UnderRepairVoltmeter, UnderRepairThermometer, UnderRepairBarometer, 
                                               UnderRepairAmmeter, UnderRepairMultimeter, UnderRepairHydrometer, 
                                               UnderRepairOscilloscope, UnderRepairSpectrophotometer, UnderRepairManometer, UnderRepairLuxmeter];

  // State for selected inventory type and reservation
  const [selectedInventoryType, setSelectedInventoryType] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // State for reservations filter status
  const [reservationsFilterStatus, setReservationsFilterStatus] = useState('Approved');

  // State for equipment details
  const [inUseEquipmentDetails, setInUseEquipmentDetails] = useState([]);
  const [underRepairEquipmentDetails, setUnderRepairEquipmentDetails] = useState([]);

  // State for reservation details
  const [reservationDetails, setReservationDetails] = useState([]);
  const [selectedReservationDetails, setSelectedReservationDetails] = useState([]);

  // State for handle mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(window.innerWidth >= 480);

  // UpdateMobileView - To set the isMobileVIew if window.innerWidth is smaller than 480px.
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

  // Function to handle changes in search query
  const HandleSearchQueryChange = (propertyName, inputValue) => {
    setSearchQuery({...searchQuery, [propertyName]: inputValue});
  }

  // Function to triggered when equipment type summary card is clicked
  // TODO: These will be changed when there are APIs for this.
  const OnEquipmentTypeSummaryCardClick = async(selectedEquipmentType) => {
    // Set selected reservation to null
    setSelectedReservation(null);
    
    // Toggle the selected inventory type, await until finish setSelectedInventoryType then continue.
    await Promise.resolve(setSelectedInventoryType((prevSelectedEquipmentType) => 
      prevSelectedEquipmentType === selectedEquipmentType ? null : selectedEquipmentType
    ));

    // Set in-use and under-repair equipment details based on the selected type.
    setInUseEquipmentDetails(inUseEquipmentDetailsResponse[selectedEquipmentType - 1]);
    setUnderRepairEquipmentDetails(underRepairEquipmentDetailsResponse[selectedEquipmentType - 1]);
  }

  // Function triggered when reservation card is clicked
  // TODO: These will be changed when there are APIs for this.
  const OnReservationCardClick = async(selectedReservation) => {
    // Set selected inventory type to null
    setSelectedInventoryType(null);
    // Toggle the selected reservations, await until finish setSelectedReservation then continue.
    await Promise.resolve(setSelectedReservation((prevSelectedReservation) => 
      prevSelectedReservation === selectedReservation ? null : selectedReservation
    ));

    // Find reservation details based on the selected reservation
    const details = AllReservationsResponse.find(reservation => reservation.reservationID === selectedReservation);

    // Set reservation details based on the selected reservation ID
    setSelectedReservationDetails(details);

    if(selectedReservation === 7) {
      setReservationDetails(ReservationDetailsEmilyWilsonResponse);
    }
    else if(selectedReservation === 9) {
      setReservationDetails(ReservationDetailsAmandaLeeResponse);
    }
    else if(selectedReservation === 11) {
      setReservationDetails(ReservationDetailsSophiaJohnsonResponse);
    }
    else if(selectedReservation === 12) {
      setReservationDetails(ReservationDetailsRobertWhiteResponse);
    }
    else {
      setReservationDetails([]);
    }
  }

  // Function triggered when reservation status filter button is clicked
  const OnReservationStatusFilterButtonClick = (status) => {
      setReservationsFilterStatus(status);
      setSelectedReservation(null);
  }

  // Function triggered when "Add Equipment" button is clicked
  // TODO: Go to AddEquipment Page.
  const OnAddEquipmentClick = () => {
    console.log("Add Equipment Clicked");
  }

  // TODO: Search APIs
  const Search = () => {
    console.log(searchQuery);
  }

    //#region Navigations
  // Navigate to Notifications Page
  const NavigateNotifications = () => {
    navigate('/Notifications')
  }

  // Navigate to Settings Page
  const NavigateSettings = () => {
    navigate('/Settings')
  }
  //#endregion

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
      if(!selectedInventoryType && !selectedReservation) {
        setIsRightPanelVisible(false);
      }
      else if (selectedInventoryType || selectedReservation) {
        setIsRightPanelVisible(true);
      }
    }
  }, [selectedInventoryType, selectedReservation, isMobileView]);
  //#endregion

  // Close detail section when clicked on the "X" icon
  const CloseDetailSection = () => {
    setSelectedInventoryType(null);
    setSelectedReservation(null);
  }

  return (
    <GeneralPage>
      <div className='AdminDashboard-PageContentContainer'>
        {/* Page Header - Dashboard */}
        <div className='AdminDashboard-PageHeaderContainer'>
          <div className='AdminDashboard-PageHeader'>
            <Logo className='AdminDashboard-LogoContainer'/>
            <p className='heading-2'>Dashboard</p>
          </div>
          <div className='AdminDashboard-ActionContainer'>
            {/* Notifications Button */}
            <IconButton 
              icon={HiBell} 
              className='AdminDashboard-ActionButton'
              onClick={NavigateNotifications}/>
            {/* Settings Button */}
            <IconButton 
              icon={HiCog} 
              className='AdminDashboard-ActionButton'
              onClick={NavigateSettings}/>
          </div>
        </div>
        {/* Page Content */}
        <div className='AdminDashboard-ContentContainer'>
          {/* Left Content Panel */}
          <div className={`AdminDashboard-LeftContentPanel ${isMobileView && isRightPanelVisible ? 'AdminDashboard-Hide' : ''}`}>
            {/* Inventory Section */}
            <div className='AdminDashboard-InventorySection'>
              {/* Section Header */}
              <div className='AdminDashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Inventory</p>
                {/* Search Bar */}
                <SearchBarInputField
                  className='AdminDashboard-SearchBar'
                  placeholder='Search type'
                  name='equipmentType'
                  value={searchQuery.equipmentType}
                  onChange={HandleSearchQueryChange}
                  onKeyDown={(e) => e.key === 'Enter' && Search()}
                  />
              </div>
              {/* Inventory Summary List */}
              <InventorySummaryList 
                className='AdminDashboard-InventorySummaryList'
                selectedInventoryType={selectedInventoryType}
                OnEquipmentTypeSummaryCardClick={OnEquipmentTypeSummaryCardClick}/>
            </div>
            {/* Reservation Section */}
            <div className='AdminDashboard-ReservationSection'>
              {/* Section Header */}
              <div className='AdminDashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Reservations</p>
                {/* Filters */}
                <div className='AdminDashboard-ReservationFilterContainer'>
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
              <ReservationList className='AdminDashboard-ReservationList'
                filterMode='upcoming'
                filterStatus={reservationsFilterStatus}
                selectedReservation={selectedReservation}
                OnReservationCardClick={OnReservationCardClick}/>
            </div>
          </div>
          {/* Right Content Panel */}
          <div className={`AdminDashboard-RightContentPanel${isMobileView && isRightPanelVisible ? 'Active' : ''}`}>
            <div className='AdminDashboard-RightContent'>
              {!isMobileView && selectedInventoryType === null && selectedReservation === null && (
              <StandardButton
                title='Add Equipment'
                onClick={OnAddEquipmentClick}
                className='AdminDashboard-AddEquipmentButton'
                icon={HiPlus}/>
              )}
              {selectedInventoryType && (
                <>
                  <DetailSection 
                    className='AdminDashboard-InUseSection'
                    title='In Use'
                    equipmentDetails={inUseEquipmentDetails}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}/>
                  <DetailSection
                    className='AdminDashboard-UnderRepairSection'
                    title='Under Repair'
                    equipmentDetails={underRepairEquipmentDetails}
                    isMargin={true}/>
                </>
              )}
              {selectedReservation && (
                <>
                  <DetailSection
                    className='AdminDashboard-ReservationDetailSection'
                    title='Reservation Details'
                    additionalInformation={`${selectedReservationDetails?.startDate} - ${selectedReservationDetails?.endDate}`}
                    equipmentDetails={reservationDetails}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}
                    detailsType='reservation'/>
                  {reservationsFilterStatus === 'Requested' && (
                    <div className='AdminDashboard-ReservationActionContainer'>
                      <StandardButton
                        title={"Approve"}
                        onClick={OnAddEquipmentClick}
                        className='AdminDashboard-ReservationActionButton'
                        icon={HiCheck}/>
                      <StandardButton
                        title={"Reject"}
                        onClick={OnAddEquipmentClick}
                        className='AdminDashboard-ReservationActionButton'
                        icon={HiX}/>
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
}

export default AdminDashboard;
