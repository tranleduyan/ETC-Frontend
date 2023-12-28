// Import Components 
import React, { useEffect, useState } from 'react';
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
import StandardDropDown from '../../Components/DropDowns/StandardDropDown/StandardDropDown';

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

  const equipmentTypes = [
    {
      label: 'Ammeter',
      value: '2',
    },
    {
      label: 'Voltmeter',
      value: '5',
    },
    {
      label: 'Multimeter',
      value: '1',
    },
    {
      label: 'Barometer',
      value: '10',
    },
    {
      label: 'Lux Meter',
      value: '8',
    },
    {
      label: 'Thermometer',
      value: '9',
    },
  ];

  const equipmentModels = [];

  const maintenanceStatus = [
    {
      label: 'Ready',
      value: 'Ready',
    },
    {
      label: 'Under Repair',
      value: 'Under Repair',
    }
  ];

  const reservationStatus = [
    {
      label: 'In Use',
      value: 'In Use',
    },
    {
      label: 'Available',
      value: 'Available',
    }
  ];

  const equipmentHomeLocations = [];

  const equipmentConditions = [
    {
      label: 'New',
      value: 'New',
    },
    {
      label: 'Used',
      value: 'Used',
    },
  ];

  const AddEquipment = () => {
    console.log('Add Equipment');
  };

  const ImportEquipment = () => {
    console.log('Import Equipment');
  }

  const HandleEquipmentAdditionInputChange = (propertyName, selectedValue) => {
    setEquipmentAdditionInformation({...equipmentAdditionInformation, [propertyName]: selectedValue})
    console.log(selectedValue);
    console.log(propertyName);
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
                  name='serialNumber'
                  onChange={()=> {}}
                  onKeyDown={() => {}}/>
                <div className='AddToInventoryPage-EquipmentTypeAndModel'>
                  <StandardDropDown
                    placeholder='Select type'
                    className='AddToInventoryPage-InputField'
                    name='type'
                    options={equipmentTypes}
                    onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
                  <StandardDropDown
                    placeholder='Select model'
                    className='AddToInventoryPage-InputField'
                    name='model'
                    options={equipmentModels}
                    onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
                </div>
              </div>
              <div className='AddToInventoryPage-EquipmentStatusGroup'>
                <p className='heading-5'>Status</p>
                <div className='AddToInventoryPage-EquipmentStatus'>
                  <StandardDropDown
                    placeholder='Select maintenance status'
                    className='AddToInventoryPage-InputField'
                    name='maintenanceStatus'
                    options={maintenanceStatus}
                    onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
                  <StandardDropDown
                    placeholder='Select reservation status'
                    className='AddToInventoryPage-InputField'
                    name='reservationStatus'
                    options={reservationStatus}
                    onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
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
                  <StandardDropDown 
                    placeholder='Select home location'
                    className='AddToInventoryPage-InputField'
                    name='homeLocation'
                    options={equipmentHomeLocations}
                    onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
                </div>
              </div>
              <div className='AddToInventoryPage-EquipmentAcquisitionInformationGroup'>
                <p className='heading-5'>Acquisition Information</p>
                <StandardDropDown 
                    placeholder='Select condition'
                    className='AddToInventoryPage-InputField'
                    name='condition'
                    options={equipmentConditions}
                    onChange={(name, value) => HandleEquipmentAdditionInputChange(name, value)}/>
                <div className='AddToInventoryPage-EquipmentPurchaseCostAndDate'>
                  <StandardTextInputField 
                    placeholder='Enter purchase cost (U.S. dollar)' 
                    className='AddToInventoryPage-InputField'
                    name='purchaseCost'
                    onChange={()=> {}}
                    onKeyDown={() => {}}/>
                  <StandardTextInputField 
                    placeholder='Enter purchase date' 
                    className='AddToInventoryPage-InputField'
                    name='purchaseDate'
                    onChange={()=> {}}
                    onKeyDown={() => {}}/>
                </div>
              </div>
              <p className='paragraph-1 AddToInventoryPage-Instructions'>
Please provide the details of the equipment.</p>
            </div>
          </div>
        </div>
      </div>
    </GeneralPage>
  )
};

// Exports the AddEquipmentPage component as the default export for the AddEquipmentPage module.
export default AddToInventoryPage;
