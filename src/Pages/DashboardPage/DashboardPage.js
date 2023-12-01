// Import Components 
import React from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';

// Import Stylings
import './DashboardPage.css';

// Import Icons

// All Pages must be inherit General Page
function DashboardPage() {
  return (
    <GeneralPage>
      <div className='Dashboard-PageContentContainer'>
        <div className='Dashboard-PageHeaderContainer'>
          <p className='heading-2'>Dashboard</p>
        </div>
        <div className='Dashboard-ContentContainer'>

        </div>
      </div>
    </GeneralPage>
  )
}

export default DashboardPage;
