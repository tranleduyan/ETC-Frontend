// Import Components 
import React, { useEffect, useState } from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import HeaderButton from '../../Components/Buttons/HeaderButton/HeaderButton';
import EquipmentAdditionForm from '../../Components/Forms/EquipmentAdditionForm/EquipmentAdditionForm';
import TypeAdditionForm from '../../Components/Forms/TypeAdditionForm/TypeAdditionForm';

// Import Stylings
import './AddToInventoryPage.css';

// Import Icons
import { HiDocumentText, HiPlus } from 'react-icons/hi';

// Define AddEquipmentPage Component
function AddToInventoryPage() {

  const [currentSection, setCurrentSection] = useState('Equipment');
  const [equipmentAdditionInformation, setEquipmentAdditionInformation] = useState({
    serialNumber: '',
    type: null,
    model: null,
    maintenanceStatus: '',
    reservationStatus: '',
    RFIDTag: '',
    homeLocation: null,
    condition: '',
    purchaseCost: null,
    purchaseDate: null,
  });

  const [typeAdditionInformation, setTypeAdditionInformation] = useState({

  });

  const AddEquipment = () => {
    console.log('Add Equipment');
  };

  const AddType = () => {
    console.log('Add Type');
  };

  const ImportEquipment = () => {
    console.log('Import Equipment');
  };

  useEffect(() => {
    console.log(equipmentAdditionInformation);
  }, [equipmentAdditionInformation]);
  
  return (
    <GeneralPage>
      <div className='AddToInventoryPage-PageContentContainer'>
        {/* Page Header - Add to Inventory */}
        <div className='AddToInventoryPage-PageHeaderContainer'>
          <Logo className='AddToInventoryPage-LogoContainer'/>
          <p className='heading-2'>Add to Inventory</p>
        </div>
        {/* Page Content */}
        <div className='AddToInventoryPage-ContentContainer'>
          <div className='AddToInventoryPage-ContentHeaderContainer'>
            <div className='AddToInventoryPage-HeaderContainer'>
              <HeaderButton
                title='Equipment'
                isSelected={currentSection === 'Equipment'}
                onClick={() => setCurrentSection('Equipment')}/>
              <HeaderButton
                title='Type'
                isSelected={currentSection === 'Type'}
                onClick={() => setCurrentSection('Type')}/>
              <HeaderButton
                title='Model'
                isSelected={currentSection === 'Model'}
                onClick={() => setCurrentSection('Model')}/>
            </div>
            <div className='AddToInventoryPage-ActionContainer'>
              {currentSection === 'Equipment' && (
                <>
                  <StandardButton 
                    title='Add Equipment'
                    onClick={AddEquipment}
                    className='AddToInventoryPage-AddButton'
                    icon={HiPlus}/>
                  <StandardButton 
                    title='Import'
                    onClick={ImportEquipment}
                    className='AddToInventoryPage-ImportEquipmentButton'
                    icon={HiDocumentText}/>
                </>
              )}
              {currentSection === 'Type' && (
                <>
                  <StandardButton 
                    title='Add Type'
                    onClick={AddType}
                    className='AddToInventoryPage-AddButton'
                    icon={HiPlus}/>
                </>
              )}
            </div>
          </div>
          {currentSection === 'Equipment' && 
            (<>
              <EquipmentAdditionForm 
                equipmentAdditionInformation={equipmentAdditionInformation}
                setEquipmentAdditionInformation={setEquipmentAdditionInformation}/>
              <StandardButton 
                title='Add Equipment'
                onClick={AddEquipment}
                className='AddToInventoryPage-MobileAddButton'
                icon={HiPlus}/>
            </>
            )
          }
          {currentSection === 'Type' &&
            (
              <>
                <TypeAdditionForm
                  typeAdditionInformation={typeAdditionInformation}
                  setTypeAdditionInformation={setTypeAdditionInformation}/>
              <StandardButton 
                title='Add Type'
                onClick={AddType}
                className='AddToInventoryPage-MobileAddButton'
                icon={HiPlus}/>
              </>
            )
            
          }
        </div>
      </div>
    </GeneralPage>
  )
};

// Exports the AddEquipmentPage component as the default export for the AddEquipmentPage module.
export default AddToInventoryPage;
