// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import TypeInventoryCard from '../../Cards/TypeInventoryCard/TypeInventoryCard';
import { TypeInventoryResponse } from '../../../ResponseBody';

// Import Stylings
import './TypeInventory.css';

// Define TypeInventory Component
function TypeInventory(props) {

  const { className } = props;

  return (
    <div className={`TypeInventory-Container ${className}`}>
      {TypeInventoryResponse.map((item) => (
        <TypeInventoryCard 
          key={item.typeId}
          typeId={item.typeId}
          typeName={item.typeName}
          modelAmount={item.modelAmount}
          equipmentAmount={item.equipmentAmount}
          />
      ))}
    </div>
  )
};

// Define Proptypes for the component
TypeInventory.propTypes = {
  className: PropTypes.string,
};

// Define DefaultProps for the component
TypeInventory.defaultProps = {
  className: '',
};

// Exports the TypeInventory component as the default export for the TypeInventory module.
export default TypeInventory;
