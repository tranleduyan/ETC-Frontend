// Import Components 
import React, { useState, useEffect } from 'react';
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
//#endregion

//#region Import Icons
import { HiArrowSmRight, HiChevronLeft, HiChevronRight, HiMinusCircle, HiPlus } from 'react-icons/hi';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import SpecifyModelReservationQuantityList from '../../Components/Lists/SpecifyModelReservationQuatityList/SpecifyModelReservationQuantityList';
//#endregion

// Define ReservationsPage Component
function ReservationsPage(props) {

  // Extract neccessary props
  const { userRole, schooldId } = props;

  // SearchQuery State variables
  const [searchQuery, setSearchQuery] = useState({
    equipmentSerialId: '',
  });

  // Date Information State Variables
  const [dateInformation, setDateInformation] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Available Models State Variable - List of available models
  const [availableModels, setAvailableModels] = useState([]);

  // Flag state for checking if isMakingReservation or not
  const [isMakingReservation, setIsMakingReservation] = useState(false);

  // State variables for list of selected models for making reservation
  const [selectedModels, setSelectedModels] = useState([]);

  // State for handling reservation creation process
  const [reservationCreationState, setReservationCreationState] = useState('Initial');

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
    console.log('Your Reservations');
  };

  // OnContinueMakingReservationClick - Handle the state of making reservation process
  const OnContinueMakingReservationClick = () => {
    if(IsValidReservationPeriod() && selectedModels.length > 0 && reservationCreationState === 'Initial') {
      setReservationCreationState('Specify Quantity');
    }
    else if(reservationCreationState === 'Specify Quantity') {
      setReservationCreationState('Confirm Reservation');
    }
  };

  const OnBack = () => {
    if(reservationCreationState === 'Specify Quantity') {
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
  
  // TODO: Search APIs
  const Search = () => {
    console.log(searchQuery);
  }

  // FetchAvailableModels - Fetch available models based on selected date range
  const FetchAvailableModels = () => {
    dateInformation.startDate.setHours(0, 0, 0, 0);
    dateInformation.endDate.setHours(0, 0, 0, 0);

    const startPeriod = dateInformation.startDate.toISOString().split('T')[0];
    const endPeriod = dateInformation.endDate.toISOString().split('T')[0];

    axios
      .get(`${API.domain}/api/inventory/available-models?startDate=${startPeriod}&endDate=${endPeriod}`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setAvailableModels(response.data.responseObject);
      })
      .catch(() => {
        setAvailableModels([]);
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
    if(dateInformation.startDate < today) {
      return false;
    }
    else if(dateInformation.startDate > dateInformation.endDate) {
      return false;
    }

    return true;
  };

  // Fetch availble models whenever valid date range changes
  useEffect(() => {
    if(IsValidReservationPeriod()) {
      FetchAvailableModels();
    }
    // eslint-disable-next-line
  }, [dateInformation.startDate, dateInformation.endDate]);

  return (
    <>
      {userRole === 'Admin' ? (
        <GeneralPage>
          <div className='ReservationsPage-PageContentContainer'>
            <div className='ReservationsPage-PageHeaderContainer'>
              <Logo className='ReservationsPage-LogoContainer'/>
              <p className='heading-2'>Reservations</p>
            </div>
            <div className='ReservationsPage-ContentContainer'>
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
                        className='ReservationsPage-ReservationDateField'
                        name='startDate'
                        placeholder='Select start date'
                        value={dateInformation.startDate}
                        onChange={(name, value) => HandleDateInputChange(name, value)}/>
                      <DatePickerInputField
                        className='ReservationsPage-ReservationDateField'
                        name='endDate'
                        placeholder='Select end date'
                        value={dateInformation.endDate}
                        onChange={(name, value) => HandleDateInputChange(name, value)}/>
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
                        title='Continue'
                        onClick={OnContinueMakingReservationClick}
                        className='ReservationsPage-ContinueButton'
                        icon={HiArrowSmRight}/>
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
                        title='Your Reservations'
                        onClick={OnYourReservationsClick}
                        className='ReservationsPage-YourReservationsButton'
                        icon={HiChevronRight}/>                
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
            </div>
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
