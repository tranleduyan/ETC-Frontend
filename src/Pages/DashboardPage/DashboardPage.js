// Import Components 
import React, { useState } from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';
import StandardButton from '../../Components/Buttons/StandardButton';
import InventorySummaryList from '../../Components/Lists/InventorySummaryList/InventorySummaryList';
import ReservationList from '../../Components/Lists/ReservationList/ReservationList';
import FilterButton from '../../Components/Buttons/FilterButton/FilterButton';
import SearchBarInputField from '../../Components/InputFields/SearchBarInputField/SearchBarInputField';
import DetailSection from '../../Components/Sections/DetailSection/DetailSection';

// Import Stylings
import './DashboardPage.css';

// Import Icons
import { HiPlus, HiCheck, HiX } from 'react-icons/hi';

// All Pages must be inherit General Page
function DashboardPage() {
  
  // Search Query Object
  const [searchQuery, setSearchQuery] = useState({
    equipmentType: '',
  });

  const [selectedInventoryType, setSelectedInventoryType] = useState(null);

  const [selectedReservation, setSelectedReservation] = useState(null);
  
  const HandleSearchQueryChange = (propertyName, inputValue) => {
    setSearchQuery({...searchQuery, [propertyName]: inputValue});
  }

  const OnEquipmentTypeSummaryCardClick = (selectedEquipmentType) => {
    setSelectedReservation(null);
    setSelectedInventoryType((prevSelectedEquipmentType) => 
      prevSelectedEquipmentType === selectedEquipmentType ? null : selectedEquipmentType
    );
  }

  const OnReservationCardClick = (selectedReservation) => {
    setSelectedInventoryType(null);
    setSelectedReservation((prevSelectedReservation) => 
      prevSelectedReservation === selectedReservation ? null : selectedReservation
    );
  }

  const OnAddEquipmentClick = () => {
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
              <InventorySummaryList 
                className='Dashboard-InventorySummaryList'
                selectedInventoryType={selectedInventoryType}
                OnEquipmentTypeSummaryCardClick={OnEquipmentTypeSummaryCardClick}/>
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
              <ReservationList className='Dashboard-ReservationList'
                filterMode='upcoming'
                selectedReservation={selectedReservation}
                OnReservationCardClick={OnReservationCardClick}/>
            </div>
          </div>
          {/* Right Content Panel */}
          <div className='Dashboard-RightContentPanel'>
            <div className='Dashboard-RightContent'>
              {selectedInventoryType === null && selectedReservation === null && (
              <StandardButton
                title={"Add Equipment"}
                onClick={OnAddEquipmentClick}
                className='Dashboard-AddEquipmentButton'
                icon={HiPlus}/>
              )}
              {selectedInventoryType && (
                <>
                  <DetailSection 
                    className='Dashboard-InUseSection'
                    title='In Use'/>
                  <DetailSection
                    className='Dashboard-UnderRepairSection'
                    title='Under Repair'/>
                </>
              )}
              {selectedReservation && (
                <>
                  <DetailSection
                    className='Dashboard-ReservationDetailSection'
                    title='Reservation Details'
                    additionalInformation='10/15/2023 - 10/17/2023'/>
                  <div className='Dashboard-ReservationActionContainer'>
                    <StandardButton
                      title={"Approve"}
                      onClick={OnAddEquipmentClick}
                      className='Dashboard-ReservationActionButton'
                      icon={HiCheck}/>
                    <StandardButton
                      title={"Reject"}
                      onClick={OnAddEquipmentClick}
                      className='Dashboard-ReservationActionButton'
                      icon={HiX}/>
                  </div>
                </>
               )}
            </div>
          </div>
        </div>
      </div>
    </GeneralPage>
  )
}

export default DashboardPage;
