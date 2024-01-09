//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { EquipmentInventoryResponse } from '../../../ResponseBody';
//#endregion

// Import UI Components
import EquipmentInventoryCard from '../../Cards/EquipmentInventoryCard/EquipmentInventoryCard';

// Import Stylings
import './EquipmentInventory.css';

// Define Equipment Inventory Component
function EquipmentInventory(props) {
  
  // Extract necessary props - TODO: Implement Get All Equipment APIs
  const { className } = props;

  return (
    <div className={`EquipmentInventory-Container ${className}`}>
      {EquipmentInventoryResponse.map((item) => (
        <EquipmentInventoryCard
          key={item.equipmentSerialId}
          typeId={item.typeId}
          typeName={item.typeName}
          serialNumber={item.equipmentSerialId}
          modelId={item.modelId}
          modelName={item.modelName}
          modelPhoto={item.modelPhoto}
          maintenanceStatus={item.maintenanceStatus}
           />
      ))}
    </div>
  )
};

// Define PropTypes for Equipment Inventory
EquipmentInventory.propTypes = {
    className: PropTypes.string,
};

// Define defaultProps for EquipmentInventory
EquipmentInventory.defaultProps = {
    className: '',
};

// Exports the EquipmentInventory component as the default export for the EquipmentInventory module.
export default EquipmentInventory;
