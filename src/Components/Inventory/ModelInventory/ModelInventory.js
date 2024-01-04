// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './ModelInventory.css';
import { ModelInventoryResponse } from '../../../ResponseBody';
import ModelInventoryCard from '../../Cards/ModelInventoryCard/ModelInventoryCard';

// Define ModelInventory Component
function ModelInventory(props) {

  const { className } = props;

  return (
    <div className={`ModelInventory-Container ${className}`}>
      {ModelInventoryResponse.map((item) => (
        <ModelInventoryCard
          key={item.modelId}
          modelPhoto={item.modelPhoto}
          modelName={item.modelName}
          typeName={item.typeName}
          equipmentAmount={item.equipmentAmount}/>
      ))}
    </div>
  )
};

// Define Proptypes for the component
ModelInventory.propTypes = {
  className: PropTypes.string,
};
  
// Define DefaultProps for the component
ModelInventory.defaultProps = {
  className: '',
};

// Exports the ModelInventory component as the default export for the ModelInventory module.
export default ModelInventory;
