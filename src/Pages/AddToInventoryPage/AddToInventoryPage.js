// Import Components 
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import HeaderButton from '../../Components/Buttons/HeaderButton/HeaderButton';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField/StandardTextInputField';

// Import Stylings
import './AddToInventoryPage.css';

// Import Icons
import { HiDocumentText, HiPhotograph, HiPlus } from 'react-icons/hi';

// Define AddEquipmentPage Component
function AddToInventoryPage() {

  const [currentSection, setCurrentSection] = useState('Equipment');

  const AddEquipment = () => {
    console.log('Add Equipment');
  };

  const ImportEquipment = () => {
    console.log('Import Equipment');
  }

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
              <StandardButton 
                title='Add Equipment'
                onClick={AddEquipment}
                className='AddToInventoryPage-AddEquipmentButton'
                icon={HiPlus}/>
              <StandardButton 
                title='Import'
                onClick={ImportEquipment}
                className='AddToInventoryPage-ImportEquipmentButton'
                icon={HiDocumentText}/>
            </div>
          </div>
          <div className='AddToInventoryPage-Content'>
            <div className='AddToInventoryPage-VisualContainer'>
              <div className='AddToInventoryPage-PromptContainer'>
                <HiPhotograph className='AddToInventoryPage-PromptIcon'/>
                <p className='paragraph-1 AddToInventoryPage-Prompt'>Please select type and model</p>
              </div>
            </div>
            <div className='AddToInventoryPage-FormContainer'>
              <div className='AddToInventoryPage-EquipmentInformationGroup'>
                <p className='heading-5'>Equipment Information</p>
                <StandardTextInputField 
                  placeholder='Enter equipment serial number' 
                  name='Serial Number'
                  onChange={()=> {}}
                  onKeyDown={() => {}}/>
                <div className='AddToInventoryPage-EquipmentTypeAndModel'>
                  <StandardTextInputField 
                    placeholder='Select type' 
                    className='AddToInventoryPage-InputField'
                    name='Type'
                    onChange={()=> {}}
                    onKeyDown={() => {}}/>
                  <StandardTextInputField 
                    placeholder='Select model' 
                    className='AddToInventoryPage-InputField'
                    name='Model'
                    onChange={()=> {}}
                    onKeyDown={() => {}}/>
                </div>
              </div>
              <div className='AddToInventoryPage-EquipmentStatusGroup'>
                <p className='heading-5'>Status</p>
                <div className='AddToInventoryPage-EquipmentStatus'>
                  <StandardTextInputField
                    placeholder='Select maintenance status'
                    className='AddToInventoryPage-InputField'
                    name='Maintenance Status'
                    onChange={() => {}}
                    onKeyDown={() => {}}/>
                  <StandardTextInputField
                    placeholder='Select reservation status'
                    className='AddToInventoryPage-InputField'
                    name='Reservation Status'
                    onChange={() => {}}
                    onKeyDown={() => {}}/>
                </div>
              </div>
              <div className='AddToInventoryPage-EquipmentLocationGroup'>
                <p className='heading-5'>Location</p>
                <div className='AddToInventoryPage-EquipmentLocation'>
                  <StandardTextInputField
                    placeholder='Enter RFID tag'
                    className='AddToInventoryPage-InputField'
                    name='RFID Tag'
                    onChange={() => {}}
                    onKeyDown={() => {}}/>
                  <StandardTextInputField
                    placeholder='Select home location'
                    className='AddToInventoryPage-InputField'
                    name='Home Location'
                    onChange={() => {}}
                    onKeyDown={() => {}}/>
                </div>
              </div>
              <div className='AddToInventoryPage-EquipmentAcquisitionInformationGroup'>
                <p className='heading-5'>Acquisition Information</p>
                <StandardTextInputField 
                  placeholder='Select condition' 
                  name='Condition'
                  onChange={()=> {}}
                  onKeyDown={() => {}}/>
                <div className='AddToInventoryPage-EquipmentPurchaseCostAndDate'>
                  <StandardTextInputField 
                    placeholder='Enter purchase cost (U.S. dollar)' 
                    className='AddToInventoryPage-InputField'
                    name='Purchase Cost'
                    onChange={()=> {}}
                    onKeyDown={() => {}}/>
                  <StandardTextInputField 
                    placeholder='Enter purchase date' 
                    className='AddToInventoryPage-InputField'
                    name='Purchase Date'
                    onChange={()=> {}}
                    onKeyDown={() => {}}/>
                </div>
              </div>
              <p className='paragraph-1 AddToInventoryPage-Instructions'>To add to inventory, please provide the details to ensure accurate and comprehensive record-keeping.</p>
            </div>
          </div>
        </div>
      </div>
    </GeneralPage>
  )
};

// Exports the AddEquipmentPage component as the default export for the AddEquipmentPage module.
export default AddToInventoryPage;
