//#region Import Necessary Dependencies 
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetUserData } from '../../storage';
import { API, MESSAGE } from '../../Constants';
//#endregion

//#region Import UI Components
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import EquipmentInventory from '../../Components/Inventory/EquipmentInventory/EquipmentInventory';
import TypeInventory from '../../Components/Inventory/TypeInventory/TypeInventory';
import ModelInventory from '../../Components/Inventory/ModelInventory/ModelInventory';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal/ConfirmationModal';
import IconModal from '../../Components/Modals/IconModal/IconModal';
import HeaderButton from '../../Components/Buttons/HeaderButton/HeaderButton';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
//#endregion

// Import Stylings
import './InventoryPage.css';

//#region Import Icons
import { HiAdjustments, HiCheckCircle, HiExclamationCircle, 
         HiMinusCircle, HiPencilAlt, HiPlus, HiSwitchHorizontal, 
         HiTrash } from 'react-icons/hi';
import UnauthorizedPanel from '../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel';
import UpdateTypePage from '../UpdateTypePage/UpdateTypePage';
import UpdateModelPage from '../UpdateModelPage/UpdateModelPage';
import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import UpdateEquipmentPage from '../UpdateEquipmentPage/UpdateEquipmentPage';
//#endregion

// Define InventoryPage Component
function InventoryPage(props) {

  // Extract necessary props
  const { userRole, schoolId } = props;

  const navigate = useNavigate();

  //#region Section State of the page - Equipment, Type, Model tabs
  // State for current section of the page
  const [currentSection, setCurrentSection] = useState('Equipment');
  
  // State for edit section (if any)
  const [editSection, setEditSection] = useState('');

  // State for detail section (if any)
  const [detailSection, setDetailSection] = useState('');

  // State for equipment detail serial ID upon going to the detail section for fetching
  const [equipmentDetailSerialId, setEquipmentDetailSerialId] = useState('');
  //#endregion

  // State for selected equipment
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  // State for equipment inventory
  const [equipmentInventory, setEquipmentInventory] = useState([]);

  // Types Inventory and Selection States
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [typeInventory, setTypeInventory] = useState([]);

  // Models Inventory and Selection States
  const [selectedModels, setSelectedModels] = useState([]);
  const [modelInventory, setModelInventory] = useState([]);

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
  const [isUpdated, setIsUpdated] = useState(false);

  // Response Modal State Object - Control visibility and content of the response
  const [responseModal, setResponseModal] = useState({
    message: '',
    error: false,
    isVisible: false,
  });

  // AddEquipment - Navigate to add equipment page with equipment tab
  const AddEquipment = () => {
    navigate('/AddToInventory', {state: { section: 'Equipment'}});
  };

  // AddType - Navigate to add equipment page with type tab
  const AddType = () => {
    navigate('/AddToInventory', {state: { section: 'Type'}});
  };

  // AddModel - Navigate to add equipment page with model tab
  const AddModel = () => {
    navigate('/AddToInventory', {state: { section: 'Model'}});
  }

  // OnFilterClick - TODO: Open Filter Modal based on the currentSection state
  const OnFilterClick = () => {
    console.log('Filter');
  };

  // OnEquipmentCardClick - Handle click on equipment card and navigate to detail page.
  const OnEquipmentCardClick = (equipmentSerialId) => {
    setDetailSection('Equipment');
    setEquipmentDetailSerialId(equipmentSerialId);
  }

  //#region Selections
  // SelectEquipment - Update the user's selections of Equipment
  const SelectEquipment = (equipmentId) => {
    let updatedSelectedEquipment = [...selectedEquipment];

    if (updatedSelectedEquipment.includes(equipmentId)) {
      updatedSelectedEquipment = updatedSelectedEquipment.filter(id => id !== equipmentId);
    }
    else {
      updatedSelectedEquipment.push(equipmentId);
    }

    setSelectedEquipment(updatedSelectedEquipment);
  };

  // SelectType - Update the user's selections of types
  const SelectType = (typeId) => {
    let updatedSelectedType = [...selectedTypes];
    
    if(updatedSelectedType.includes(typeId)) {
      updatedSelectedType = updatedSelectedType.filter(id => id !== typeId);
    }
    else {
      updatedSelectedType.push(typeId);
    }

    setSelectedTypes(updatedSelectedType);
  };

  // SelectModel - Update the user's selections of models
  const SelectModel = (modelId) => {
    let updatedSelectedModel = [...selectedModels];

    if(updatedSelectedModel.includes(modelId)) {
      updatedSelectedModel = updatedSelectedModel.filter(id => id !== modelId);
    }

    else {
      updatedSelectedModel.push(modelId);
    }

    setSelectedModels(updatedSelectedModel);
  };
  //#endregion

  // CancelSelection - Cancel selection based on the currentSection state
  const CancelSelection = () => {
    if(currentSection === 'Type') {
      setSelectedTypes([]);
    }
    else if(currentSection === 'Model') {
      setSelectedModels([]);
    }
    else if(currentSection === 'Equipment') {
      setSelectedEquipment([]);
    }
  };

  //#region Edit/Update
  // EditSelectedEquipment - Render Edit Equipment Component
  const EditSelectedEquipment = () => {
    setEditSection('Equipment');
    setEquipmentDetailSerialId(selectedEquipment?.[0]);
  };

  // EditSelectModel - Render the Edit Model Component
  const EditSelectedModel = () => {
    setEditSection('Model');
  };

  // EditSelectedType - Render the Edit Type Component
  const EditSelectedType = () => {
    setEditSection('Type');
  };
  //#endregion

  //#region Deletion
  // DeleteSelectedEquipment - Mass Equipment Deletion
  const DeleteSelectedEquipment = () => {
    setConfirmationModal({
      title: 'Remove Equipment',
      content: 'Are you sure you want to remove the selected equipment?',
      warning: 'This will also permanently delete all selected equipment and the action cannot be undone.',
      onYes: () => {
        // Close confirmation modal
        CloseConfirmationModal();

        // Show processing message
        setResponseModal({
          message: 'Deleting the selected equipment...',
          isVisible: true,
        });
        setIsProcessing(true);

        // Perform API call for model deletion
        axios
          .delete(`${API.domain}/api/inventory/equipment`, {
            headers: {
              'X-API-KEY': API.key,
            },
            data: {
              schoolId: schoolId,
              serialId: selectedEquipment,
            },
          })
          .then(() => {
            // Hide processing message
            setIsProcessing(false);

            // Show success message
            setResponseModal({
              message: MESSAGE.successEquipmentMassRemoval,
              error: false,
              isVisible: true,
            });
            setTimeout(() => {
              setResponseModal({
                message: '',
                error: false,
                isVisible: false,
              });
            }, 1500)

            // Refresh inventory data and reset selections
            FetchEquipmentInventory();
            setSelectedEquipment([]);
            FetchTypeInventory();
            setSelectedTypes([]);
            FetchModelInventory();
            setSelectedModels([]);
          })
          .catch(() => {
            // Hide processing message
            setIsProcessing(false);

            // Show error message
            setResponseModal({
              message: 'Something went wrong while deleting the selected equipment.',
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
          })
      },
      onNo: () => {
        // Close confirmation modal if user chooses not to proceed
        CloseConfirmationModal();
      },
      isVisible: true,
    });
  };

  // DeleteSelectedModels - Show the confirmation modal with warnings, if yes, perform a delete, if no, close the confirmation modal
  const DeleteSelectedModels = () => {
    // Show confirmation modal for model deletion
    setConfirmationModal({
      title: 'Remove Model',
      content: 'Are you sure you want to remove the selected equipment models?',
      warning: 'This will also permanently delete all equipment associated with the selected models and the action cannot be undone.',
      onYes: () => {
        // Close confirmation modal
        CloseConfirmationModal();

        // Show processing message
        setResponseModal({
          message: 'Deleting the selected models...',
          isVisible: true,
        });
        setIsProcessing(true);

        // Perform API call for model deletion
        axios
          .delete(`${API.domain}/api/inventory/models`, {
            headers: {
              'X-API-KEY': API.key,
            },
            data: {
              schoolId: schoolId,
              modelIds: selectedModels,
            },
          })
          .then(() => {
            // Hide processing message
            setIsProcessing(false);

            // Show success message
            setResponseModal({
              message: MESSAGE.successModelMassRemoval,
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

            // Refresh inventory data and reset selections
            FetchEquipmentInventory();
            setSelectedEquipment([]);
            FetchTypeInventory();
            setSelectedTypes([]);
            FetchModelInventory();
            setSelectedModels([]);
          })
          .catch(() => {
            // Hide processing message
            setIsProcessing(false);
  
            // Show error message
            setResponseModal({
              message: 'Something went wrong while deleting the selected models.',
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
          })
      },
      onNo: () => {
      // Close the confirmation modal if choose not to proceed further
        CloseConfirmationModal();
      },
      isVisible: true,
    });
  };

  // DeleteSelectedTypes - Show the confirmation modal with warnings, if yes, perform a delete, show the reponse modal, if no, close the confirmation modal
  const DeleteSelectedTypes = () => {
    // Show confirmation modal for model deletion
    setConfirmationModal({
      title: 'Remove Type',
      content: 'Are you sure you want to remove the selected equipment types?',
      warning: 'This will also permanently delete all equipment and models associated with the selected types and the action cannot be undone.',
      onYes: () => {
        // Close the confirmation modal
        CloseConfirmationModal();

        // Set and show the response modal
        setResponseModal({
          message: 'Deleting the selected types...',
          isVisible: true,
        });

        // Set state to is Processing
        setIsProcessing(true);

        // Process - Perform deletion API
        axios
          .delete(`${API.domain}/api/inventory/types`, {
            headers: {
              'X-API-KEY': API.key,
            },
            data: {
              schoolId: schoolId,
              typeIds: selectedTypes,
            },
          })
          .then(() => {
            setIsProcessing(false);
            setResponseModal({
              message: MESSAGE.successTypeMassRemoval,
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
            FetchEquipmentInventory();
            setSelectedEquipment([]);
            FetchTypeInventory();
            setSelectedTypes([]);
            FetchModelInventory();
            setSelectedModels([]);
          })
          .catch(() => {
            setIsProcessing(false);
            setResponseModal({
              message: 'Something went wrong while deleting the selected types.',
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
          });
      },
      // Close the confirmation modal if choose not to proceed further
      onNo: () => {
        CloseConfirmationModal();
      },
      isVisible: true,
    });
  };
  //#endregion

  //#region Helpers
  // FetchEquipmentInventory - Fetch all equipments in the inventory
  const FetchEquipmentInventory = () => {
    axios
      .get(`${API.domain}/api/inventory/equipment`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setEquipmentInventory(response.data.responseObject)
      })
      .catch(() => {
        setEquipmentInventory([]);
      });
  };

  // FetchTypeInventory - Fetch all types in the inventory
  const FetchTypeInventory = () => {
    axios
      .get(`${API.domain}/api/inventory/types`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setTypeInventory(response.data.responseObject);
      })
      .catch(error => {
        setTypeInventory([]);
      });
  };

  // FetchModelInventory - Fetch all models in the inventory
  const FetchModelInventory = () => {
    axios
      .get(`${API.domain}/api/inventory/models`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setModelInventory(response.data.responseObject);
      })
      .catch(error => {
        setModelInventory([]);
      })
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
  //#endregion

  // Fetch initial data when the component mounts
  useEffect(() => {
    FetchEquipmentInventory();
    FetchTypeInventory();
    FetchModelInventory();
  }, []);

  // useEffect to refresh data and reset selections after editing
  useEffect(() => {
    if(isUpdated && editSection === '') {
      FetchTypeInventory();
      FetchModelInventory();
      FetchEquipmentInventory();
      setIsUpdated(false);
      setSelectedEquipment([]);
      setSelectedModels([]);
      setSelectedTypes([]);
    }
  }, [isUpdated, editSection]);

  return (
    <>
      {userRole === 'Admin' ? (
        <GeneralPage>
        {/* Response Modal for displaying successful messages or errors */}
        <IconModal
          className='InventoryPage-ResponseModalContainer'
          icon={ResponseIcon()}
          iconClassName='InventoryPage-ResponseModalIcon'
          message={responseModal.message}
          isVisible={responseModal.isVisible || isProcessing} />
        {/* Confirmation Modal for warnings and confirmation actions */}
        <ConfirmationModal
          className='InventoryPage-ConfirmationModalContainer'
          title={confirmationModal.title}
          content={confirmationModal.content}
          warning={confirmationModal.warning}
          onYes={confirmationModal.onYes}
          onNo={confirmationModal.onNo}
          isVisible={confirmationModal.isVisible} />
        {/* Page Content Container */}
        <div className='InventoryPage-PageContentContainer'>
          {/* Page Header - Inventory */}
          <div className='InventoryPage-PageHeaderContainer'>
            <Logo className='InventoryPage-LogoContainer'/>
            <p className='heading-2'>Inventory</p>
          </div>
          {!detailSection && !editSection && (
            <>
              {/* Page Content */}
              <div className='InventoryPage-ContentContainer'>
                {/* Content Header Container */}
                <div className='InventoryPage-ContentHeaderContainer'>
                  {/* Header Container */}
                  <div className='InventoryPage-HeaderContainer'>
                    {/* Equipment Tab Button */}
                    <HeaderButton
                      title='Equipment'
                      isSelected={currentSection === 'Equipment'}
                      onClick={() => setCurrentSection('Equipment')}/>
                    {/* Type Tab Button */}
                    <HeaderButton
                      title='Type'
                      isSelected={currentSection === 'Type'}
                      onClick={() => setCurrentSection('Type')}/>
                    {/* Model Tab Button */}
                    <HeaderButton
                      title='Model'
                      isSelected={currentSection === 'Model'}
                      onClick={() => setCurrentSection('Model')}/>
                  </div>
                  {/* Action Container */}
                  <div className='InventoryPage-ActionContainer'>
                    {currentSection === 'Equipment' && (
                      <>
                        {selectedEquipment.length === 1 && (
                          <StandardButton
                          title='Edit'
                          onClick={EditSelectedEquipment}
                          className='InventoryPage-EditButton'
                          icon={HiPencilAlt}/>
                        )}
                        {selectedEquipment.length > 0 && (
                          <>
                            <StandardButton
                              title='Cancel'
                              onClick={CancelSelection}
                              className='InventoryPage-CancelButton'
                              icon={HiMinusCircle}/>
                            <StandardButton
                              title=''
                              onClick={DeleteSelectedEquipment}
                              className='InventoryPage-DeleteButton'
                              icon={HiTrash}/> 
                          </>
                        )}
                        {selectedEquipment.length === 0 && (
                          <>
                            <StandardButton
                            title='Add Equipment'
                            onClick={AddEquipment}
                            className='InventoryPage-AddButton'
                            icon={HiPlus}/>
                            <StandardButton
                              title=''
                              onClick={OnFilterClick}
                              className='InventoryPage-FilterButton'
                              icon={HiAdjustments}/>                    
                          </>
                        )}
                      </>
                    )}
                    {currentSection === 'Type' && (
                      <>
                        {selectedTypes.length === 1 && (
                          <StandardButton
                          title='Edit'
                          onClick={EditSelectedType}
                          className='InventoryPage-EditButton'
                          icon={HiPencilAlt}/>
                        )}
                        {selectedTypes.length > 0 && (
                          <>
                            <StandardButton
                              title='Cancel'
                              onClick={CancelSelection}
                              className='InventoryPage-CancelButton'
                              icon={HiMinusCircle}/>
                            <StandardButton
                              title=''
                              onClick={DeleteSelectedTypes}
                              className='InventoryPage-DeleteButton'
                              icon={HiTrash}/> 
                          </>
                        )}
                        {selectedTypes.length === 0 && (
                          <>
                            <StandardButton
                            title='Add Type'
                            onClick={AddType}
                            className='InventoryPage-AddButton'
                            icon={HiPlus}/>
                            <StandardButton
                              title=''
                              onClick={OnFilterClick}
                              className='InventoryPage-FilterButton'
                              icon={HiAdjustments}/>                    
                          </>
                        )}
                      </>
                    )}
                    {currentSection === 'Model' && (
                      <>
                        {selectedModels.length === 1 && (
                          <StandardButton
                            title='Edit'
                            onClick={EditSelectedModel}
                            className='InventoryPage-EditButton'
                            icon={HiPencilAlt}/>
                        )}
                        {selectedModels.length > 0 && (
                          <>
                            <StandardButton
                              title='Cancel'
                              onClick={CancelSelection}
                              className='InventoryPage-CancelButton'
                              icon={HiMinusCircle}/>
                            <StandardButton
                              title=''
                              onClick={DeleteSelectedModels}
                              className='InventoryPage-DeleteButton'
                              icon={HiTrash}/>
                          </>
                        )}
                        {selectedModels.length === 0 && (
                          <>
                            <StandardButton
                            title='Add Model'
                            onClick={AddModel}
                            className='InventoryPage-AddButton'
                            icon={HiPlus}/>
                            <StandardButton
                              title=''
                              onClick={OnFilterClick}
                              className='InventoryPage-FilterButton'
                              icon={HiAdjustments}/>                    
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* Equipment Tab */}
                {currentSection === 'Equipment' && (
                  <>
                    <EquipmentInventory 
                      equipmentInventory={equipmentInventory}
                      selectedEquipment={selectedEquipment}
                      onSelectEquipment={SelectEquipment}
                      onEquipmentCardClick={OnEquipmentCardClick}/>
                    <div className='InventoryPage-MobileBottomActionContainer'>
                      {selectedEquipment.length === 1 && (
                        <StandardButton
                          title='Edit'
                          onClick={EditSelectedEquipment}
                          className={'InventoryPage-MobileEditButton'}
                          icon={HiPencilAlt}/>
                      )}
                      {selectedEquipment.length > 0 && (
                        <StandardButton
                          title='Cancel'
                          onClick={CancelSelection}
                          className={'InventoryPage-MobileCancelButton'}
                          icon={HiMinusCircle}/>
                      )}
                      {selectedEquipment.length === 0 && (
                        <StandardButton
                        title='Add Equipment'
                        onClick={AddEquipment}
                        className={'InventoryPage-MobileAddButton'}
                        icon={HiPlus}/>
                      )}
                    </div>
                  </>
                )}
                {/* Type Tab */}
                {currentSection === 'Type' && (
                  <>
                    <TypeInventory 
                      typeInventory={typeInventory}
                      selectedTypes={selectedTypes}
                      onSelectType={SelectType}/>
                    <div className='InventoryPage-MobileBottomActionContainer'>
                      {selectedTypes.length === 1 && (
                        <StandardButton
                        title='Edit'
                        onClick={EditSelectedType}
                        className={'InventoryPage-MobileEditButton'}
                        icon={HiPencilAlt}/>
                      )}
                      {selectedTypes.length > 0 && (
                        <StandardButton
                          title='Cancel'
                          onClick={CancelSelection}
                          className={'InventoryPage-MobileCancelButton'}
                          icon={HiMinusCircle}/>
                      )}
                      {selectedTypes.length === 0 && (
                        <StandardButton
                        title='Add Type'
                        onClick={AddType}
                        className={'InventoryPage-MobileAddButton'}
                        icon={HiPlus}/>
                      )}
                    </div>
                  </>
                )}
                {/* Model Tab */}
                {currentSection === 'Model' && (
                  <>
                    <ModelInventory 
                      modelInventory={modelInventory}
                      selectedModels={selectedModels}
                      onSelectModel={SelectModel}/>
                    <div className='InventoryPage-MobileBottomActionContainer'>
                      {selectedModels.length === 1 && (
                        <StandardButton
                          title='Edit'
                          onClick={EditSelectedModel}
                          className={'InventoryPage-MobileEditButton'}
                          icon={HiPencilAlt}/>
                      )}
                      {selectedModels.length > 0 && (
                        <StandardButton
                          title='Cancel'
                          onClick={CancelSelection}
                          className={'InventoryPage-MobileCancelButton'}
                          icon={HiMinusCircle}/>
                      )}
                      {selectedModels.length === 0 && (
                        <StandardButton
                          title='Add Model'
                          onClick={AddModel}
                          className={'InventoryPage-MobileAddButton'}
                          icon={HiPlus}/>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* If there is a detailSection request for Type present */}
          {!detailSection && editSection === 'Type' && (
            <UpdateTypePage 
              setEditSection={setEditSection}
              typeId={selectedTypes?.[0]}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}/>
            )
          }

          {/* If there is an editSection request for Model present */}
          {!detailSection && editSection === 'Model' && (
            <UpdateModelPage
              setEditSection={setEditSection}
              modelId={selectedModels?.[0]}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}/>
          )}
          {/* If there is a detailSection present and not have an editSection */}
          {detailSection === 'Equipment' && !editSection && (
            <EquipmentDetailsPage 
              setDetailSection={setDetailSection}
              setEditSection={setEditSection}
              equipmentSerialId={equipmentDetailSerialId}
              setIsUpdated={setIsUpdated}/>
          )}

          {/* If there is an editSection for equipment */}
          {editSection === 'Equipment' && (
            <UpdateEquipmentPage 
              detailSection={detailSection}
              setDetailSection={setDetailSection}
              equipmentSerialId={equipmentDetailSerialId}
              setEditSection={setEditSection}
              setIsUpdated={setIsUpdated}
              isUpdated={isUpdated}/>
          )}
        </div>
      </GeneralPage>
      ) :
      (
        <UnauthorizedPanel />
      )}
    </>
  )
};

// Define propTypes for InventoryPage
InventoryPage.propTypes = {
  userRole: PropTypes.string,
  schoolId: PropTypes.string,
};

// Define defaultProps for InventoryPage
InventoryPage.defaultProps = {
  userRole: '',
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

// Exports the InventoryPage component as the default export for the InventoryPage module.
export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);
