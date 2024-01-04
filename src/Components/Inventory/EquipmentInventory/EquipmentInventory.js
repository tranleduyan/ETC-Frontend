// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentInventoryCard from '../../Cards/EquipmentInventoryCard/EquipmentInventoryCard';
import { EquipmentInventoryResponse } from '../../../ResponseBody';

// Import Stylings
import './EquipmentInventory.css';

// Define Equipment Inventory Component
function EquipmentInventory(props) {
  
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

EquipmentInventory.propTypes = {
    className: PropTypes.string,
};

EquipmentInventory.defaultProps = {
    className: '',
};

// Exports the EquipmentInventory component as the default export for the EquipmentInventory module.
export default EquipmentInventory;
