//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { MESSAGE } from '../../../Constants';
//#endregion

// Import UI Components
import TypeInventoryCard from '../../Cards/TypeInventoryCard/TypeInventoryCard';

// Import Stylings
import './TypeInventory.css';

// Define TypeInventory Component
function TypeInventory(props) {

  // Extract necessary props
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
