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
import { HiArrowSmRight, HiCalendar, HiCheck, HiChevronLeft, HiChevronRight, HiExclamationCircle, HiMinusCircle, HiPencilAlt, HiPlus, HiRefresh, HiX } from 'react-icons/hi';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
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
  
  const [isMyReservationMode, setIsMyReservationMode] = useState(false);

  const [isMyReservation, setIsMyReservation] = useState(false);

  // State variable for icon modal
  const [iconModal, setIconModal] = useState({
    message: '',
    visibility: false,
    icon: HiExclamationCircle,
    isIconSpin: false,
  });

  // State variable for page state
  const [pageState, setPageState] = useState('Reservation Creation');

  // State variable for reservations filter status
  const [reservationsFilterStatus, setReservationsFilterStatus] = useState('Approved');

  // State variable for selected reservation
  const [selectedReservation, setSelectedReservation] = useState(null);

  // State variable for details of selected reservation
  const [selectedReservationDetails, setSelectedReservationDetails] = useState([]);

  // State variable for detecting mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

  // State variable for indicating visibility of right panel
  const [reservations, setReservations] = useState([]);

  const [isRightPanelVisible, setIsRightPanelVisible] = useState(window.innerWidth >= 480);

  const OnMyReservationsClick = () => {
    setIsMyReservationMode(!isMyReservationMode);
  };

  // Close detail section when clicked on the "X" icon
  const CloseDetailSection = () => {
    setSelectedReservation(null);
  };

  // UpdateMobileView - To set the isMobileVIew if window.innerWidth is smaller than 480px.
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

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
  
  // Handle "Back" button click
  const OnBack = () => {
    if(pageState === 'Your Reservations') {
      setPageState('Reservation Creation');
      setDateInformation({
        startDate: new Date(),
        endDate: new Date(),
      });
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

  const OnReservationCardClick = async(selectedReservation) => {
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

  // Handle when "Confirm" button is clicked during reservation creation
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
          setAvailableModels([]);
        }, 1500);
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

  const OnEditReservationClick = () => {
    console.log('edit reservation click');
  };

  const OnCancelReservationClick = () => {
    console.log('cancel reservation Click');
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

  useEffect(() => {
    if(pageState === 'Your Reservations') {
      if(reservationsFilterStatus === 'Approved') {
        FetchApprovedReservations();
      }
      else if(reservationsFilterStatus === 'Requested') {
        FetchRequestedReservations();
      }
    }
    // eslint-disable-next-line
  }, [pageState, reservationsFilterStatus]);

  useEffect(() => {
    if(selectedReservationDetails?.renterSchoolId === schoolId) {
      setIsMyReservation(true);
    }
    else {
      setIsMyReservation(false);
    }
    // eslint-disable-next-line
  }, [selectedReservationDetails]);
  
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
                      title={(userRole === 'Faculty' || userRole === 'Admin') ? 'All Reservations' : 'Your Reservations'}
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
                    {(userRole === 'Admin' || userRole === 'Faculty') && (
                      <div className='ReservationsPage-OnlyYourReservationsContainer'>
                        <IconButton
                            icon={!isMyReservationMode ? MdCheckBoxOutlineBlank : MdCheckBox}
                            className='ReservationsPage-OnlyYourReservationsButton'
                            iconClassName={`${isMyReservationMode ? 'ReservationsPage-OnlyYourReservationsButtonActive' : ''}`}
                            onClick={OnMyReservationsClick}/>
                        <p className='paragraph-1'>Only My Reservations</p>
                      </div>
                    )}
                  </div>
                  <ReservationList className='ReservationsPage-ReservationList'
                    filterStatus={reservationsFilterStatus}
                    reservations={reservations}
                    selectedReservation={selectedReservation}
                    OnReservationCardClick={OnReservationCardClick}
                    startDate={dateInformation.startDate}
                    endDate={dateInformation.endDate}
                    isMyReservationsOnly={isMyReservationMode}/>
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
                          additionalInformation={`${selectedReservationDetails?.formattedStartDate} - ${selectedReservationDetails?.formattedEndDate}`}
                          equipmentDetails={selectedReservationDetails?.details}
                          actionIcon={(isMobileView) ? HiX : null}
                          action={CloseDetailSection}
                          detailsType='reservation'/>
                        {reservationsFilterStatus === 'Requested' && (userRole === 'Admin' || userRole === 'Faculty') && (
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
                        {reservationsFilterStatus === 'Requested' && (userRole === 'Student') && (
                          <div className='ReservationsPage-ReservationActionContainer'>
                            <StandardButton
                              title={"Edit"}
                              onClick={OnEditReservationClick}
                              className='ReservationsPage-ReservationActionButton'
                              icon={HiPencilAlt}/>
                            <StandardButton
                              title={"Cancel"}
                              onClick={OnCancelReservationClick}
                              className='ReservationsPage-ReservationActionButton'
                              icon={HiMinusCircle}/>
                          </div>
                        )}
                        {reservationsFilterStatus === 'Approved' && (isMyReservation) && (
                          <div className='ReservationsPage-ReservationActionContainer'>
                            <StandardButton
                              title={"Cancel"}
                              onClick={OnCancelReservationClick}
                              className='ReservationsPage-ReservationActionButton'
                              icon={HiMinusCircle}/>
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

// Define ReservationsPage defaultProps value
ReservationsPage.defaultProps = {
  userRole: '',
  schoolId: '',
};

// Get State from storage
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Dispatch from storage
const mapDispatchToProps = {
  resetUserData,
};

// Exports the ReservationsPage component as the default export for the ReservationsPage module.
export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage);
