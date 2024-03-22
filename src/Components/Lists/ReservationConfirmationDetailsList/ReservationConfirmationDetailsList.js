//#region Import Neccessary Dependencies
import React from 'react';
//#endregion

// Import Stylings
import './ReservationConfirmationDetailsList.css';

//#region Import UI Components
import ReservationConfirmationDetailsCard from '../../Cards/ReservationConfirmationDetailsCard';
//#endregion

//#region Import Icons

//#endregion

function ReservationConfirmationDetailsList(props) {

  // Extract neccessary props
  const { className, selectedModels} = props;

  return (
    <div className={`ReservationConfirmationDetailsList-Container ${className}`}>
      {selectedModels.map((item) => (
        <ReservationConfirmationDetailsCard 
          key={item.modelId}
          modelName={item.modelName}
          modelPhoto={item.modelPhoto}
          typeName={item.typeName}
          availableCount={item.availableCount}
          quantity={item.quantity}/>
      ))}
        
    </div>
  )
};

// Exports the ReservationConfirmationDetailsList component as the default export for the ReservationConfirmationDetailsList module.
export default ReservationConfirmationDetailsList;