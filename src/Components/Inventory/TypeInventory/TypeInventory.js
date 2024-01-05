// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import TypeInventoryCard from '../../Cards/TypeInventoryCard/TypeInventoryCard';
import { MESSAGE } from '../../../Constants';

// Import Stylings
import './TypeInventory.css';

// Define TypeInventory Component
function TypeInventory(props) {

  const { className, selectedTypes, onSelectType, typeInventory } = props;

  return (
    <div className={`${typeInventory?.length > 0 ? 'TypeInventory-Container' : 'TypeInventory-Message' } ${className}`}>
      {typeInventory?.length > 0
        ?
        typeInventory.map((item) => (
          <TypeInventoryCard 
            key={item.typeId}
            typeId={item.typeId}
            typeName={item.typeName}
            modelAmount={item.modelCount}
            equipmentAmount={item.equipmentCount}
            isSelected={selectedTypes.includes(item.typeId)}
            onSelect={onSelectType}
            />
      ))
       :
        <p className='paragraph-1'>{MESSAGE.emptyType}</p>
      }
    </div>
  )
};

// Define Proptypes for the component
TypeInventory.propTypes = {
  className: PropTypes.string,
  selectedTypes: PropTypes.array.isRequired,
  onSelectType: PropTypes.func.isRequired,
  typeInventory: PropTypes.array.isRequired,
};

// Define DefaultProps for the component
TypeInventory.defaultProps = {
  className: '',
};

// Exports the TypeInventory component as the default export for the TypeInventory module.
export default TypeInventory;
