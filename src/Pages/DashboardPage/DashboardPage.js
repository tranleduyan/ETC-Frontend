// Import Components 
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import GeneralPage from '../GeneralPage/GeneralPage';
import StandardButton from '../../Components/Buttons/StandardButton';
import InventorySummaryList from '../../Components/Lists/InventorySummaryList/InventorySummaryList';
import ReservationList from '../../Components/Lists/ReservationList/ReservationList';
import FilterButton from '../../Components/Buttons/FilterButton/FilterButton';
import SearchBarInputField from '../../Components/InputFields/SearchBarInputField/SearchBarInputField';
import DetailSection from '../../Components/Sections/DetailSection/DetailSection';
import Logo from '../../Components/Logo/Logo';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import { AllReservationsResponse, InUseAmmeter, InUseBarometer, InUseHydrometer, InUseLuxmeter, InUseManometer, 
         InUseMultimeter, InUseOscilloscope, InUseSpectrophotometer, InUseThermometer, InUseVoltmeter, 
         ReservationDetailsAmandaLeeResponse, 
         ReservationDetailsEmilyWilsonResponse, 
         ReservationDetailsRobertWhiteResponse, 
         ReservationDetailsSophiaJohnsonResponse, 
         UnderRepairAmmeter, UnderRepairBarometer, UnderRepairHydrometer, UnderRepairLuxmeter, UnderRepairManometer,
         UnderRepairMultimeter, UnderRepairOscilloscope, UnderRepairSpectrophotometer, UnderRepairThermometer, UnderRepairVoltmeter } from '../../ResponseBody';

// Import Stylings
import './DashboardPage.css';

// Import Icons
import { HiPlus, HiCheck, HiX, HiBell, HiCog } from 'react-icons/hi';

// Define the DashboardPage Component
function DashboardPage() {
  
  const navigate = useNavigate();

  // Search Query Object
  const [searchQuery, setSearchQuery] = useState({
    equipmentType: '',
  });

  // Arrays for in-use equipment details
  const inUseEquipmentDetailsResponse = [InUseVoltmeter, InUseThermometer, InUseBarometer, 
                                         InUseAmmeter, InUseMultimeter, InUseHydrometer, 
                                         InUseOscilloscope, InUseSpectrophotometer, InUseManometer, InUseLuxmeter];

  // Arrays for under-repair equipment details
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

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

  const [isRightPanelVisible, setIsRightPanelVisible] = useState((window.innerWidth <= 480) ? false : true);

  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

  const ToggleRightPanelVisibility = () => {
    setIsRightPanelVisible((prevState) => !prevState);
  }

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

  const NavigateNotifications = () => {
    navigate('/Notifications')
  }

  const NavigateSettings = () => {
    navigate('/Settings')
  }

  useEffect(() => {
    window.addEventListener('resize', UpdateMobileView);
    return () => {
      window.removeEventListener('resize', UpdateMobileView);
    }
  }, [UpdateMobileView]);

  useEffect(() => {
    if(isMobileView && selectedInventoryType) {
      ToggleRightPanelVisibility();
    }
    if(isMobileView && !selectedInventoryType) {
      setIsRightPanelVisible(false);
    }
    else if(isMobileView && selectedInventoryType) {
      setIsRightPanelVisible(true);
    }
  }, [selectedInventoryType, isMobileView]);

  const CloseDetailSection = () => {
    setSelectedInventoryType(null);
  }

  return (
    <GeneralPage>
      <div className='Dashboard-PageContentContainer'>
        {/* Page Header - Dashboard */}
        <div className='Dashboard-PageHeaderContainer'>
          <div className='Dashboard-PageHeader'>
            <Logo className='Dashboard-LogoContainer'/>
            <p className='heading-2'>Dashboard</p>
          </div>
          <div className='Dashboard-ActionContainer'>
            {/* Notifications Button */}
            <IconButton 
              icon={HiBell} 
              className='Dashboard-ActionButton'
              onClick={NavigateNotifications}/>
            {/* Settings Button */}
            <IconButton 
              icon={HiCog} 
              className='Dashboard-ActionButton'
              onClick={NavigateSettings}/>
          </div>
        </div>
        {/* Page Content */}
        <div className='Dashboard-ContentContainer'>
          {/* Left Content Panel */}
          <div className={`Dashboard-LeftContentPanel ${isMobileView && isRightPanelVisible ? 'Dashboard-Hide' : ''}`}>
            {/* Inventory Section */}
            <div className='Dashboard-InventorySection'>
              {/* Section Header */}
              <div className='Dashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Inventory</p>
                {/* Search Bar */}
                <SearchBarInputField
                  className='Dashboard-SearchBar'
                  placeholder='Search type'
                  name='equipmentType'
                  value={searchQuery.equipmentType}
                  onChange={HandleSearchQueryChange}
                  onKeyDown={(e) => e.key === 'Enter' && Search()}
                  />
              </div>
              {/* Inventory Summary List */}
              <InventorySummaryList 
                className='Dashboard-InventorySummaryList'
                selectedInventoryType={selectedInventoryType}
                OnEquipmentTypeSummaryCardClick={OnEquipmentTypeSummaryCardClick}/>
            </div>
            {/* Reservation Section */}
            <div className='Dashboard-ReservationSection'>
              {/* Section Header */}
              <div className='Dashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Reservations</p>
                {/* Filters */}
                <div className='Dashboard-ReservationFilterContainer'>
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
              <ReservationList className='Dashboard-ReservationList'
                filterMode='upcoming'
                filterStatus={reservationsFilterStatus}
                selectedReservation={selectedReservation}
                OnReservationCardClick={OnReservationCardClick}/>
            </div>
          </div>
          {/* Right Content Panel */}
          <div className={`Dashboard-RightContentPanel${isMobileView && isRightPanelVisible ? 'Active' : ''}`}>
            <div className='Dashboard-RightContent'>
              {!isMobileView && selectedInventoryType === null && selectedReservation === null && (
              <StandardButton
                title={"Add Equipment"}
                onClick={OnAddEquipmentClick}
                className='Dashboard-AddEquipmentButton'
                icon={HiPlus}/>
              )}
              {selectedInventoryType && (
                <>
                  <DetailSection 
                    className='Dashboard-InUseSection'
                    title='In Use'
                    equipmentDetails={inUseEquipmentDetails}
                    actionIcon={(isMobileView) ? HiX : null}
                    action={CloseDetailSection}/>
                  <DetailSection
                    className='Dashboard-UnderRepairSection'
                    title='Under Repair'
                    equipmentDetails={underRepairEquipmentDetails}/>
                </>
              )}
              {selectedReservation && (
                <>
                  <DetailSection
                    className='Dashboard-ReservationDetailSection'
                    title='Reservation Details'
                    additionalInformation={`${selectedReservationDetails?.startDate} - ${selectedReservationDetails?.endDate}`}
                    equipmentDetails={reservationDetails}
                    detailsType='reservation'/>
                  {reservationsFilterStatus === 'Requested' && (
                    <div className='Dashboard-ReservationActionContainer'>
                      <StandardButton
                        title={"Approve"}
                        onClick={OnAddEquipmentClick}
                        className='Dashboard-ReservationActionButton'
                        icon={HiCheck}/>
                      <StandardButton
                        title={"Reject"}
                        onClick={OnAddEquipmentClick}
                        className='Dashboard-ReservationActionButton'
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

export default DashboardPage;
