// Import Components 
import React, { useState } from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';
import StandardButton from '../../Components/Buttons/StandardButton';
import InventorySummaryList from '../../Components/Lists/InventorySummaryList/InventorySummaryList';
import ReservationList from '../../Components/Lists/ReservationList/ReservationList';
import FilterButton from '../../Components/Buttons/FilterButton/FilterButton';

// Import Stylings
import './DashboardPage.css';

// Import Icons
import { HiPlus } from 'react-icons/hi';
import SearchBarInputField from '../../Components/InputFields/SearchBarInputField/SearchBarInputField';

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
            <StandardButton
              title={"Add Equipment"}
              onClick={OnClickedAddEquipment}
              className='Dashboard-AddEquipmentButton'
              icon={HiPlus}/>
          </div>
        </div>
      </div>
    </GeneralPage>
  )
}

export default DashboardPage;
