//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { MESSAGE } from '../../../Constants';
//#endregion

// Import UI Components
import EquipmentInventoryCard from '../../Cards/EquipmentInventoryCard/EquipmentInventoryCard';

// Import Stylings
import './EquipmentInventory.css';

// Define Equipment Inventory Component
function EquipmentInventory(props) {
  
  // Extract necessary props
  const { className, equipmentInventory, selectedEquipment, onSelectEquipment } = props;

  return (
    <div className={`${equipmentInventory?.length > 0 ? 'EquipmentInventory-Container' : 'EquipmentInventory-Message'} ${className}`}>
      {equipmentInventory?.length > 0
        ?
        equipmentInventory.map((item) => (
          <EquipmentInventoryCard
            key={item.serialId}
            typeName={item.typeName}
            serialId={item.serialId}
            modelPhoto={item.modelPhoto}
            maintenanceStatus={item.maintenanceStatus}
            isSelected={selectedEquipment.includes(item.serialId)}
            onSelect={onSelectEquipment}/>
      ))
        :
          <p className='paragraph-1'>{MESSAGE.emptyEquipment}</p>
      }
    </div>
  )
};

// Define PropTypes for Equipment Inventory
EquipmentInventory.propTypes = {
    className: PropTypes.string,
    selectedEquipment: PropTypes.array.isRequired,
    onSelectEquipment: PropTypes.func.isRequired,
    equipmentInventory: PropTypes.array.isRequired,
};

// Define defaultProps for EquipmentInventory
EquipmentInventory.defaultProps = {
    className: '',
};

// Exports the EquipmentInventory component as the default export for the EquipmentInventory module.
export default EquipmentInventory;
