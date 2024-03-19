//#region Import Necessary Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { resetUserData } from '../../../storage';
import { connect } from 'react-redux';
//#endregion

// Import stylings
import './UnauthorizedPanel.css';

// Import UI Components
import LinkButton from '../../Buttons/LinkButton/LinkButton';

// Define Unauthorized Panel component
function UnauthorizedPanel( props ) {

  // Extract relevant information
  const { userRole } = props;
  const navigate = useNavigate();

  // Sign the user out by reset user data in Redux
  const SignOut = () => {
   // Dispatch the resetUserData action
   resetUserData();
   navigate('/');
 };

  return (
    <div className='UnauthorizedPanel-MessageContainer'>
      <div className='UnauthorizedPanel-Message'>
        <p className='paragraph-1'>
          You are not authorized. <br/> Please contact the administrators.</p>
        <LinkButton 
          onClick={(userRole === 'Admin' || userRole === 'Student' || userRole === 'Faculty') ? () => navigate('/Dashboard') : SignOut} 
          title={(userRole === 'Admin' || userRole === 'Student' || userRole === 'Faculty') ? 'Go to Dashboard' : 'Sign Out'}/>
      </div>
    </div>
  )
};

// Map userRole from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Connect the component to Redux, mapping actions to props
export default connect(mapStateToProps, mapDispatchToProps)(UnauthorizedPanel);
