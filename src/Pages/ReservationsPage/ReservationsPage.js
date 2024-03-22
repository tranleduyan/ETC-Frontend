// Import Components 
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './ReservationsPage.css';

//#region Import UI Components
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import SearchBarInputField from '../../Components/InputFields/SearchBarInputField';
//#endregion

//#region Import Icons
import { HiArrowSmRight, HiChevronLeft, HiChevronRight, HiExclamation, HiMinusCircle, HiPlus } from 'react-icons/hi';
import DatePickerInputField from '../../Components/InputFields/DatePickerInputField/DatePickerInputField';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import AvailableModelList from '../../Components/Lists/AvailableModelList/AvailableModelList';
import axios from 'axios';
import { API } from '../../Constants';
//#endregion

// Define ReservationsPage Component
function ReservationsPage() {

  const [searchQuery, setSearchQuery] = useState({
    equipmentSerialId: '',
  });

  const [dateInformation, setDateInformation] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [availableModels, setAvailableModels] = useState([]);

  const [isMakingReservation, setIsMakingReservation] = useState(false);

  const [selectedModels, setSelectedModels] = useState([]);

  const [reservationCreationState, setReservationCreationState] = useState('Initial');

  // HandleSearchQueryChange - Function to handle changes in search query
  const HandleSearchQueryChange = (propertyName, inputValue) => {
    setSearchQuery({...searchQuery, [propertyName]: inputValue});
  };

  const HandleDateInputChange = (propertyName, inputValue) => {
    setDateInformation({...dateInformation, [propertyName]: inputValue});
  };

  const OnReserveClick = () => {
    if(IsValidReservationPeriod()) {
      setIsMakingReservation(true);
    }
  };

  const OnYourReservationsClick = () => {
    console.log('Your Reservations');
  };

  const OnContinueMakingReservationClick = () => {
    console.log(selectedModels);
  };

  const OnCancelReservationCreationClick = () => {
    setIsMakingReservation(false);
    setSelectedModels([]);
  }
  
  // TODO: Search APIs
  const Search = () => {
    console.log(searchQuery);
  }

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
      .catch(error => {
        setAvailableModels([]);
      })
  }

  const SelectModel = (modelId) => {
    let updatedSelectedModels = [...selectedModels];

    if(updatedSelectedModels.includes(modelId)) {
      updatedSelectedModels = updatedSelectedModels.filter(id => id != modelId);
    }
    else {
      updatedSelectedModels.push(modelId);
    }

    setSelectedModels(updatedSelectedModels);
  };

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

  useEffect(() => {
    if(IsValidReservationPeriod()) {
      FetchAvailableModels();
    }
  }, [dateInformation.startDate, dateInformation.endDate]);

  return (
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
  )
};

// Define propTypes for ReservationPage
ReservationsPage.propTypes = {

};

ReservationsPage.defaultProps = {

};

// Exports the ReservationsPage component as the default export for the ReservationsPage module.
export default ReservationsPage;
