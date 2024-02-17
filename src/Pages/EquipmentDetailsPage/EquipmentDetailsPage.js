//#region Import Neccessary Dependencies
import React, { useState } from 'react';
//#endregion

//#region Import UI Components

//#endregion

// Import Stylings
import './EquipmentDetailsPage.css';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import { HiCheckCircle, HiChevronLeft, HiExclamationCircle, HiPencilAlt, HiSwitchHorizontal, HiTrash } from 'react-icons/hi';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import IconModal from '../../Components/Modals/IconModal/IconModal';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal/ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

//#region Import Icons

//#endregion

// Define EquipmentDetailsPage Component
function EquipmentDetailsPage() {

  // State to handle equipment model photo loading errors
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState('');

  // Model form error state and error message
  const [modelIsError, setModelIsError] = useState(false); 
  const [modelErrorMessage, setModelErrorMessage] = useState('');

  // Confirmation Modal State Object
  const [confirmationModal, setConfirmationModal] = useState({
    title: '',
    content: '',
    warning: '',
    onYes: () => {},
    onNo: () => {},
    isVisible: false,
  });

  // IsProcessing State - Determine whether is processing APIs
  const [isProcessing, setIsProcessing] = useState(false);

  // Response Modal State Object - Control visibility and content of the response
  const [responseModal, setResponseModal] = useState({
    message: '',
    error: false,
    isVisible: false,
  });

  const OnBack = () => {
    console.log('Back');
  };

  const HandleEdit = () => {
    console.log('Edit');
  };

  const DeleteEquipment = () => {
    console.log('Delete');
  };

  const ResponseIcon = () => {
    if(isProcessing) {
      return HiSwitchHorizontal;
    } else {
      return responseModal.error ? HiExclamationCircle : HiCheckCircle;
    }
  };
    
  return (
    <>
      {/* Response Modal for displaying successful messages or errors */}
      <IconModal
        className='EquipmentDetailsPage-ResponseModalContainer'
        icon={ResponseIcon()}
        iconClassName='EquipmentDetailsPage-ReponseModalIcon'
        message={responseModal.message}
        isVisible={responseModal.isVisible || isProcessing}/>
      {/* Confirmation Modal for warnings and Confirmation actions */}
      <ConfirmationModal
        className='EquipmentDetailsPage-ConfirmationModalContainer'
        title={confirmationModal.title}
        content={confirmationModal.content}
        warning={confirmationModal.warning}
        onYes={confirmationModal.onYes}
        onNo={confirmationModal.onNo}
        isVisible={confirmationModal.isVisible}/>
      <div className='EquipmentDetailsPage-ContentContainer'>
        {/* Content Header Container */}
        <div className='EquipmentDetailsPage-ContentHeaderContainer'>
          {/* Header Container */}
          <div className='EquipmentDetailsPage-HeaderContainer'>
            {/* Back Button */}
            <IconButton
              icon={HiChevronLeft}
              className='EquipmentDetailsPage-BackButton'
              onClick={OnBack}/>
            {/* Header */}
            <p className='heading-5'>AM-92871</p>
          </div>
          {/* Action Container */}
          <div className='EquipmentDetailsPage-ActionContainer'>
            <StandardButton
              title='Edit'
              onClick={HandleEdit}
              className='EquipmentDetailsPage-EditButton'
              icon={HiPencilAlt}/>
            <StandardButton
              title=''
              onClick={DeleteEquipment}
              className='EquipmentDetailsPage-DeleteButton'
              icon={HiTrash}/>
          </div>
        </div>
        <div className='EquipmentDetailsPage-Content'>
          <div className='EquipmentDetailsPage-MediaContainer'>
            <div className='EquipmentDetailsPage-Media'>
              {/* Display Model Photo */}
              {equipmentModelPhoto && (
                <img src={equipmentModelPhoto}
                    alt='Equipment Model'
                    onError={() => setEquipmentModelPhoto(null)}/>
              )}
              {/* Display Default Model Icon */}
              {!equipmentModelPhoto && (
                <div className='EquipmentDetailsPage-DefaultPhotoIconContainer'>
                  <FontAwesomeIcon
                    icon={faScrewdriverWrench}
                    className='EquipmentDetailsPage-DefaultPhotoIcon'/>
                </div>
              )}
            </div>
            <div className='EquipmentDetailsPage-TypeModelContainer'>
              <p className='heading-5'>Ammeter</p>
              <p className='paragraph-1'>Fluke 117</p>
            </div>
          </div>
          <div className='EquipmentDetailsPage-EquipmentInformationContainer'>
            <div className='EquipmentDetailsPage-InformationContainer'>
              <p className='heading-5'>Status</p>
              <div className='EquipmentDetailsPage-Information'>
                <p className='paragraph-1'>Maintenance: Ready</p>
                <p className='paragraph-1'>Reservation: Available</p>
              </div>
            </div>
            <div className='EquipmentDetailsPage-InformationContainer'>
              <p className='heading-5'>Acquisition</p>
              <div className='EquipmentDetailsPage-Information'>
                <p className='paragraph-1'>Condition: New</p>
                <p className='paragraph-1'>Cost: $200.00</p>
                <p className='paragraph-1'>Purchase Date: 11/20/2023</p>
              </div>
            </div>
            <div className='EquipmentDetailsPage-InformationContainer'>
              <p className='heading-5'>Location</p>
              <div className='EquipmentDetailsPage-Information'>
                <p className='paragraph-1'>RFID Tag: 0A28EHUA76</p>
                <p className='paragraph-1'>Current Room: 201</p>
                <p className='paragraph-1'>Home Room: 202, 102, 241</p>
              </div>
            </div>
          </div>
          <div className='EquipmentDetailsPage-UsageHistoryContainer'>
            <p className='heading-5'>Usage History</p>
            <div className='EquipmentDetailsPage-UsageHistoryList'>
              <div className='EquipmentDetailsPage-UsageHistoryCard'>
                <p className='paragraph-1 EquipmentDetailsPage-UsageHistoryCard-Date'>11/23/2023</p>
                <p className='paragraph-1 EquipmentDetailsPage-UsageHistoryCard-Time'>12:00</p>
                <p className='paragraph-1 EquipmentDetailsPage-UsageHistoryCard-Name'>Aaron Walt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default EquipmentDetailsPage;
