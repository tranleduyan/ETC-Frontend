// Import Components
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import IconButton from '../../Components/Buttons/IconButton/IconButton.js';
import Logo from '../../Components/Logo/Logo.js';
import { connect } from 'react-redux';
import { resetUserData } from '../../storage.js';

// Import Stylings
import './NavigationBar.css';

// Import Icons
import { HiViewGrid, HiCalendar, HiArchive, HiPlusCircle, HiUserGroup, HiBell, HiCog, HiLogout } from 'react-icons/hi';

function NavigationBar(props) {

  const location = useLocation();
  const navigate = useNavigate();

  /* If the button title is equal to the Location Path Name starts with '/PageTitle', return className as 'active' with the page */
  const ActivateButton = (title) => {
    const currentLocation = location.pathname;

    if(currentLocation.startsWith('/Dashboard') && title === 'Dashboard'){
      return 'NavigationBarButton-Active';
    }
    
    else if(currentLocation.startsWith('/Reservations') && title === 'Reservations'){
      return 'NavigationBarButton-Active';
    }

    else if(currentLocation.startsWith('/Inventory') && title === 'Inventory'){
      return 'NavigationBarButton-Active';
    }

    else if(currentLocation.startsWith('/AddEquipment') && title === 'AddEquipment'){
      return 'NavigationBarButton-Active';
    }

    else if(currentLocation.startsWith('/Users') && title === 'Users'){
      return 'NavigationBarButton-Active';
    }
    
    else if(currentLocation.startsWith('/Notifications') && title === 'Notifications'){
      return 'NavigationBarButton-Active';
    }

    else if(currentLocation.startsWith('/Settings') && title === 'Settings'){
      return 'NavigationBarButton-Active';
    }
  }

  //#region Navigation Pages (For Scaling Purpose)
  const NavigateDashboard = () => {
    navigate('/Dashboard')
  }

  const NavigateReservations = () => {
    navigate('/Reservations')
  }

  const NavigateInventory = () => {
    navigate('/Inventory')
  }

  const NavigateAddEquipment = () => {
    navigate('/AddEquipment')
  }

  const NavigateUsers = () => {
    navigate('/Users')
  }

  const NavigateNotifications = () => {
    navigate('/Notifications')
  }

  const NavigateSettings = () => {
    navigate('/Settings')
  }
  //#endregion

  // Sign the user out by reset user data in Redux
  const SignOut = () => {
    // Dispatch the resetUserData action
    props.resetUserData();
    navigate('/');
  }

  // TODO: Show/Hide buttons based on user classes after sign in!
  return (
    <div className='NavigationBar-Container'>
    <Logo className='NavigationBar-LogoContainer'/>
    {/* Main Menu */}
    <div className='NavigationBar-Menu'>
      <IconButton 
        icon={HiViewGrid} 
        className={`${ActivateButton('Dashboard')} NavigationBarButton-Container`} 
        onClick={NavigateDashboard}/>
      <IconButton 
        icon={HiCalendar} 
        className={`${ActivateButton('Reservations')} NavigationBarButton-Container`} 
        onClick={NavigateReservations}/>
      <IconButton 
        icon={HiArchive} 
        className={`${ActivateButton('Inventory')} NavigationBarButton-Container`} 
        onClick={NavigateInventory}/>
      <IconButton 
        icon={HiPlusCircle} 
        className={`${ActivateButton('AddEquipment')} NavigationBarButton-Container`} 
        onClick={NavigateAddEquipment}/>
      <IconButton 
        icon={HiUserGroup} 
        className={`${ActivateButton('Users')} NavigationBarButton-Container`} 
        onClick={NavigateUsers}/>
      <IconButton 
        icon={HiBell} 
        className={`${ActivateButton('Notifications')} NavigationBarButton-Container`} 
        onClick={NavigateNotifications}/>
      <IconButton 
        icon={HiCog} 
        className={`${ActivateButton('Settings')} NavigationBarButton-Container`} 
        onClick={NavigateSettings}/>
    </div>
    {/* Log Out Button */}
    <IconButton 
      icon={HiLogout} 
      className='NavigationBarButton-SignOutButton' 
      onClick={SignOut}/>
    </div>
  )
}

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
}

// Connect the components to the ReduxStore for actions
export default connect(null, mapDispatchToProps)(NavigationBar);
