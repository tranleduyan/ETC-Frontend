// Import Components 
import React from 'react';
import { API } from '../../Constants';

// Import Stylings
import './DashboardPage.css';

// Import Icons

// All Pages must be inherit General Page
function DashboardPage() {
  console.log(API.domain);
  console.log(process.env.NODE_ENV);
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage