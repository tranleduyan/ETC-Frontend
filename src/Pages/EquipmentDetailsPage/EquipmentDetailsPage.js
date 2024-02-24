//#region Import Neccessary Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API } from '../../Constants';
import { connect } from 'react-redux';
import { resetUserData } from '../../storage';
//#endregion

//#region Import UI Components
import Message from '../../Components/Message/Message';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import IconModal from '../../Components/Modals/IconModal/IconModal';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal/ConfirmationModal';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
//#endregion

// Import Stylings
import './EquipmentDetailsPage.css';
//#endregion

//#region Import Icons
import { HiCheckCircle, HiChevronLeft, HiExclamationCircle, HiPencilAlt, HiSwitchHorizontal, HiTrash } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
//#endregion

// Define EquipmentDetailsPage Component
function EquipmentDetailsPage(props) {

  // Extract relevant information
  const { setDetailSection, setEditSection, schoolId, equipmentSerialId, setIsUpdated } = props;

  // State to handle equipment model photo loading errors
  const [equipmentModelPhoto, setEquipmentModelPhoto] = useState('');
  const [equipmentInformation, setEquipmentInformation] = useState({
    typeName: '',
    modelName: '',
    serialId: '',
    maintenanceStatus: '',
    reservationStatus: '',
    usageCondition: '',
    purchaseCost: '',
    purchaseDate: '',
    rfidTag: '',
    currentRoom: '',
    homeRooms: [],
    usageHistory: [],
  });

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

  // OnBack - Handle back action
  const OnBack = () => {
    setDetailSection('');
    setEditSection('');
    setEquipmentModelPhoto('');
    setEquipmentInformation({
      typeName: '',
      modelName: '',
      serialId: '',
      maintenanceStatus: '',
      reservationStatus: '',
      usageCondition: '',
      purchaseCost: '',
      purchaseDate: '',
      rfidTag: '',
      currentRoom: '',
      homeRooms: [],
      usageHistory: [],
    });
  };

  // CloseConfirmationModal - Hide/Close the confirmation modal
  const CloseConfirmationModal = () => {
    setConfirmationModal({
      title: '',
      content: '',
      warning: '',
      onYes: () => {},
      onNo: () => {},
      isVisible: false,
    });
  };

  // HandleEdit - Handle Edit Action
  const HandleEdit = () => {
    setEditSection('Equipment');
  };

  // DeleteEquipment - Delete the equipment upon yes selection, else close the confirmation modal if no.
  const DeleteEquipment = () => {
    setConfirmationModal({
      title: `Remove Equipment`,
      content: `Are you sure you want to remove ${equipmentInformation.serialId}?`,
      warning: `This will also permanently delete ${equipmentInformation.serialId} and the action cannot be undone.`,
      onYes: () => {
        CloseConfirmationModal();
        setResponseModal({
          message: `Deleting ${equipmentInformation.serialId}...`,
          isVisible: true,
        });
        setIsProcessing(true);

        axios
          .delete(`${API.domain}/api/inventory/equipment`, {
            headers: {
              'X-API-KEY': API.key,
            },
            data: {
              schoolId: schoolId,
              serialId: [equipmentInformation.serialId],
            },
          })
          .then(response => {
            setIsProcessing(false);
            setResponseModal({
              message: `${equipmentInformation.serialId} has been successfully removed from the inventory.`,
              error: false,
              isVisible: true,
            });
            setTimeout(() => {
              setResponseModal({
                message: '',
                error: false,
                isVisible: false,
              });
              OnBack();
            }, 1500);
            setIsUpdated(true);
          })
          .catch(error => {
            setIsProcessing(false);
            setResponseModal({
              message: `Something went wrong while deleting ${equipmentInformation.serialId}.`,
              error: true,
              isVisible: true,
            });
            setTimeout(() => {
              setResponseModal({
                message: '',
                error: false,
                isVisible: false,
              });
            }, 1500);
            setIsUpdated(false);
          });
      },
      // Close the confirmation modal if choose not to proceed further
      onNo: () => {
        CloseConfirmationModal();
      },
      isVisible: true,
    })
  };

  // ResponseIcon - Determine response icon based on processing state
  const ResponseIcon = () => {
    if(isProcessing) {
      return HiSwitchHorizontal;
    } else {
      return responseModal.error ? HiExclamationCircle : HiCheckCircle;
    }
  };
  
  // FetchEquipmentInformation - Fetch equipment information
  const FetchEquipmentInformation = () => {
    axios
      .get(`${API.domain}/api/inventory/equipment/${equipmentSerialId}`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setEquipmentModelPhoto(response.data.responseObject.modelPhoto);
        
        setEquipmentInformation({
          typeName: response.data.responseObject.typeName,
          modelName: response.data.responseObject.modelName,
          serialId: response.data.responseObject.serialId,
          maintenanceStatus: response.data.responseObject.maintenanceStatus,
          reservationStatus: response.data.responseObject.reservationStatus,
          usageCondition: response.data.responseObject.usageCondition,
          purchaseCost: response.data.responseObject.purchaseCost !== '$--.--' ? `$${response.data.responseObject.purchaseCost}`
                                                                               : response.data.responseObject.purchaseCost,
          purchaseDate: response.data.responseObject.purchaseDate,
          rfidTag: response.data.responseObject.rfidTag,
          currentRoom: response.data.responseObject.currentRoom,
          homeRooms: response.data.responseObject.homeRooms,
          usageHistory: [],
        });
      })
      .catch(error => {
        setResponseModal({
          message: 'Something went wrong while retrieving the current equipment information.',
          error: true,
          isVisible: true,
        });
        setTimeout(() => {
          setResponseModal({
            message: '',
            error: false,
            isVisible: false,
          });
          OnBack();
        }, 1500);
      });
  };

  useEffect(() => {
    FetchEquipmentInformation();
    // eslint-disable-next-line
  }, []);

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
            <p className='heading-5'>{equipmentInformation.serialId}</p>
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
              <p className='heading-5'>{equipmentInformation.typeName}</p>
              <p className='paragraph-1'>{equipmentInformation.modelName}</p>
            </div>
          </div>
          <div className='EquipmentDetailsPage-EquipmentInformationContainer'>
            <div className='EquipmentDetailsPage-InformationContainer'>
              <p className='heading-5'>Status</p>
              <div className='EquipmentDetailsPage-Information'>
                <p className='paragraph-1'>Maintenance: {equipmentInformation.maintenanceStatus}</p>
                <p className='paragraph-1'>Reservation: {equipmentInformation.reservationStatus}</p>
              </div>
            </div>
            <div className='EquipmentDetailsPage-InformationContainer'>
              <p className='heading-5'>Acquisition</p>
              <div className='EquipmentDetailsPage-Information'>
                <p className='paragraph-1'>Condition: {equipmentInformation.usageCondition}</p>
                <p className='paragraph-1'>Cost: {equipmentInformation.purchaseCost}</p>
                <p className='paragraph-1'>Purchase Date: {equipmentInformation.purchaseDate}</p>
              </div>
            </div>
            <div className='EquipmentDetailsPage-InformationContainer'>
              <p className='heading-5'>Location</p>
              <div className='EquipmentDetailsPage-Information'>
                <p className='paragraph-1'>RFID Tag: {equipmentInformation.rfidTag}</p>
                <p className='paragraph-1'>Current Room: {equipmentInformation.currentRoom}</p>
                <p className='paragraph-1'>Home Room: {equipmentInformation.homeRooms?.length > 0 ? equipmentInformation.homeRooms : 'None'}</p>
              </div>
            </div>
          </div>
          <div className='EquipmentDetailsPage-UsageHistoryContainer'>
            <p className='heading-5'>Usage History</p>
              {/** For future use.
                <div className='EquipmentDetailsPage-UsageHistoryList'>
                  <div className='EquipmentDetailsPage-UsageHistoryCard'>
                    <p className='paragraph-1 EquipmentDetailsPage-UsageHistoryCard-Date'>11/23/2023</p>
                    <p className='paragraph-1 EquipmentDetailsPage-UsageHistoryCard-Time'>12:00</p>
                    <p className='paragraph-1 EquipmentDetailsPage-UsageHistoryCard-Name'>Aaron Walt</p>
                  </div>
                </div>
              */}
              {equipmentInformation.usageHistory?.length === 0 &&
                <Message 
                  message={'The equipment has not been used by anyone.'} 
                  className='EquipmentDetailsPage-EmptyUsageHistoryMessage'/>
              }
          </div>
        </div>
        <div className='EquipmentDetailsPage-MobileBottomActionContainer'>
          <StandardButton
                title='Edit'
                onClick={HandleEdit}
                className='EquipmentDetailsPage-MobileEditButton'
                icon={HiPencilAlt}/>
        </div>
      </div>
    </>
  )
};

// Define PropTypes for the component
EquipmentDetailsPage.propTypes = {
  setDetailSection: PropTypes.func.isRequired,
  setEditSection: PropTypes.func.isRequired,
  schoolId: PropTypes.string,
  equipmentSerialId: PropTypes.string.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};

// Define defaultProps
EquipmentDetailsPage.defaultProps = {
  schoolId: '',
}; 

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Connect the component to Redux, mapping state and actions to props
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentDetailsPage);
