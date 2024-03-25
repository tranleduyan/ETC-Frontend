// Import Components 
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API } from '../../Constants';
import { connect } from 'react-redux';
import { resetUserData } from '../../storage';

// Import Stylings
import './ReservationsPage.css';

//#region Import UI Components
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import SearchBarInputField from '../../Components/InputFields/SearchBarInputField';
import DatePickerInputField from '../../Components/InputFields/DatePickerInputField/DatePickerInputField';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import AvailableModelList from '../../Components/Lists/AvailableModelList/AvailableModelList';
import UnauthorizedPanel from '../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import SpecifyModelReservationQuantityList from '../../Components/Lists/SpecifyModelReservationQuatityList/SpecifyModelReservationQuantityList';
import ReservationConfirmationDetailsList from '../../Components/Lists/ReservationConfirmationDetailsList/ReservationConfirmationDetailsList';
import IconModal from '../../Components/Modals/IconModal/IconModal';
import FilterButton from '../../Components/Buttons/FilterButton/FilterButton';
import ReservationList from '../../Components/Lists/ReservationList/ReservationList';
import DetailSection from '../../Components/Sections/DetailSection/DetailSection';
//#endregion

//#region Import Icons
import { HiArrowSmRight, HiCalendar, HiCheck, HiChevronLeft, HiChevronRight, HiExclamationCircle, HiMinusCircle, HiPlus, HiRefresh, HiX } from 'react-icons/hi';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
//#endregion

// Define ReservationsPage Component
function ReservationsPage(props) {

  // Extract neccessary props
  const { userRole, schoolId } = props;

  // SearchQuery State variables
  const [searchQuery, setSearchQuery] = useState({
    equipmentSerialId: '',
  });

  // Date Information State Variables
  const [dateInformation, setDateInformation] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [isDateError, setIsDateError] = useState(true);

  // Available Models State Variable - List of available models
  const [availableModels, setAvailableModels] = useState([]);

  // Flag state for checking if isMakingReservation or not
  const [isMakingReservation, setIsMakingReservation] = useState(false);

  // State variables for list of selected models for making reservation
  const [selectedModels, setSelectedModels] = useState([]);

  // State for handling reservation creation process
  const [reservationCreationState, setReservationCreationState] = useState('Initial');

  const [iconModal, setIconModal] = useState({
    message: '',
    visibility: false,
    icon: HiExclamationCircle,
    isIconSpin: false,
  });

  const [pageState, setPageState] = useState('Reservation Creation');

  const [reservationsFilterStatus, setReservationsFilterStatus] = useState('Approved');

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedReservationDetails, setSelectedReservationDetails] = useState([]);
  const [reservationDetails, setReservationDetails] = useState([]);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

  // Close detail section when clicked on the "X" icon
  const CloseDetailSection = () => {
    setSelectedReservation(null);
  };

  // UpdateMobileView - To set the isMobileVIew if window.innerWidth is smaller than 480px.
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);


  const [isRightPanelVisible, setIsRightPanelVisible] = useState(window.innerWidth >= 480);

  // Function triggered when reservation status filter button is clicked
  const OnReservationStatusFilterButtonClick = (status) => {
    setReservationsFilterStatus(status);
    setSelectedReservation(null);
};

  // HandleSearchQueryChange - Function to handle changes in search query
  const HandleSearchQueryChange = (propertyName, inputValue) => {
    setSearchQuery({...searchQuery, [propertyName]: inputValue});
  };

  // HandleDataInputChange - Funciton to handle changes in date inputs
  const HandleDateInputChange = (propertyName, inputValue) => {
    setDateInformation({...dateInformation, [propertyName]: inputValue});
  };

  // OnReserveClick - Handle when "Reserve" button is clicked
  const OnReserveClick = () => {
    if(IsValidReservationPeriod()) {
      setIsMakingReservation(true);
    }
  };

  // OnYourReservationsClick - Handle when "Your Reservations" button is clicked
  const OnYourReservationsClick = () => {
    setPageState('Your Reservations');
  };

  // OnContinueMakingReservationClick - Handle the state of making reservation process
  const OnContinueMakingReservationClick = () => {
    if(reservationCreationState === 'Initial') {
      if(selectedModels.length === 0) {
        setIconModal({
          message: 'Please select an item to reserve!',
          icon: HiExclamationCircle,
          visibility: true,
          isIconSpin: false,
        });
        // Automatically hide the modal after 3 seconds
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          })}, 1500);
      }
      else if(IsValidReservationPeriod() && selectedModels.length > 0) {
        setReservationCreationState('Specify Quantity');
      }
    }
    else if(reservationCreationState === 'Specify Quantity') {
      setReservationCreationState('Confirm Reservation');
    }
  };

  const OnBack = () => {
    if(pageState === 'Your Reservations') {
      setPageState('Reservation Creation');
    }

    else if(reservationCreationState === 'Specify Quantity') {
      setReservationCreationState('Initial');
    }
    else if(reservationCreationState === 'Confirm Reservation') {
      setReservationCreationState('Specify Quantity');
    }
  };

  // OnCancelReservationCreationClick - Handle when "Cancel" button is clicked
  const OnCancelReservationCreationClick = () => {
    setIsMakingReservation(false);
    setSelectedModels([]);
  }

  const OnReservationCardClick = () => {
    console.log("Card Click");
  };

  const OnRejectReservationClick = () => {
    console.log("Reject Reservation");
  };

  const OnApproveReservationClick = () => {
    console.log("Approve Reservation");
  };

  const OnConfirmMakingReservationClick = () => {
    const requestBody = {
      startDate: dateInformation.startDate.toISOString().split('T')[0],
      endDate: dateInformation.endDate.toISOString().split('T')[0],
      schoolId: schoolId,
      reservedEquipments: selectedModels.map(model => ({
        modelId: model.modelId,
        typeId: model.typeId,
        quantity: model.quantity
      }))
    };
    
    setIconModal({
      message: 'Processing your reservation requests...',
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .post(`${API.domain}/api/reservation/create`, requestBody, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then((response) => {
        
        setIconModal({
          message: response.data.message,
          icon: HiCheck,
          visibility: true,
          isIconSpin: false,
        });

        // Automatically hide the modal after 3 seconds
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
          setReservationCreationState('Initial');
          setIsMakingReservation(false);
          setDateInformation({
            startDate: new Date(),
            endDate: new Date(),
          });
          setSelectedModels([]);
        }, 1500);

      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        setIconModal({
          message: errorMessage,
          icon: HiExclamationCircle,
          visibility: true,
          isIconSpin: false,
        });

        // Automatically hide the modal after 3 seconds
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
        }, 1500);

      });
  }
  
  // TODO: Search APIs
  const Search = () => {
    console.log(searchQuery);
  }

  const OnOnlyYourReservationsClick = () => {
    console.log('filter only your reservations');
  }

  // FetchAvailableModels - Fetch available models based on selected date range
  const FetchAvailableModels = () => {
    dateInformation.startDate.setHours(0, 0, 0, 0);
    dateInformation.endDate.setHours(0, 0, 0, 0);

    const startPeriod = dateInformation.startDate.toISOString().split('T')[0];
    const endPeriod = dateInformation.endDate.toISOString().split('T')[0];
    setIconModal({
      message: 'Looking for available items...',
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });
    axios
      .get(`${API.domain}/api/inventory/available-models?startDate=${startPeriod}&endDate=${endPeriod}`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setAvailableModels(response.data.responseObject);
        // Automatically hide the modal after 3 seconds
        setTimeout(() => {
          setIconModal({
            message: '',
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
        }, 500);
      })
      .catch(() => {
        setAvailableModels([]);
        setIconModal({
          message: 'There is an error occurred. Please try again.',
          icon: HiExclamationCircle,
          visibility: true,
          isIconSpin: false,
        });
      })
  }

  // Select Model - Handle model selection/deselection upon making reservation
  const SelectModel = (model) => {
    let updatedSelectedModels = [...selectedModels];

    // Check if the model is already selected
    const selectedIndex = updatedSelectedModels.findIndex(item => item.modelId === model.modelId);
  
    // If selected, remove it; otherwise, add it to the list
    if (selectedIndex !== -1) {
      updatedSelectedModels.splice(selectedIndex, 1);
    } else {
      updatedSelectedModels.push(model);
    }
  
    setSelectedModels(updatedSelectedModels);
  };

  const OnIncreaseQuantity = (modelId) => {
    const index = selectedModels.findIndex(model => model.modelId === modelId);
    if (index !== -1 && selectedModels[index].quantity + 1 <= selectedModels[index].availableCount) {
      const updatedSelectedModels = [...selectedModels];
      updatedSelectedModels[index] = { ...updatedSelectedModels[index], quantity: updatedSelectedModels[index].quantity + 1 };
      setSelectedModels(updatedSelectedModels);
    }
  };

  const OnDecreaseQuantity = (modelId) => {
    const index = selectedModels.findIndex(model => model.modelId === modelId);
    if (index !== -1 && selectedModels[index].quantity > 1) {
      const updatedSelectedModels = [...selectedModels];
      updatedSelectedModels[index] = { ...updatedSelectedModels[index], quantity: updatedSelectedModels[index].quantity - 1 };
      setSelectedModels(updatedSelectedModels);
    }
  };

  // IsValidReservationPeriod - valid if selected date range for reservation is valid
  const IsValidReservationPeriod = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if(pageState === 'Your Reservations' && (dateInformation.startDate === null || dateInformation.endDate === null)) {
      setIsDateError(false);
      return true;
    }
    else if(dateInformation.startDate < today || dateInformation.startDate > dateInformation.endDate) {
      setIsDateError(true);
      return false;
    }

    setIsDateError(false);
    return true;
  };

  // Fetch availble models whenever valid date range changes
  useEffect(() => {
    if(pageState === 'Reservation Creation' && IsValidReservationPeriod()) {
      FetchAvailableModels();
    }
    // eslint-disable-next-line
  }, [dateInformation.startDate, dateInformation.endDate]);

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
      if(!selectedReservation) {
        setIsRightPanelVisible(false);
      }
      else if (selectedReservation) {
        setIsRightPanelVisible(true);
      }
    }
  }, [selectedReservation, isMobileView]);

  useEffect(() => {
    if(pageState === 'Your Reservations') {
      setDateInformation({
        startDate: null,
        endDate: null,
      });
    }
  }, [pageState]);

  return (
    <>
      {(userRole === 'Admin' || userRole === 'Student' || userRole === 'Faculty') ? (
        <GeneralPage>
          <IconModal 
            className='ReservationsPage-IconModalContainer'
            icon={iconModal.icon}
            iconClassName='ReservationsPage-IconModalIcon'
            message={iconModal.message}
            isVisible={iconModal.visibility}
            isSpinning={iconModal.isIconSpin}/>
          <div className='ReservationsPage-PageContentContainer'>
            <div className='ReservationsPage-PageHeaderContainer'>
              <Logo className='ReservationsPage-LogoContainer'/>
              <p className='heading-2'>Reservations</p>
            </div>
            {(pageState === 'Reservation Creation') &&
              <div className='ReservationsPage-ContentContainer'>
                <div className='ReservationsPage-MobileContentHeaderContainer'>
                  {reservationCreationState === 'Initial' && (
                    <>
                      <div className='ReservationsPage-MobileHeaderRow'>
                        <SearchBarInputField
                          className='ReservationsPage-SearchBar'
                          placeholder='Search'
                          name='equipmentSerialId'
                          value={searchQuery.equipmentSerialId}
                          onChange={HandleSearchQueryChange}
                          onKeyDown={(e) => e.key === 'Enter' && Search()}/>
                        {isMakingReservation 
                          ? 
                            <StandardButton
                            title='Cancel'
                            onClick={OnCancelReservationCreationClick}
                            className='ReservationsPage-CancelButton'
                            icon={HiMinusCircle}/>
                          :
                            <StandardButton 
                            title='Reserve'
                            onClick={OnReserveClick}
                            className='ReservationsPage-ReserveButton'
                            icon={HiPlus}/>
                        }
                      </div>
                      <div className='ReservationsPage-ReservationDateContainer'>
                        <DatePickerInputField
                          className={`ReservationsPage-ReservationDateField`}
                          name='startDate'
                          placeholder='From'
                          value={dateInformation.startDate}
                          onChange={(name, value) => HandleDateInputChange(name, value)}
                          isError={isDateError}/>
                        <DatePickerInputField
                          className={`ReservationsPage-ReservationDateField`}
                          name='endDate'
                          placeholder='Until'
                          value={dateInformation.endDate}
                          onChange={(name, value) => HandleDateInputChange(name, value)}
                          isError={isDateError}/>
                      </div>
                    </>
                  )}
                  {reservationCreationState === 'Specify Quantity' && (
                    <div className='ReservationsPage-MobileHeaderRow'>
                      <IconButton
                        icon={HiChevronLeft}
                        className='ReservationsPage-BackButton'
                        onClick={OnBack}/>
                      <p className='heading-5'>Specify Quantity</p>
                    </div>
                  )}
                  {reservationCreationState === 'Confirm Reservation' && (
                    <div className='ReservationsPage-MobileHeaderRow'>
                      <IconButton
                        icon={HiChevronLeft}
                        className='ReservationsPage-BackButton'
                        onClick={OnBack}/>
                      <p className='heading-5'>Confirm Reservation</p>
                    </div>
                  )}
                </div>
                <div className='ReservationsPage-ContentHeaderContainer'>
                  {reservationCreationState === 'Initial' && (
                    <>                  
                      <SearchBarInputField
                        className='ReservationsPage-SearchBar'
                        placeholder='Search equipment'
                        name='equipmentSerialId'
                        value={searchQuery.equipmentSerialId}
                        onChange={HandleSearchQueryChange}
                        onKeyDown={(e) => e.key === 'Enter' && Search()}
                        />
                      <div className='ReservationsPage-ReservationDateContainer'>
                        <DatePickerInputField
                          className={`ReservationsPage-ReservationDateField`}
                          name='startDate'
                          placeholder='Select start date'
                          value={dateInformation.startDate}
                          onChange={(name, value) => HandleDateInputChange(name, value)}
                          isError={isDateError}/>
                        <DatePickerInputField
                          className={`ReservationsPage-ReservationDateField`}
                          name='endDate'
                          placeholder='Select end date'
                          value={dateInformation.endDate}
                          onChange={(name, value) => HandleDateInputChange(name, value)}
                          isError={isDateError}/>
                      </div>
                    </>
                  )}
                  {reservationCreationState === 'Specify Quantity' && (
                    <div className='ReservationsPage-HeaderContainer'>
                      <IconButton
                        icon={HiChevronLeft}
                        className='ReservationsPage-BackButton'
                        onClick={OnBack}/>
                      <p className='heading-5'>Specify Quantity</p>
                    </div>
                  )}
                  {reservationCreationState === 'Confirm Reservation' && (
                    <div className='ReservationsPage-HeaderContainer'>
                      <IconButton
                        icon={HiChevronLeft}
                        className='ReservationsPage-BackButton'
                        onClick={OnBack}/>
                      <p className='heading-5'>Confirm Reservation</p>
                    </div>
                  )}
                  <div className='ReservationsPage-ActionButtonContainer'>
                    {isMakingReservation ? 
                      <>
                      {reservationCreationState === 'Initial' && (
                        <StandardButton
                          title='Cancel'
                          onClick={OnCancelReservationCreationClick}
                          className='ReservationsPage-CancelButton'
                          icon={HiMinusCircle}/>
                      )}
                      {(reservationCreationState === 'Initial' || reservationCreationState === 'Specify Quantity') && (
                        <StandardButton 
                          title=''
                          onClick={OnContinueMakingReservationClick}
                          className='ReservationsPage-ContinueButton'
                          icon={HiArrowSmRight}/>
                      )}
                      {reservationCreationState === 'Confirm Reservation' && (
                        <StandardButton 
                        title='Confirm'
                        onClick={OnConfirmMakingReservationClick}
                        className='ReservationsPage-ConfirmButton'
                        icon={HiCheck}/>
                      )}
                      </>
                      :
                      <>
                        <StandardButton 
                          title='Reserve'
                          onClick={OnReserveClick}
                          className='ReservationsPage-ReserveButton'
                          icon={HiPlus}/>
                        <StandardButton 
                          title=''
                          onClick={OnYourReservationsClick}
                          className='ReservationsPage-YourReservationsButton'
                          icon={HiCalendar}/>                
                      </>
                    }
                  </div>
                </div>
                {reservationCreationState === 'Initial' && (
                  <AvailableModelList 
                    availableModels={availableModels}
                    selectedModels={selectedModels}
                    onSelectModel={SelectModel}
                    isMakingReservation={isMakingReservation}
                  />
                )}
                {reservationCreationState === 'Specify Quantity' && (
                  <SpecifyModelReservationQuantityList 
                    selectedModels={selectedModels}
                    onIncreaseQuantity={OnIncreaseQuantity}
                    onDecreaseQuantity={OnDecreaseQuantity}/>
                )}
                {reservationCreationState === 'Confirm Reservation' && (
                  <div className='ReservationsPage-ReservationConfirmationContainer'>
                    <div className='ReservationsPage-ReservationConfirmationDateContainer'>
                      <HiCalendar className='ReservationsPage-ReservationConfirmationDateIcon'/>
                      <p className='paragraph-1'>
                        {dateInformation.startDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')} - {dateInformation.endDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}
                      </p>
                    </div>
                    <div className='ReservationsPage-ReservationConfirmationDetailsContainer'>
                      <p className='heading-5'>Details</p>
                      <ReservationConfirmationDetailsList 
                        selectedModels={selectedModels}/>
                    </div>
                  </div>
                )}
                <div className='ReservationsPage-MobileActionButtonContainer'>
                  {isMakingReservation 
                    ?
                    <>                
                      {(reservationCreationState === 'Initial' || reservationCreationState === 'Specify Quantity') && (
                        <StandardButton 
                          title='Continue'
                          onClick={OnContinueMakingReservationClick}
                          className='ReservationsPage-ContinueButton'
                          icon={HiArrowSmRight}/>
                      )}
                      {reservationCreationState === 'Confirm Reservation' && (
                        <StandardButton 
                        title='Confirm'
                        onClick={OnConfirmMakingReservationClick}
                        className='ReservationsPage-ConfirmButton'
                        icon={HiCheck}/>
                      )}
                    </>
                    :
                    <StandardButton 
                      title='Your Reservations'
                      onClick={OnYourReservationsClick}
                      className='ReservationsPage-YourReservationsButton'
                      icon={HiChevronRight}/>   
                  }
                </div>
              </div>
            }
            {(pageState === 'Your Reservations') &&
              <div className='ReservationsPage-YourReservationsContainer'>
                <div className={`ReservationsPage-ReservationsPanel ${isMobileView && isRightPanelVisible ? 'ReservationsPage-Hide' : ''}`}>
                  <div className='ReservationsPage-ReservationsHeaderContainer'>
                    <div className='ReservationsPage-ReservationsHeader'>
                      <IconButton
                        onClick={OnBack}
                        className='ReservationsPage-MobileReservationBackButton'
                        icon={HiChevronLeft}/>
                      <IconButton
                        onClick={OnBack}
                        className='ReservationsPage-ReservationBackButton'
                        icon={HiChevronLeft}/>
                      <p className='heading-5'>Back</p>
                    </div>
                    <div className='ReservationsPage-ReservationFilterContainer'>
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
                  <div className='ReservationsPage-ReservationsHeaderContainer'>
                    <div className='ReservationsPage-ReservationDateContainer'>
                      <DatePickerInputField
                        className={`ReservationsPage-ReservationDateField`}
                        name='startDate'
                        placeholder='From'
                        value={dateInformation.startDate}
                        onChange={(name, value) => HandleDateInputChange(name, value)}
                        isError={isDateError}/>
                      <DatePickerInputField
                        className={`ReservationsPage-ReservationDateField`}
                        name='endDate'
                        placeholder='Until'
                        value={dateInformation.endDate}
                        onChange={(name, value) => HandleDateInputChange(name, value)}
                        isError={isDateError}/>
                    </div>
                    <div className='ReservationsPage-OnlyYourReservationsContainer'>
                      <IconButton
                          icon={MdCheckBoxOutlineBlank}
                          className='ReservationsPage-OnlyYourReservationsButton'
                          onClick={OnOnlyYourReservationsClick}/>
                      <p className='paragraph-1'>Only My Reservations</p>
                    </div>
                  </div>
                  <ReservationList className='ReservationsPage-ReservationList'
                    filterMode='upcoming'
                    filterStatus={reservationsFilterStatus}
                    selectedReservation={selectedReservation}
                    OnReservationCardClick={OnReservationCardClick}/>
                </div>
                <div className={`ReservationsPage-ReservationDetailsContainer${isMobileView && isRightPanelVisible ? 'Active' : ''}`}>
                  <div className='ReservationsPage-ReservationDetails'>
                    {!isMobileView && selectedReservation === null && (
                      <StandardButton
                      title='Make Reservation'
                      onClick={OnBack}
                      className='ReservationsPage-MakeReservationButton'
                      icon={HiCalendar}/>
                    )}
                    {selectedReservation && (
                      <>
                        <DetailSection
                          className='ReservationsPage-ReservationDetailSection'
                          title='Reservation Details'
                          additionalInformation={`${selectedReservationDetails?.startDate} - ${selectedReservationDetails?.endDate}`}
                          equipmentDetails={reservationDetails}
                          actionIcon={(isMobileView) ? HiX : null}
                          action={CloseDetailSection}
                          detailsType='reservation'/>
                        {reservationsFilterStatus === 'Requested' && (
                          <div className='ReservationsPage-ReservationActionContainer'>
                            <StandardButton
                              title={"Approve"}
                              onClick={OnApproveReservationClick}
                              className='ReservationsPage-ReservationActionButton'
                              icon={HiCheck}/>
                            <StandardButton
                              title={"Reject"}
                              onClick={OnRejectReservationClick}
                              className='ReservationsPage-ReservationActionButton'
                              icon={HiX}/>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>  
              </div>
            }
          </div>
        </GeneralPage>
      ) :
      (
        <UnauthorizedPanel />
      )}
    </>
  )
};

// Define propTypes for ReservationPage
ReservationsPage.propTypes = {
  userRole: PropTypes.string,
  schooldId: PropTypes.string,
};

ReservationsPage.defaultProps = {
  userRole: '',
  schoolId: '',
};

const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

const mapDispatchToProps = {
  resetUserData,
};

// Exports the ReservationsPage component as the default export for the ReservationsPage module.
export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage);
