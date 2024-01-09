//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import UI Components
import NavigationBar from '../../Components/NavigationBar/NavigationBar.js';

// Import Stylings
import './GeneralPage.css';

// Define GeneralPage component
function GeneralPage({ children }) {
  return (
    <div className='wrapper GeneralPage-Wrapper'>
      <NavigationBar/>
      { children }
    </div>
  )
};

// Define PropTypes for type-checking and documentation
GeneralPage.propTypes = {
  children: PropTypes.node, // 'children' can be any node (React element, string, number, etc.)
};

// Exports the GeneralPage component as the default export for the GeneralPage module.
export default GeneralPage;
