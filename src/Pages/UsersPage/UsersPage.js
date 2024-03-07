// Import Components 
import React from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';

// Import Stylings
import './UsersPage.css';

// Import Icons
import { HiExclamation } from 'react-icons/hi';

// Define UsersPage Component
function UsersPage() {
  return (
    <GeneralPage>
      <div className='UsersPage-UnavailableFeature'>
        <HiExclamation className='UsersPage-UnavailableFeatureIcon'/>
        <p className='paragraph-1'>The feature is currently unavailable.</p>
      </div>
    </GeneralPage>
  )
};

// Exports the UsersPage component as the default export for the UsersPage module.
export default UsersPage;
