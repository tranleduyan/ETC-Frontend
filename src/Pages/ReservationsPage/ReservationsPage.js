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
import { HiArrowSmRight, HiChevronRight, HiMinusCircle, HiPlus } from 'react-icons/hi';
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
    console.log(selectedModels);
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
  const SelectModel = (modelId) => {
    let updatedSelectedModels = [...selectedModels];

    if(updatedSelectedModels.includes(modelId)) {
      updatedSelectedModels = updatedSelectedModels.filter(id => id !== modelId);
    }
    else {
      updatedSelectedModels.push(modelId);
    }

    setSelectedModels(updatedSelectedModels);
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
                <div className='ReservationsPage-ActionButtonContainer'>
                  {isMakingReservation ? 
                    <>
                      <StandardButton
                        title='Cancel'
                        onClick={OnCancelReservationCreationClick}
                        className='ReservationsPage-CancelButton'
                        icon={HiMinusCircle}/>
                      <StandardButton 
                        title='Continue'
                        onClick={OnContinueMakingReservationClick}
                        className='ReservationsPage-ContinueButton'
                        icon={HiArrowSmRight}/>
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
              <AvailableModelList 
                availableModels={availableModels}
                selectedModels={selectedModels}
                onSelectModel={SelectModel}
                isMakingReservation={isMakingReservation}
              />
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
