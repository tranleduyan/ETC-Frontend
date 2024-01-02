import React from 'react';
import PropTypes from 'prop-types';
import FilterCard from '../../Cards/FilterCard/FilterCard';

import './EquipmentFilterCardList.css';

import { HiClipboardCopy, HiClipboardList } from 'react-icons/hi';

function EquipmentFilterCardList(props) {

  // Destructure props to extract relevant information
  const { className, selectedEquipmentFilter, OnEquipmentFilterCardClick } = props;

  return (
    <div className={`EquipmentFilterCardList-Container ${className} `}>
      <FilterCard 
          icon={HiClipboardList}
          title='Currently Using'
          isSelected={selectedEquipmentFilter === 'Currently Using'}
          quantity={1}
          onClick={OnEquipmentFilterCardClick}/>
      <FilterCard 
          icon={HiClipboardCopy}
          title='Recently Used'
          isSelected={selectedEquipmentFilter === 'Recently Used'}
          quantity={1}
          onClick={OnEquipmentFilterCardClick}/>
    </div>
  )
};

// Define PropTypes for type-checking and documentation
EquipmentFilterCardList.propTypes = {
  className: PropTypes.string,
  selectedEquipmentFilter: PropTypes.string,
  OnEquipmentFilterCardClick: PropTypes.func,
};

// Set default values for props to avoid potential issues if not provided
EquipmentFilterCardList.defaultProps = {
  className: '',
  selectedEquipmentFilter: null,
  OnEquipmentFilterCardClick: null,
};

// Exports the EquipmentFilterCardList component as the default export for the EquipmentFilterCardList module.
export default EquipmentFilterCardList;
