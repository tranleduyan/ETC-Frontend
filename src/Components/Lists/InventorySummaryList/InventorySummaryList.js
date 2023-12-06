// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentTypeSummaryCard from '../../Cards/InventoryTypeSummaryCard/EquipmentTypeSummaryCard';
import { InventorySummaryResponse } from '../../../ResponseBody';

// Import Stylings
import './InventorySummaryList.css';

// Import Icons


// Render Inventory Summary List
function InventorySummaryList(props) {

  const { className, selectedInventoryType, OnEquipmentTypeSummaryCardClick } = props;

  const sortedInventoryResponse = [...InventorySummaryResponse].sort((a, b) =>
    a.typeName.localeCompare(b.typeName)
  );

  return (
    <div className={`${className} InventorySummaryList-Container`}>
      {sortedInventoryResponse.map((item) => (
        <EquipmentTypeSummaryCard
          key={item.typeID}
          typeID={item.typeID}
          typeName={item.typeName}
          isSelected={selectedInventoryType === item.typeID}
          inventoryAmount={item.inventoryAmount}
          reservationAmount={item.reservationAmount}
          OnEquipmentTypeSummaryCardClick={OnEquipmentTypeSummaryCardClick}/>
      ))}
    </div>
  )
}

InventorySummaryList.propTypes = {
  className: PropTypes.string,
  selectedInventoryType: PropTypes.number,
  OnEquipmentTypeSummaryCardClick: PropTypes.func,
}

InventorySummaryList.defaultProps = {
  className: '',
  selectedInventoryType: null,
  OnEquipmentTypeSummaryCardClick: null,
}

export default InventorySummaryList;
