// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentTypeSummaryCard from '../../Cards/InventoryTypeSummaryCard/EquipmentTypeSummaryCard';

// Import Stylings
import './InventorySummaryList.css';

// Import Icons


// Render Inventory Summary List
function InventorySummaryList(props) {

  const { className, selectedInventoryType, OnEquipmentTypeSummaryCardClick } = props;

  return (
    <div className={`${className} InventorySummaryList-Container`}>
      <EquipmentTypeSummaryCard 
        typeName='Voltmeter'
        selected={selectedInventoryType === 'Voltmeter'}
        OnEquipmentTypeSummaryCardClick={OnEquipmentTypeSummaryCardClick}/>
    </div>
  )
}

InventorySummaryList.propTypes = {
  className: PropTypes.string,
  selectedInventoryType: PropTypes.string,
  OnEquipmentTypeSummaryCardClick: PropTypes.func,
}

InventorySummaryList.defaultProps = {
  className: '',
  selectedInventoryType: '',
  OnEquipmentTypeSummaryCardClick: null,
}

export default InventorySummaryList;
