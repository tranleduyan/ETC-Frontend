//#region Import Neccessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import Stylings
import './SpecifyModelReservationQuantityList.css';

//#region Import UI Components
import SpecifyModelQuantityCard from '../../Cards/SpecifyModelQuantityCard/SpecifyModelQuantityCard';
//#endregion

// Define SpecifyModelReservationQuantityList Component
function SpecifyModelReservationQuantityList(props) {

  // Extract neccessary props
  const { className, selectedModels, onIncreaseQuantity, onDecreaseQuantity } = props;

  return (
    <div className={`SpecifyModelReservationQuantityList-Container ${className}`}>
      {selectedModels.map((item) => (
        <SpecifyModelQuantityCard
          key={item.modelId}
          modelId={item.modelId}
          modelName={item.modelName}
          modelPhoto={item.modelPhoto}
          typeName={item.typeName}
          typeId={item.typeId}
          availableCount={item.availableCount}
          quantity={item.quantity}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}/>
      ))}
    </div>
  )
};

// Define propTypes for SpecifyModelReservationQuantityList
SpecifyModelReservationQuantityList.propTypes = {
  className: PropTypes.string,
  selectedModels: PropTypes.array,
};

// Define defaultProps for SpecifyModelReservationQuantityList
SpecifyModelReservationQuantityList.defaultProps = {
  className: '',
  selectedModels: [],
};

// Exports the SpecifyModelReservationQuantityList component as the default export for the SpecifyModelReservationQuantityList module.
export default SpecifyModelReservationQuantityList;