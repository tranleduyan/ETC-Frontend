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
            <div className='Dashboard-InventoryContainer'>
              <div className='Dashboard-SectionHeaderContainer'>
                <p className='heading-5'>Inventory</p>
                <div className='SearchBar-Container Dashboard-SearchBar'>

                </div>
              </div>
              <div className='InventoryList-Container Dashboard-InventoryList'>
                <div className='EquipmentTypeCard-Container'>
                  <div className='EquipmentTypeCard-InformationContainer'>
                    <HiArchive className='EquipmentTypeCard-Icon'/>
                    <div className='EquipmentTypeCard-Information'>
                      <p className='heading-5 EquipmentTypeCard-TypeName'>Voltmeter VoltmeterVoltmeter Voltmeter</p>
                      <p className='paragraph-1'>7 items</p>
                    </div>
                  </div>
                  <p className='paragraph-1'>Reserved: 2</p>
                </div>
                <div className='EquipmentTypeCard-Container'>
                  <div className='EquipmentTypeCard-InformationContainer'>
                    <HiArchive className='EquipmentTypeCard-Icon'/>
                    <div className='EquipmentTypeCard-Information'>
                      <p className='heading-5 EquipmentTypeCard-TypeName'>Voltmeter VoltmeterVoltmeter Voltmeter</p>
                      <p className='paragraph-1'>7 items</p>
                    </div>
                  </div>
                  <p className='paragraph-1'>Reserved: 2</p>
                </div>
                <div className='EquipmentTypeCard-Container'>
                  <div className='EquipmentTypeCard-InformationContainer'>
                    <HiArchive className='EquipmentTypeCard-Icon'/>
                    <div className='EquipmentTypeCard-Information'>
                      <p className='heading-5 EquipmentTypeCard-TypeName'>Voltmeter VoltmeterVoltmeter Voltmeter</p>
                      <p className='paragraph-1'>7 items</p>
                    </div>
                  </div>
                  <p className='paragraph-1'>Reserved: 2</p>
                </div>
                <div className='EquipmentTypeCard-Container'>
                  <div className='EquipmentTypeCard-InformationContainer'>
                    <HiArchive className='EquipmentTypeCard-Icon'/>
                    <div className='EquipmentTypeCard-Information'>
                      <p className='heading-5 EquipmentTypeCard-TypeName'>Voltmeter VoltmeterVoltmeter Voltmeter</p>
                      <p className='paragraph-1'>7 items</p>
                    </div>
                  </div>
                  <p className='paragraph-1'>Reserved: 2</p>
                </div>
                <div className='EquipmentTypeCard-Container'>
                  <div className='EquipmentTypeCard-InformationContainer'>
                    <HiArchive className='EquipmentTypeCard-Icon'/>
                    <div className='EquipmentTypeCard-Information'>
                      <p className='heading-5 EquipmentTypeCard-TypeName'>Voltmeter VoltmeterVoltmeter Voltmeter</p>
                      <p className='paragraph-1'>7 items</p>
                    </div>
                  </div>
                  <p className='paragraph-1'>Reserved: 2</p>
                </div>
                <div className='EquipmentTypeCard-Container'>
                  <div className='EquipmentTypeCard-InformationContainer'>
                    <HiArchive className='EquipmentTypeCard-Icon'/>
                    <div className='EquipmentTypeCard-Information'>
                      <p className='heading-5 EquipmentTypeCard-TypeName'>Voltmeter VoltmeterVoltmeter Voltmeter</p>
                      <p className='paragraph-1'>7 items</p>
                    </div>
                  </div>
                  <p className='paragraph-1'>Reserved: 2</p>
                </div>
                <div className='EquipmentTypeCard-Container'>
                  <div className='EquipmentTypeCard-InformationContainer'>
                    <HiArchive className='EquipmentTypeCard-Icon'/>
                    <div className='EquipmentTypeCard-Information'>
                      <p className='heading-5 EquipmentTypeCard-TypeName'>Voltmeter VoltmeterVoltmeter Voltmeter</p>
                      <p className='paragraph-1'>7 items</p>
                    </div>
                  </div>
                  <p className='paragraph-1'>Reserved: 2</p>
                </div>
              </div>
            </div>

            <div className='Dashboard-LeftContentSeparator'></div>

            <div className='Dashboard-ReservationsContainer'>
              <div className='Dashboard-SectionHeaderContainer'>
                <p className='heading-5'>Reservations</p>
                <div className='Dashboard-ReservationFilterContainer'>
                  <div className='FilterButton-Container FilterButton-Active'>
                    <p className='heading-5'>Approved</p>
                  </div>
                  <div className='FilterButton-Container'>
                    <p className='heading-5'>Requested</p>
                  </div>
                </div>
              </div>
              <div className='ReservationList-Container Dashboard-ReservationList'>
                <div className='ReservationCard-Container'>
                  <HiClock className='ReservationCard-Icon'/>
                  <div className='ReservationCard-InformationContainer'>
                    <p className='heading-5'>18/10/2024 - 20/10/2024</p>
                    <div className='ReservationCard-Information'>
                      <p className='paragraph-3 ReservationCard-RenterName'>Kim Yoo</p>
                      <p className='paragraph-3'>:&nbsp;</p>
                      <p className='paragraph-3 ReservationCard-ReserveAmount'>2 items</p>
                    </div>
                  </div>
                </div>
                <div className='ReservationCard-Container'>
                  <HiClock className='ReservationCard-Icon'/>
                  <div className='ReservationCard-InformationContainer'>
                    <p className='heading-5'>18/10/2024 - 20/10/2024</p>
                    <div className='ReservationCard-Information'>
                      <p className='paragraph-3 ReservationCard-RenterName'>Kim Yoo</p>
                      <p className='paragraph-3'>:&nbsp;</p>
                      <p className='paragraph-3 ReservationCard-ReserveAmount'>2 items</p>
                    </div>
                  </div>
                </div>
                <div className='ReservationCard-Container'>
                  <HiClock className='ReservationCard-Icon'/>
                  <div className='ReservationCard-InformationContainer'>
                    <p className='heading-5'>18/10/2024 - 20/10/2024</p>
                    <div className='ReservationCard-Information'>
                      <p className='paragraph-3 ReservationCard-RenterName'>Kim Yoo</p>
                      <p className='paragraph-3'>:&nbsp;</p>
                      <p className='paragraph-3 ReservationCard-ReserveAmount'>2 items</p>
                    </div>
                  </div>
                </div>
                <div className='ReservationCard-Container'>
                  <HiClock className='ReservationCard-Icon'/>
                  <div className='ReservationCard-InformationContainer'>
                    <p className='heading-5'>18/10/2024 - 20/10/2024</p>
                    <div className='ReservationCard-Information'>
                      <p className='paragraph-3 ReservationCard-RenterName'>Kim Yoo</p>
                      <p className='paragraph-3'>:&nbsp;</p>
                      <p className='paragraph-3 ReservationCard-ReserveAmount'>2 items</p>
                    </div>
                  </div>
                </div>
                <div className='ReservationCard-Container'>
                  <HiClock className='ReservationCard-Icon'/>
                  <div className='ReservationCard-InformationContainer'>
                    <p className='heading-5'>18/10/2024 - 20/10/2024</p>
                    <div className='ReservationCard-Information'>
                      <p className='paragraph-3 ReservationCard-RenterName'>Kim Yoo</p>
                      <p className='paragraph-3'>:&nbsp;</p>
                      <p className='paragraph-3 ReservationCard-ReserveAmount'>2 items</p>
                    </div>
                  </div>
                </div>
                <div className='ReservationCard-Container'>
                  <HiClock className='ReservationCard-Icon'/>
                  <div className='ReservationCard-InformationContainer'>
                    <p className='heading-5'>18/10/2024 - 20/10/2024</p>
                    <div className='ReservationCard-Information'>
                      <p className='paragraph-3 ReservationCard-RenterName'>Kim Yoo</p>
                      <p className='paragraph-3'>:&nbsp;</p>
                      <p className='paragraph-3 ReservationCard-ReserveAmount'>2 items</p>
                    </div>
                  </div>
                </div>
                <div className='ReservationCard-Container'>
                  <HiClock className='ReservationCard-Icon'/>
                  <div className='ReservationCard-InformationContainer'>
                    <p className='heading-5'>18/10/2024 - 20/10/2024</p>
                    <div className='ReservationCard-Information'>
                      <p className='paragraph-3 ReservationCard-RenterName'>Kim Yoo</p>
                      <p className='paragraph-3'>:&nbsp;</p>
                      <p className='paragraph-3 ReservationCard-ReserveAmount'>2 items</p>
                    </div>
                  </div>
                </div>
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
