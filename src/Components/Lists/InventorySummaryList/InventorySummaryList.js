// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentTypeSummaryCard from '../../Cards/InventoryTypeSummaryCard/EquipmentTypeSummaryCard';
import { InventorySummaryResponse } from '../../../ResponseBody';
import { MESSAGE } from '../../../Constants';

// Import Stylings
import './InventorySummaryList.css';

// Import Icons


// Define Inventory Summary List component
function InventorySummaryList(props) {

  // Destructure props to extract relevant information
  const { className, selectedInventoryType, OnEquipmentTypeSummaryCardClick } = props;

  // Sort the inventory response alphabetically by equipment type name
  const sortedInventoryResponse = [...InventorySummaryResponse].sort((a, b) =>
    a.typeName.localeCompare(b.typeName)
  );

  return (
    <div className={`${className} InventorySummaryList-Container`}>
      {/* Render EquipmentTypeSummaryCard components for each inventory type summary */}
      {InventorySummaryResponse?.length > 0 
        ? 
          sortedInventoryResponse.map((item) => (
            <EquipmentTypeSummaryCard
              key={item.typeID}
              typeID={item.typeID}
              typeName={item.typeName}
              isSelected={selectedInventoryType === item.typeID}
              inventoryAmount={item.inventoryAmount}
              reservationAmount={item.reservationAmount}
              OnEquipmentTypeSummaryCardClick={OnEquipmentTypeSummaryCardClick}/>
        ))
        :
          <p className='paragraph-1 InventorySummaryList-Message'>{MESSAGE.emptyInventory}</p>
      }
    </div>
  )
}

// Define PropTypes for type-checking and documentation
InventorySummaryList.propTypes = {
  className: PropTypes.string,
  selectedInventoryType: PropTypes.number,
  OnEquipmentTypeSummaryCardClick: PropTypes.func,
}

// Set default values for props to avoid potential issues if not provided
InventorySummaryList.defaultProps = {
  className: '',
  selectedInventoryType: null,
  OnEquipmentTypeSummaryCardClick: null,
}

export default InventorySummaryList;
