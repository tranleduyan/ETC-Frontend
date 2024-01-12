//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetUserData } from '../../storage.js';
//#endregion

//#region Import UI Components
import IconButton from '../../Components/Buttons/IconButton/IconButton.js';
import Logo from '../../Components/Logo/Logo.js';
//#endregion

// Import Stylings
import './NavigationBar.css';

//#region Import Icons
import { HiViewGrid, HiCalendar, HiArchive, 
         HiPlusCircle, HiUserGroup, HiBell, 
         HiCog, HiLogout } from 'react-icons/hi';
//#endregion

// Render the navigation bar
function NavigationBar(props) {

  const { resetUserData, userRole } = props;

  const location = useLocation();
  const navigate = useNavigate();

  // If the button title is equal to the Location Path Name starts with '/PageTitle', return className as 'active' with the page
  const ActivateButton = (title) => {
    
    // Get the current location path name
    const currentLocation = location.pathname;

    // If the current location matches with the title, return the active class name
    if(currentLocation.startsWith(`/${title}`)){
      return 'NavigationBarButton-Active';
    }

    // Else return empty class name
    return '';
  };

  //#region Navigation Pages (For Scaling Purpose)
  const NavigateDashboard = () => {
    navigate('/Dashboard')
  };

  const NavigateReservations = () => {
    navigate('/Reservations')
  };

  const NavigateInventory = () => {
    navigate('/Inventory')
  };

  const NavigateAddToInventory = () => {
    navigate('/AddToInventory')
  };

  const NavigateUsers = () => {
    navigate('/Users')
  };

  const NavigateNotifications = () => {
    navigate('/Notifications')
  };

  const NavigateSettings = () => {
    navigate('/Settings')
  };
  //#endregion

  // Sign the user out by reset user data in Redux
  const SignOut = () => {
    // Dispatch the resetUserData action
    resetUserData();
    navigate('/');
  };

  return (
    <div className='NavigationBar-Container'>
    <Logo className='NavigationBar-LogoContainer'/>
    {/* Main Menu */}
    <div className={`NavigationBar-Menu NavigationBar-${userRole}`}>
      {/* Dashboard Button */}
      <IconButton 
        icon={HiViewGrid} 
        className={`${ActivateButton('Dashboard')} NavigationBarButton-Container NavigationBarButton-DashboardButton`} 
        onClick={NavigateDashboard}/>
      {/* Reservations Button */}
      <IconButton 
        icon={HiCalendar} 
        className={`${ActivateButton('Reservations')} NavigationBarButton-Container NavigationBarButton-ReservationsButton`} 
        onClick={NavigateReservations}/>
      {/* Inventory Button */}
      <IconButton 
        icon={HiArchive} 
        className={`${ActivateButton('Inventory')} NavigationBarButton-Container NavigationBarButton-InventoryButton`} 
        onClick={NavigateInventory}/>
          
      {/* Add To Inventory Button */}
      <IconButton 
        icon={HiPlusCircle} 
        className={`${ActivateButton('AddToInventory')} NavigationBarButton-Container NavigationBarButton-AddEquipmentButton`} 
        onClick={NavigateAddToInventory}/>
          
      {/* Users Button */}
      <IconButton 
        icon={HiUserGroup} 
        className={`${ActivateButton('Users')} NavigationBarButton-Container NavigationBarButton-UsersButton`} 
        onClick={NavigateUsers}/>
      
      {/* Notifications Button */}
      <IconButton 
        icon={HiBell} 
        className={`${ActivateButton('Notifications')} NavigationBarButton-Container NavigationBarButton-NotificationsButton`} 
        onClick={NavigateNotifications}/>
      {/* Settings Button */}
      <IconButton 
        icon={HiCog} 
        className={`${ActivateButton('Settings')} NavigationBarButton-Container NavigationBarButton-SettingsButton`} 
        onClick={NavigateSettings}/>
    </div>
    {/* Log Out Button */}
    <IconButton 
      icon={HiLogout} 
      className='NavigationBarButton-SignOutButton' 
      onClick={SignOut}/>
    </div>
  )
};

// Define PropTypes for the NavigationBar component
NavigationBar.propTypes = {
  resetUserData: PropTypes.func.isRequired,
  userRole: PropTypes.string,
};

NavigationBar.defaultProps = {
  userRole: 'Student',
};

// Map the userRole from Redux store to props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Connect the components to the ReduxStore for actions
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
