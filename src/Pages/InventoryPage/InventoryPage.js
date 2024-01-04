// Import Components 
import React, { useState } from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';

// Import Stylings
import './InventoryPage.css';
import HeaderButton from '../../Components/Buttons/HeaderButton/HeaderButton';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import { HiAdjustments, HiPlus } from 'react-icons/hi';
import EquipmentInventory from '../../Components/Inventory/EquipmentInventory/EquipmentInventory';

// Define InventoryPage Component
function InventoryPage() {

  // Section State of the page - Equipment, Type, Model tabs
  const [currentSection, setCurrentSection] = useState('Equipment');

  const AddEquipment = () => {
    console.log('Add Equipment');
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

  return (
    <GeneralPage>
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
                <StandardButton
                  title='Add Equipment'
                  onClick={AddEquipment}
                  className='InventoryPage-AddButton'
                  icon={HiPlus}/>
              )}
              {currentSection === 'Type' && (
                <StandardButton
                  title='Add Type'
                  onClick={AddType}
                  className='InventoryPage-AddButton'
                  icon={HiPlus}/>
              )}
              {currentSection === 'Model' && (
                <StandardButton
                  title='Add Model'
                  onClick={AddModel}
                  className='InventoryPage-AddButton'
                  icon={HiPlus}/>
              )}
              <StandardButton
                title=''
                onClick={OnFilterClick}
                className='InventoryPage-FilterButton'
                icon={HiAdjustments}/>
            </div>
          </div>
          {/* Equipment Tab */}
          {currentSection === 'Equipment' && (
            <>
              <EquipmentInventory 
                className='InventoryPage-InventoryList'/>
              <StandardButton
                title='Add Equipment'
                onClick={AddEquipment}
                className={'InventoryPage-MobileAddButton'}
                icon={HiPlus}/>
            </>
          )}
        </div>
      </div>
    </GeneralPage>
  )
};

// Exports the InventoryPage component as the default export for the InventoryPage module.
export default InventoryPage;
