// Import Components 
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminDashboard from '../../Components/Dashboards/AdminDashboard/AdminDashboard';
import FacultyDashboard from '../../Components/Dashboards/FacultyDashboard/FacultyDashboard';
import StudentDashboard from '../../Components/Dashboards/StudentDashboard/StudentDashboard';
import UnauthorizedPanel from '../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel.js';

// Define the DashboardPage Component
function DashboardPage(props) {

  // Destructure props to extract userRole and Redux action
  const { userRole } = props;

  return (
    <>
    { userRole === 'Admin' && <AdminDashboard /> }
    { userRole === 'Faculty' && <FacultyDashboard/> }
    { userRole === 'Student' && <StudentDashboard/> }
    {userRole !== 'Admin' && userRole !== 'Faculty' && userRole !== 'Student' && (
      <UnauthorizedPanel />
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

// Connect the component to Redux, mapping state and actions to props
export default connect(mapStateToProps)(DashboardPage);
