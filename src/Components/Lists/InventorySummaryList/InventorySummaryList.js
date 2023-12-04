// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentTypeSummaryCard from '../../Cards/InventoryTypeSummaryCard/EquipmentTypeSummaryCard';

// Import Stylings
import './InventorySummaryList.css';

// Import Icons


// Render Inventory Summary List
function InventorySummaryList(props) {

  const { className } = props;

  return (
    <div className={`${className} InventorySummaryList-Container`}>
      <EquipmentTypeSummaryCard typeName='Voltmeter'/>
    </div>
  )
}

InventorySummaryList.propTypes = {
  className: PropTypes.string,
}

InventorySummaryList.defaultProps = {
  className: '',
}

export default InventorySummaryList;
