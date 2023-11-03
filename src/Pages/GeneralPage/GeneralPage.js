// Import Components
import React from 'react';
import NavigationBar from '../../Components/NavigationBar/NavigationBar.js';

//Import Stylings
import './GeneralPage.css';

function GeneralPage({ children }) {
  return (
    <div className='wrapper GeneralPage-Wrapper'>
      <NavigationBar/>
      { children }
    </div>
  )
}

export default GeneralPage