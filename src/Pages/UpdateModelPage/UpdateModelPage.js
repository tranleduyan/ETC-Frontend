//#region Import Neccessary Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API, MESSAGE } from '../../Constants';
import { connect } from 'react-redux';
//#endregion

//#region Import UI Components
import IconModal from '../../Components/Modals/IconModal/IconModal';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal/ConfirmationModal';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import ModelForm from '../../Components/Forms/ModelForm/ModelForm';
//#endregion

// Import Stylings
import './UpdateModelPage.css';

//#region Import Icons
import { HiBookmarkAlt, HiChevronLeft, HiTrash,
         HiSwitchHorizontal, HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';
//#endregion

// Define UpdateModelPage Component
function UpdateModelPage(props) {

  // Extract relevant information
  const { setEditSection, modelId, schoolId, setIsUpdated } = props; 

  // Types options
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState([]);

  // Information for updating model
  const [modelInformation, setModelInformation] = useState({
    name: '',
    type: null,
    photo: null,
  });

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

    // IsModelFormValid - Check for form validation
    const IsModelFormValid = () => {
      if(!modelInformation.name) {
        setModelIsError(true);
        setModelErrorMessage('Please enter the model name.');
        return false;
      }
  
      if(!modelInformation.type) {
        setModelIsError(true);
        setModelErrorMessage('Please select the model type.');
        return false;
      }
  
      if(!modelInformation.photo) {
        setModelIsError(true);
        setModelErrorMessage('Please upload the model photo.');
        return false;
      }
  
      if(modelIsError) {
        setModelIsError(false);
        setModelErrorMessage('');
      }
  
      return true;
    };

  // OnBack - Set editSection to empty to hide the component and show the previous page.
  const OnBack = () => {
    setEditSection('');
    setModelInformation({
      name: '',
      type: null,
      photo: null,
    });
  };

  // SaveUpdate - Update the model information
  const SaveUpdate = () => {
    if(IsModelFormValid()) {
      setIsProcessing(true);
      setResponseModal({
        message: 'Saving the updates...',
      });

      // Form data to submit
      const formData = new FormData();

      //Appened necessary information to the form data
      formData.append('modelName', modelInformation.name);
      formData.append('typeId', modelInformation.type.value);
      formData.append('image', modelInformation.photo);
      formData.append('schoolId', schoolId);

      axios
        .put(`${API.domain}/api/inventory/models/${modelId}`, formData, {
          headers: {
            'X-API-KEY': API.key,
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          setIsProcessing(false);

          setResponseModal({
            message: MESSAGE.successModelUpdate,
            error: false,
            isVisible: true,
          });

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
          setIsProcessing(false);
          setResponseModal({
            message: 'Something went wrong while updating the current type.',
            error: true,
            isVisible: true,
          });
          setTimeout(() => {
            setResponseModal({
              message: '',
              error: false,
              isVisible: false,
            })
          }, 1500);
          setIsUpdated(false);
        });
    }
  };

  // DeleteModel - Delete the model
  const DeleteModel = () => {
    setConfirmationModal({
      title: 'Remove Model',
      content: 'Are you sure you want to remove the current equipment model?',
      warning: 'This will also permanently delete all equipment associated with the current model and the action cannot be undone.',
      onYes: () => {
        CloseConfirmationModal();
        setResponseModal({
          message: 'Deleting the current model...',
          isVisible: true,
        });

        // Set state to is processing
        setIsProcessing(true);

        // Process - perform deletion api
        axios
          .delete(`${API.domain}/api/inventory/models`, {
            headers: {
              'X-API-KEY': API.key,
            },
            data: {
              schoolId: schoolId,
              modelIds: [modelId],
            },
          })
          .then(response => {
            setIsProcessing(false);
            setResponseModal({
              message: MESSAGE.successModelRemoval,
              error: false,
              isVisible: true,
            });
            setTimeout(() => {
              setResponseModal({
                message: '',
                error: false,
                isVisible: false,
              });
            }, 1500);
            
            setIsUpdated(true);

            // Return to the previous page
            OnBack();
          })
          .catch(error => {
            setIsProcessing(false);
            setResponseModal({
              message: 'Something went wrong while deleting the current model.',
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

  // ResponseIcon - Determine the icon for the response modal
  const ResponseIcon = () => {
    if (isProcessing) {
      return HiSwitchHorizontal;
    } else {
      return responseModal.error ? HiExclamationCircle : HiCheckCircle;
    }
  };

  const FetchModelInformation = () => {
    axios
      .get(`${API.domain}/api/inventory/models/${modelId}`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        const typeId = response.data.responseObject.typeId;

        // Find the corresponding type option based on typeId
        const currentType = equipmentTypeOptions.find(option => option.value === typeId);

        setModelInformation({
          name: response.data.responseObject.modelName,
          photo: response.data.responseObject.modelPhoto,
          type: currentType,
        })
      })
      .catch(error => {
        setResponseModal({
          message:'Something went wrong while retrieving the current model information.',
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
        OnBack();
      });
  };

  const FetchAllTypeOptions = () => {
    axios.get(`${API.domain}/api/inventory/types`, {
      headers: {
        'X-API-KEY': API.key,
      }
    })
    .then(response => {
      // Map Value and Label
      const options = response.data.responseObject.map(type => ({
        value: type.typeId,
        label: type.typeName,
      }));

      // Set the options
      setEquipmentTypeOptions(options);
    })
    .catch(error => {
      // Type not found
      setEquipmentTypeOptions([]);
    });
  };

  useEffect(() => {
    FetchAllTypeOptions();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(equipmentTypeOptions) {
      FetchModelInformation();
    }
    // eslint-disable-next-line
  }, [equipmentTypeOptions]);

  return (
    <>
      {/* Response Modal for displaying successful messages or errors */}
      <IconModal
        className='UpdateModelPage-ResponseModalContainer'
        icon={ResponseIcon()}
        iconClassName='UpdateModelPage-ResponseModalIcon'
        message={responseModal.message}
        isVisible={responseModal.isVisible || isProcessing} />
      {/* Confirmation Modal for warnings and confirmation actions */}
      <ConfirmationModal
        className='UpdateModelPage-ConfirmationModalContainer'
        title={confirmationModal.title}
        content={confirmationModal.content}
        warning={confirmationModal.warning}
        onYes={confirmationModal.onYes}
        onNo={confirmationModal.onNo}
        isVisible={confirmationModal.isVisible} />
      <div className='UpdateModelPage-ContentContainer'>
        {/* Content Header Container */}
        <div className='UpdateModelPage-ContentHeaderContainer'>
          {/* Header Container */}
          <div className='UpdateModelPage-HeaderContainer'>
            {/* Back Button */}
            <IconButton
              icon={HiChevronLeft}
              className='UpdateModelPage-BackButton'
              onClick={OnBack}/>
            {/* Header */}
            <p className='heading-5'>Update Model</p>
          </div>
          {/* Action Container */}
          <div className='UpdateModelPage-ActionContainer'>
            <StandardButton
              title='Save'
              onClick={SaveUpdate}
              className='UpdateModelPage-SaveButton'
              icon={HiBookmarkAlt}/>
            <StandardButton
              title=''
              onClick={DeleteModel}
              className='UpdateModelPage-DeleteButton'
              icon={HiTrash}/>
          </div>
        </div>
        {/* Model Form */}
        <ModelForm
          modelInformation={modelInformation}
          setModelInformation={setModelInformation}
          isError={modelIsError}
          errorMessage={modelErrorMessage}
          equipmentTypeOptions={equipmentTypeOptions}/>
        {/* Mobile Save Update Button */}
        <StandardButton
          title='Save'
          onClick={SaveUpdate}
          className='UpdateModelPage-MobileSaveButton'
          icon={HiBookmarkAlt}/>
      </div>
    </>
  )
};

// Define the props types for the component
UpdateModelPage.propTypes = {
  setEditSection: PropTypes.func.isRequired,
  modelId: PropTypes.number.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  schoolId: PropTypes.string,
};

// Define default props for the component
UpdateModelPage.defaultProps = {
  schoolId: '',
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  schoolId: state.user.userData?.schoolId,
});

export default connect(mapStateToProps)(UpdateModelPage);