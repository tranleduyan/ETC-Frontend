// Import Components 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetUserData } from '../../storage.js';
import AdminDashboard from '../../Components/Dashboards/AdminDashboard/AdminDashboard';
import FacultyDashboard from '../../Components/Dashboards/FacultyDashboard/FacultyDashboard';
import StudentDashboard from '../../Components/Dashboards/StudentDashboard/StudentDashboard';
import LinkButton from '../../Components/Buttons/LinkButton/LinkButton.js';

// Import Stylings
import './DashboardPage.css';

// Define the DashboardPage Component
function DashboardPage(props) {

  // Destructure props to extract userRole and Redux action
  const { userRole } = props;
  const navigate = useNavigate();

 // Sign the user out by reset user data in Redux
 const SignOut = () => {
  // Dispatch the resetUserData action
  resetUserData();
  navigate('/');
};

  return (
    <>
    { userRole === 'Admin' && <AdminDashboard /> }
    { userRole === 'Faculty' && <FacultyDashboard/> }
    { userRole === 'Student' && <StudentDashboard/> }
    {userRole !== 'Admin' && userRole !== 'Faculty' && userRole !== 'Student' && (
      <div className='Dashboard-MessageContainer'>
        <div className='Dashboard-Message'>
          <p className='paragraph-1'>
            Your role is not defined.</p>
          <LinkButton 
            onClick={SignOut} 
            title={'Sign Out.'}/>
        </div>
      </div>
    )}
    </>
  )
};

// Define PropTypes for type-checking and documentation
DashboardPage.propTypes = {
  userRole: PropTypes.string,
};

// Set default values for props to avoid potential issues if not provided
DashboardPage.defaultProps = {
  userRole: '',
};

// Map userRole from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Connect the component to Redux, mapping state and actions to props
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
