// Import Components 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { resetUserData } from '../../storage';
import { API, MESSAGE } from '../../Constants';
import { useNavigate } from 'react-router-dom';
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import EquipmentInventory from '../../Components/Inventory/EquipmentInventory/EquipmentInventory';
import TypeInventory from '../../Components/Inventory/TypeInventory/TypeInventory';
import ModelInventory from '../../Components/Inventory/ModelInventory/ModelInventory';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal/ConfirmationModal';
import IconModal from '../../Components/Modals/IconModal/IconModal';
import HeaderButton from '../../Components/Buttons/HeaderButton/HeaderButton';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';

// Import Stylings
import './InventoryPage.css';

// Import Icons
import { HiAdjustments, HiCheckCircle, HiExclamationCircle, HiMinusCircle, HiPencilAlt, HiPlus, HiSwitchHorizontal, HiTrash } from 'react-icons/hi';

// Define InventoryPage Component
function InventoryPage(props) {

  const { userRole, schoolId } = props;

  const navigate = useNavigate();

  // Section State of the page - Equipment, Type, Model tabs
  const [currentSection, setCurrentSection] = useState('Equipment');

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [typeInventory, setTypeInventory] = useState([]);

  const [confirmationModal, setConfirmationModal] = useState({
    title: '',
    content: '',
    warning: '',
    onYes: () => {},
    onNo: () => {},
    isVisible: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [responseModal, setResponseModal] = useState({
    message: '',
    error: false,
    isVisible: false,
  });

  const AddEquipment = () => {
    navigate('/AddToInventory');
  };

  const AddType = () => {
    console.log('Add Type');
  };

  const AddModel = () => {
    console.log('Add Model');
  }

  const OnFilterClick = () => {
    console.log('Filter');
  };

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

  const CancelSelection = () => {
    if(currentSection === 'Type') {
      setSelectedTypes([]);
    }
  };

  const EditSelectedType = () => {
    console.log('Render Edit Type Component');
  };

  const DeleteSelectedTypes = () => {
    setConfirmationModal({
      title: 'Remove Type',
      content: 'Are you sure you want to remove the selected equipment types?',
      warning: 'This will also permanently delete all equipment and models associated with the selected types and the action cannot be undone.',
      onYes: () => {
        CloseConfirmationModal();
        setResponseModal({
          message: 'Deleting the selected types...',
          isVisible: true,
        });
        setIsProcessing(true);

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
          .then(response => {
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
            FetchTypeInventory();
            setSelectedTypes([]);
          })
          .catch(error => {
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
      onNo: () => {
        CloseConfirmationModal();
      },
      isVisible: true,
    });
  };

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
  
  const FetchTypeInventory = () => {
    axios.get(`${API.domain}/api/inventory/types`, {
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

  useEffect(() => {
    FetchTypeInventory();
  }, []);

  return (
    <GeneralPage>
      <IconModal
        className='InventoryPage-ResponseModalContainer'
        icon={isProcessing ? HiSwitchHorizontal : (responseModal.error ? HiExclamationCircle : HiCheckCircle)}
        iconClassName='InventoryPage-ResponseModalIcon'
        message={responseModal.message}
        isVisible={responseModal.isVisible || isProcessing} />
      <ConfirmationModal
        className='InventoryPage-ConfirmationModalContainer'
        title={confirmationModal.title}
        content={confirmationModal.content}
        warning={confirmationModal.warning}
        onYes={confirmationModal.onYes}
        onNo={confirmationModal.onNo}
        isVisible={confirmationModal.isVisible} />
      <div className='InventoryPage-PageContentContainer'>
        {/* Page Header - Inventory */}
        <div className='InventoryPage-PageHeaderContainer'>
          <Logo className='InventoryPage-LogoContainer'/>
          <p className='heading-2'>Inventory</p>
        </div>
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
              {/* If equipment tab, display Add Equipment */}
              {currentSection === 'Equipment' && (
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
                <StandardButton
                  title='Add Model'
                  onClick={AddModel}
                  className='InventoryPage-AddButton'
                  icon={HiPlus}/>
              )}
            </div>
          </div>
          {/* Equipment Tab */}
          {currentSection === 'Equipment' && (
            <>
              <EquipmentInventory />
              <StandardButton
                title='Add Equipment'
                onClick={AddEquipment}
                className={'InventoryPage-MobileAddButton'}
                icon={HiPlus}/>
            </>
          )}
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
          {currentSection === 'Model' && (
            <>
              <ModelInventory />
              <StandardButton
                title='Add Model'
                onClick={AddModel}
                className={'InventoryPage-MobileAddButton'}
                icon={HiPlus}/>
            </>
          )}
        </div>
      </div>
    </GeneralPage>
  )
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
