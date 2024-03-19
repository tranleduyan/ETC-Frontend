//#region Import Necessary Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API, MESSAGE } from '../../../Constants';
//#endregion

// Import Stylings
import './InventorySummaryList.css';

// Import UI Components
import EquipmentTypeSummaryCard from '../../Cards/InventoryTypeSummaryCard/EquipmentTypeSummaryCard';

// Define Inventory Summary List component
function InventorySummaryList(props) {

  // Destructure props to extract relevant information
  const { className, selectedInventoryType, OnEquipmentTypeSummaryCardClick } = props;

  // State to store the fetched inventory types from the API
  const [inventoryTypes, setInventoryTypes] = useState([]);

  // Fetch inventory types when the component mounts
  useEffect(() => {
    axios.get(`${API.domain}/api/inventory/types`, {
      headers: {
        'X-API-KEY': API.key,
      }
    })
    .then(response => {
      // Update state with sorted inventory types from the API response
      setInventoryTypes([...response.data.responseObject].sort((a, b) => 
                        a.typeName.localeCompare(b.typeName)));
    })
    .catch(error => {
      // Handle errors if not found, setting inventoryTypes to an empty array
      setInventoryTypes([]);
    });
  }, []);

  return (
    <div className={`${inventoryTypes?.length > 0 ? 'InventorySummaryList-Container' : 'InventorySummaryList-Message'} ${className}`}>
      {/* Render EquipmentTypeSummaryCard components for each inventory type summary */}
      {inventoryTypes?.length > 0 
        ? 
        inventoryTypes.map((item) => (
            <EquipmentTypeSummaryCard
              key={item.typeId}
              typeID={item.typeId}
              typeName={item.typeName}
              isSelected={selectedInventoryType === item.typeId}
              inventoryAmount={item.modelCount}
              reservationAmount={item.reserved}
              OnEquipmentTypeSummaryCardClick={OnEquipmentTypeSummaryCardClick}/>
        ))
        :
          <p className='paragraph-1'>{MESSAGE.emptyInventory}</p>
      }
    </div>
  )
};

// Define PropTypes for type-checking and documentation
InventorySummaryList.propTypes = {
  className: PropTypes.string,
  selectedInventoryType: PropTypes.number,
  OnEquipmentTypeSummaryCardClick: PropTypes.func,
};

// Set default values for props to avoid potential issues if not provided
InventorySummaryList.defaultProps = {
  className: '',
  selectedInventoryType: null,
  OnEquipmentTypeSummaryCardClick: null,
};

// Exports the InventorySummaryList component as the default export for the InventorySummaryList module.
export default InventorySummaryList;
