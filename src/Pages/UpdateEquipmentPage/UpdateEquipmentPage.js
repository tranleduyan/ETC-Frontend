//#region Import Neccessary Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API, MESSAGE, OPTIONS } from '../../Constants';
import { connect } from 'react-redux';
import { resetUserData } from '../../storage';
import PropTypes from 'prop-types';
//#endregion

//#region Import UI Components
import IconModal from '../../Components/Modals/IconModal/IconModal';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal/ConfirmationModal';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import EquipmentForm from '../../Components/Forms/EquipmentForm';
//#endregion

// Import Stylings
import './UpdateEquipmentPage.css';

//#region Import Icons
import { HiBookmarkAlt, HiChevronLeft, HiTrash,
         HiSwitchHorizontal, HiExclamationCircle, HiCheckCircle} from 'react-icons/hi';
//#endregion

// Define UpdateEquipmentPage Component
function UpdateEquipmentPage(props) {
  
  // Extract relevant information
  const { detailSection, setDetailSection, setEditSection, equipmentSerialId, schoolId, setIsUpdated } = props;

  // Contains all the equipment models information
  const [equipmentModels, setEquipmentModels] = useState([]);

  // Options for equipment models dropdowns
  const [equipmentModelOptions, setEquipmentModelOptions] = useState([]);
  const [initialModel, setInitialModel] = useState(null);

  // Options for equipment types dropdowns
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState([]);

  // Equipment form error state and error message
  const [equipmentIsError, setEquipmentIsError] = useState(false);
  const [equipmentErrorMessage, setEquipmentErrorMessage] = useState('');

  // Information of the equipment
  const [equipmentInformation, setEquipmentInformation] = useState({
    serialNumber: '',
    type: null,
    model: null,
    maintenanceStatus: '',
    reservationStatus: OPTIONS.equipment.reservationStatus.find(
      (status) => status.value === 'Available'
    ),
    rfidTag: '',
    homeLocation: null,
    condition: '',
    purchaseCost: '',
    purchaseDate: null,
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

  // OnBack - Set editSection to empty to hide the component and show the previous page.
  const OnBack = () => {
    setEditSection('');
    setEquipmentInformation({
      serialNumber: '',
      type: null,
      model: null,
      maintenanceStatus: '',
      reservationStatus: OPTIONS.equipment.reservationStatus.find(
        (status) => status.value === 'Available'
      ),
      rfidTag: '',
      homeLocation: null,
      condition: '',
      purchaseCost: '',
      purchaseDate: null,
    });
  };

  // SaveUpdate - Save the updates made to equipment
  const SaveUpdate = () => {
    if(IsEquipmentFormValid()) {
      // Show processing message
      setIsProcessing(true);
      setResponseModal({
        message: 'Saving the updates...',
        error: false,
        isVisible: true,
      });

      const requestBody = {
        schoolId: schoolId,
        typeId: equipmentInformation.type.value,
        modelId: equipmentInformation.model.value,
        maintenanceStatus: equipmentInformation.maintenanceStatus.value,
        reservationStatus: equipmentInformation.reservationStatus.value,
        usageCondition: equipmentInformation.condition.value,
        purchaseCost: parseFloat(equipmentInformation.purchaseCost),
        purchaseDate: equipmentInformation.purchaseDate ? new Date(equipmentInformation.purchaseDate).toISOString().split('T')[0] : null,
      };

      // Perform API call for equipment type update
      axios
        .put(`${API.domain}/api/inventory/equipment/${equipmentSerialId}`, requestBody, {
          headers: {
            'X-API-KEY': API.key,
          },
        })
        .then(response => {
          // Hide processing message
          setIsProcessing(false);

          // Show success message
          setResponseModal({
            message: MESSAGE.successEquipmentUpdate,
            error: false,
            isVisible: true
          });

          // Turn off the response modal after 1500ms.
          setTimeout(() => {
            setResponseModal({
              message: '',
              error: false,
              isVisible: false,
            });
          }, 1500);
          
          setIsUpdated(true);
        })
        .catch(error => {
          // Hide processing message
          setIsProcessing(false);

          // Show error message
          setResponseModal({
            message: 'Something went wrong while updating the current equipment.',
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
    }
  };

  // DeleteEquipment - Delete the current equipment 
  const DeleteEquipment = () => {
    // Show confirmation modal for type deletion
    setConfirmationModal({
      title: 'Remove Equipment',
      content: `Are you sure you want to remove ${equipmentSerialId}?`,
      warning: `This will also permanently delete ${equipmentSerialId} and the action cannot be undone.`,
      onYes: () => {
        // Close confirmation modal
        CloseConfirmationModal();

        // Show processing message
        setResponseModal({
          message: `Deleting ${equipmentSerialId}...`,
          isVisible: true,
        });

        setIsProcessing(true);

        // Perform API call for equipment deletion
        axios
          .delete(`${API.domain}/api/inventory/equipment`, {
            headers: {
              'X-API-KEY': API.key,
            },
            data: {
              schoolId: schoolId,
              serialId: [equipmentSerialId],
            },
          })
          .then(response => {
            // Hide processing message
            setIsProcessing(false);

            // Show success message
            setResponseModal({
              message: `${equipmentSerialId} has been successfully removed from the inventory.`,
              error: false,
              isVisible: true,
            });

            // Turn off the response modal after 1500ms and navigate back.
            setTimeout(() => {
              setResponseModal({
                message: '',
                error: false,
                isVisible: false,
              });

              setEditSection('');
              setEquipmentInformation({
                serialNumber: '',
                type: null,
                model: null,
                maintenanceStatus: '',
                reservationStatus: OPTIONS.equipment.reservationStatus.find(
                  (status) => status.value === 'Available'
                ),
                rfidTag: '',
                homeLocation: null,
                condition: '',
                purchaseCost: '',
                purchaseDate: null,
              });

              if(detailSection) {
                setDetailSection('');
              }
            }, 1500);
            setIsUpdated(true);
          })
          .catch(error => {
            // Hide processing message
            setIsProcessing(false);

            // Show error message
            setResponseModal({
              message: 'Something went wrong while deleting the equipment.',
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

  // IsEquipmentFormValid - Check for form validation
  const IsEquipmentFormValid = () => {
    if(!equipmentInformation.serialNumber) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage('Please enter the equipment serial number.');
      return false;
    }
    
    if(!equipmentInformation.type) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage('Please enter the equipment type.');
      return false;
    }

    if (!equipmentInformation.model) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage('Please enter the equipment model.');
      return false;
    }

    if (!equipmentInformation.maintenanceStatus) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage('Please select the maintenance status.');
      return false;
    }

    if (!equipmentInformation.reservationStatus) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage('Please select the reservation status.');
      return false;
    }

    if (!equipmentInformation.condition) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage('Please select the equipment condition.');
      return false;
    }

    if(equipmentIsError) {
      setEquipmentIsError(false);
      setEquipmentErrorMessage('');
    }

    return true;
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

  // ResponseIcon - Determine the icon for the response modal
  const ResponseIcon = () => {
    if (isProcessing) {
      return HiSwitchHorizontal;
    } else {
      return responseModal.error ? HiExclamationCircle : HiCheckCircle;
    }
  };

  // FetchAllTypeOptions - Fetching all the types available.
  const FetchAllTypeOptions = () => {
    axios
      .get(`${API.domain}/api/inventory/types`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        const options = response.data.responseObject.map(type => ({
          value: type.typeId,
          label: type.typeName,
        }));

        setEquipmentTypeOptions(options);
      })
      .catch(error => {
        setEquipmentTypeOptions([]);
      });
  };

  // Fetch all the types for options upon mounting
  useEffect(() => {
    FetchAllTypeOptions();
    // eslint-disable-next-line
  }, [])

  // Only fetch if there are equipmentTypeOptions and equipmentModelOptions 
  useEffect(() => {
    if(equipmentTypeOptions) {
      axios
        .get(`${API.domain}/api/inventory/equipment/${equipmentSerialId}`, {
          headers: {
            'X-API-KEY': API.key,
          }
        })
        .then(response => {
          const responseObject = response.data.responseObject;
          const equipmentInfo = {
            serialNumber: responseObject.serialId,
            type: equipmentTypeOptions.find((type) => type.label === responseObject.typeName),
            model: null,
            maintenanceStatus: OPTIONS.equipment.maintenanceStatus.find((status) => status.value === responseObject.maintenanceStatus),
            reservationStatus: OPTIONS.equipment.reservationStatus.find((status) => status.value === responseObject.reservationStatus),
            rfidTag: '',
            homeLocation: null,
            condition: OPTIONS.equipment.conditions.find((condition) => condition.value === responseObject.usageCondition),
            purchaseCost: response.data.responseObject.purchaseCost === '$--.--' ? ''
                                                                                 : parseFloat(responseObject.purchaseCost.replace('$', '')),
            purchaseDate: response.data.responseObject.purchaseDate === '--/--/----' ? '' 
                                                                                     : new Date(responseObject.purchaseDate),
          };

          setEquipmentInformation(equipmentInfo);
          setInitialModel(responseObject.modelName);
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
    }
  // eslint-disable-next-line
  }, [equipmentTypeOptions]);

  // Fetch all the equipment models of a selected type.
  useEffect(() => {
    // If the equipment type is selected, fetch all the equipment models of a selected type
    if(equipmentInformation.type != null) {
      // HTTP get request to fetch all the models of a selected type.
      axios.get(`${API.domain}/api/inventory/types/${equipmentInformation.type.value}/models`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        // Map value and label
        const options = response.data.responseObject?.map(model => ({
          value: model.modelId,
          label: model.modelName,
        }));
        
        // Set the equipmentModels to the response object - Array of all models of a type
        setEquipmentModels(response.data.responseObject);
        
        // Set the equipmentModelOptions to options
        setEquipmentModelOptions(options);
      })
      .catch(error => {
        // If not found, reset to empty equipment models and options
        if(error.response.status === 404) {
          setEquipmentModels([]);
          setEquipmentModelOptions([]);
        }
      });
    }

    setEquipmentInformation({...equipmentInformation, 'model': null});
    // eslint-disable-next-line
  }, [equipmentInformation.type]);

  // Set equipment model if available from initial model options
  useEffect(() => {
    if(initialModel && equipmentModelOptions.length > 0) {
      setEquipmentInformation({...equipmentInformation, 'model': equipmentModelOptions.find((model) => (model.label === initialModel))});
      setInitialModel(null);
    }
    // eslint-disable-next-line
  }, [initialModel, equipmentModelOptions]);

  return (
    <>
      {/* Response Modal for displaying successful messages or errors */}
      <IconModal
        className='UpdateEquipmentPage-ResponseModalContainer'
        icon={ResponseIcon()}
        iconClassName='UpdateEquipmentPage-ResponseModalIcon'
        message={responseModal.message}
        isVisible={responseModal.isVisible || isProcessing} />
      {/* Confirmation Modal for warnings and confirmation actions */}
      <ConfirmationModal
        className='UpdateEquipmentPage-ConfirmationModalContainer'
        title={confirmationModal.title}
        content={confirmationModal.content}
        warning={confirmationModal.warning}
        onYes={confirmationModal.onYes}
        onNo={confirmationModal.onNo}
        isVisible={confirmationModal.isVisible} />
      <div className='UpdateEquipmentPage-ContentContainer'>
        {/* Content Header Container */}
        <div className='UpdateEquipmentPage-ContentHeaderContainer'>
          {/* Header Container */}
          <div className='UpdateEquipmentPage-HeaderContainer'>
            {/* Back Button */}
            <IconButton
              icon={HiChevronLeft}
              className='UpdateEquipmentPage-BackButton'
              onClick={OnBack} />
            {/* Header */}
            <p className='heading-5'>Update Equipment</p>
          </div>
          {/* Action Container*/}
          <div className='UpdateEquipmentPage-ActionContainer'>
            <StandardButton
              title='Save'
              onClick={SaveUpdate}
              className='UpdateEquipmentPage-SaveButton'
              icon={HiBookmarkAlt}/>
            <StandardButton
              title=''
              onClick={DeleteEquipment}
              className='UpdateEquipmentPage-DeleteButton'
              icon={HiTrash}/>
          </div>
        </div>
        {/* Equipment Form */}
        <EquipmentForm
          equipmentInformation={equipmentInformation}
          setEquipmentInformation={setEquipmentInformation}
          isError={equipmentIsError}
          errorMessage={equipmentErrorMessage}
          equipmentModels={equipmentModels}
          equipmentModelOptions={equipmentModelOptions}
          equipmentTypeOptions={equipmentTypeOptions}
          disableSerialNumber={true}/>
        {/* Mobile Save Update Button */}
        <StandardButton
          title='Save'
          onClick={SaveUpdate}
          className='UpdateEquipmentPage-MobileSaveButton'
          icon={HiBookmarkAlt}/>
      </div>
    </>
  )
};

// Define PropTypes
UpdateEquipmentPage.propTypes = {
  detailSection: PropTypes.string.isRequired,
  setDetailSection: PropTypes.func,
  setEditSection: PropTypes.func.isRequired,
  equipmentSerialId: PropTypes.string.isRequired,
  schoolId: PropTypes.string,
  setIsUpdated: PropTypes.func.isRequired,
};

// Define defaultProps
UpdateEquipmentPage.defaultProps = {
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateEquipmentPage);
