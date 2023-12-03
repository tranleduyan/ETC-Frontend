// Import Components 
import React from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';
import StandardButton from '../../Components/Buttons/StandardButton';

// Import Stylings
import './DashboardPage.css';

// Import Icons
import { HiPlus, HiArchive, HiClock } from 'react-icons/hi';

// All Pages must be inherit General Page
function DashboardPage() {
  
  const OnClickedAddEquipment = () => {
    console.log("Add Equipment Clicked");
  }

  return (
    <GeneralPage>
      <div className='Dashboard-PageContentContainer'>
        <div className='Dashboard-PageHeaderContainer'>
          <p className='heading-2'>Dashboard</p>
        </div>
        <div className='Dashboard-ContentContainer'>
          <div className='Dashboard-LeftContentPanel'>

            <div className='Dashboard-InventorySection'>
              <div className='Dashboard-SectionHeader'>
                <p className='heading-5'>Inventory</p>
                <div className='SearchBar-Container Dashboard-SearchBar'>
                  
                </div>
              </div>
              
              <div className='InventoryList-Container Dashboard-InventoryList'>

              </div>
            </div>
            <div className='Dashboard-LeftContentSeparator'></div>
            
            <div className='Dashboard-ReservationSection'>
              <div className='Dashboard-SectionHeader'>
                <p className='heading-5'>Reservation</p>
                <div className='Dashboard-ReservationFilterContainer'>
                  
                </div>
              </div>
              <div className='ReservationList-Container Dashboard-ReservationList'>
                
              </div>
            </div>
          </div>
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
