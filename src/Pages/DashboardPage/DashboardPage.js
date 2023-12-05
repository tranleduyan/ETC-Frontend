// Import Components 
import React, { useState } from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';
import StandardButton from '../../Components/Buttons/StandardButton';
import InventorySummaryList from '../../Components/Lists/InventorySummaryList/InventorySummaryList';
import ReservationList from '../../Components/Lists/ReservationList/ReservationList';
import FilterButton from '../../Components/Buttons/FilterButton/FilterButton';
import SearchBarInputField from '../../Components/InputFields/SearchBarInputField/SearchBarInputField';

// Import Stylings
import './DashboardPage.css';

// Import Icons
import { HiPlus } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

// All Pages must be inherit General Page
function DashboardPage() {
  
  // Search Query Object
  const [searchQuery, setSearchQuery] = useState({
    equipmentType: '',
  });

  const HandleSearchQueryChange = (propertyName, inputValue) => {
    setSearchQuery({...searchQuery, [propertyName]: inputValue});
  }

  const OnClickedAddEquipment = () => {
    console.log("Add Equipment Clicked");
  }

  const Search = () => {
    console.log(searchQuery);
  }

  return (
    <GeneralPage>
      <div className='Dashboard-PageContentContainer'>
        {/* Page Header - Dashboard */}
        <div className='Dashboard-PageHeaderContainer'>
          <p className='heading-2'>Dashboard</p>
        </div>
        {/* Page Content */}
        <div className='Dashboard-ContentContainer'>
          {/* Left Content Panel */}
          <div className='Dashboard-LeftContentPanel'>
            {/* Inventory Section */}
            <div className='Dashboard-InventorySection'>
              {/* Section Header */}
              <div className='Dashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Inventory</p>
                {/* Search Bar */}
                <SearchBarInputField
                  className='Dashboard-SearchBar'
                  placeholder='Search type'
                  name='equipmentType'
                  value={searchQuery.equipmentType}
                  onChange={HandleSearchQueryChange}
                  onKeyDown={(e) => e.key === 'Enter' && Search()}
                  />
              </div>
              {/* Inventory Summary List */}
              <InventorySummaryList className='Dashboard-InventorySummaryList'/>
            </div>
            {/* Reservation Section */}
            <div className='Dashboard-ReservationSection'>
              {/* Section Header */}
              <div className='Dashboard-SectionHeader'>
                {/* Title */}
                <p className='heading-5'>Reservations</p>
                {/* Filters */}
                <div className='Dashboard-ReservationFilterContainer'>
                  <FilterButton title='Approved' isActive={true}/>
                  <FilterButton title='Requested' isActive={false}/>
                </div>
              </div>
              {/* Reservation List */}
              <ReservationList className='Dashboard-ReservationList'/>
            </div>
          </div>
          {/* Right Content Panel */}
          <div className='Dashboard-RightContentPanel'>
            <div className='Dashboard-RightContent'>
              {/*
              <StandardButton
                title={"Add Equipment"}
                onClick={OnClickedAddEquipment}
                className='Dashboard-AddEquipmentButton'
                icon={HiPlus}/>
              */}
              <div className='Dashboard-InUseSection'>
                <div className='Dashboard-SectionHeader'>
                  <p className='heading-5'>In Use</p>
                  <p className='paragraph-1'>3 items</p>
                </div>
                <div className='EquipmentDetailList-Container Dashboard-EquipmentDetailList'>
                  <div className='EquipmentDetailCard-Container Dashboard-EquipmentDetailCard'>
                    <div className='EquipmentDetailCard-Image'>
                      <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
                    </div>
                    <div className='EquipmentDetailCard-Details'>
                      <p className='heading-5 '>Fluke 87V MaxMaxMaxMax MaxMaxMaxMax</p>
                      <p className='paragraph-3'>Voltmeter</p>
                      <p className='paragraph-3'>VM-0035</p>
                    </div>
                  </div>
                  <div className='EquipmentDetailCard-Container Dashboard-EquipmentDetailCard'>
                    <div className='EquipmentDetailCard-Image'>
                      <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
                    </div>
                    <div className='EquipmentDetailCard-Details'>
                      <p className='heading-5 '>Fluke 87V MaxMaxMaxMax</p>
                      <p className='paragraph-3'>Voltmeter</p>
                      <p className='paragraph-3'>VM-0035</p>
                    </div>
                  </div>
                  <div className='EquipmentDetailCard-Container Dashboard-EquipmentDetailCard'>
                    <div className='EquipmentDetailCard-Image'>
                      <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
                    </div>
                    <div className='EquipmentDetailCard-Details'>
                      <p className='heading-5'>Fluke 87V </p>
                      <p className='paragraph-3'>Voltmeter</p>
                      <p className='paragraph-3'>VM-0035</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='Dashboard-UnderRepairSection'>
                <div className='Dashboard-SectionHeader'>
                  <p className='heading-5'>Under Repair</p>
                  <p className='paragraph-1'>2 items</p>
                </div>
                <div className='EquipmentDetailList-Container Dashboard-EquipmentDetailList'>
                  <div className='EquipmentDetailCard-Container Dashboard-EquipmentDetailCard'>
                    <div className='EquipmentDetailCard-Image'>
                      <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
                    </div>
                    <div className='EquipmentDetailCard-Details'>
                      <p className='heading-5 '>Fluke 87V MaxMax MaxMaxMaxMax</p>
                      <p className='paragraph-3'>Voltmeter</p>
                      <p className='paragraph-3'>VM-0035</p>
                    </div>
                  </div>
                  <div className='EquipmentDetailCard-Container Dashboard-EquipmentDetailCard'>
                    <div className='EquipmentDetailCard-Image'>
                      <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
                    </div>
                    <div className='EquipmentDetailCard-Details'>
                      <p className='heading-5 '>Fluke 87V MaxMax</p>
                      <p className='paragraph-3'>Voltmeter</p>
                      <p className='paragraph-3'>VM-0035</p>
                    </div>
                  </div>
                  <div className='EquipmentDetailCard-Container Dashboard-EquipmentDetailCard'>
                    <div className='EquipmentDetailCard-Image'>
                      <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
                    </div>
                    <div className='EquipmentDetailCard-Details'>
                      <p className='heading-5 '>Fluke 87V MaxMax</p>
                      <p className='paragraph-3'>Voltmeter</p>
                      <p className='paragraph-3'>VM-0035</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GeneralPage>
  )
}

export default DashboardPage;
