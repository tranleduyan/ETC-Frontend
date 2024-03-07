// Import Components 
import React from 'react';
import GeneralPage from '../GeneralPage/GeneralPage';

// Import Stylings
import './ReservationsPage.css';
import { HiExclamation } from 'react-icons/hi';

// Define ReservationsPage Component
function ReservationsPage() {
  return (
    <GeneralPage>
      <div className='ReservationsPage-UnavailableFeature'>
        <HiExclamation className='ReservationsPage-UnavailableFeatureIcon'/>
        <p className='paragraph-1'>The feature is currently unavailable.</p>
      </div>
    </GeneralPage>
  )
};

// Exports the ReservationsPage component as the default export for the ReservationsPage module.
export default ReservationsPage;
