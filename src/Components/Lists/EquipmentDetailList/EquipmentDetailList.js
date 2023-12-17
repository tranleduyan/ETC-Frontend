// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentDetailCard from '../../Cards/EquipmentDetailCard/EquipmentDetailCard';

// Import Stylings
import './EquipmentDetailList.css';

// Import Icons


// Define EquipmentDetailList Component
function EquipmentDetailList(props) {

  // Destructure props to extract relevant information
  const { className, equipmentDetails, detailsType } = props;
  
  return (
    <div className={`${className} EquipmentDetailList-Container`}>
      {/* Render EquipmentDetailCard components for inventory details */}
      {detailsType === 'inventory' && (
        equipmentDetails.map((item) => (
          <EquipmentDetailCard
            className='EquipmentDetailList-EquipmentDetailCard'
            key={item.serialNumber}
            title={item.modelName}
            information={[item.typeName, item.serialNumber]}
            modelPhotoPath={item.modelPhotoPath}/>
        )
      ))}
      {/* Render EquipmentDetailCard components for reservation details */}
      {detailsType === 'reservation' && (
        equipmentDetails.map((item) => (
          <EquipmentDetailCard
            className='EquipmentDetailList-EquipmentDetailCard'
            key={item.reservedEquipmentID}
            title={item.modelName}
            information={[item.typeName, `Quantity: ${item.reservedQuantity}`]}
            modelPhotoPath={item.modelPhotoPath}/>
        )
      ))}
    </div>
  )
}

// Define PropTypes for type-checking and documentation
EquipmentDetailList.propTypes = {
  className: PropTypes.string,
  equipmentDetails: PropTypes.array,
  detailsType: PropTypes.oneOf(['inventory', 'reservation']),
}

// Set default values for props to avoid potential issues if not provided
EquipmentDetailList.defaultProps = {
  className: '',
  equipmentDetails: [],
  detailsType: 'inventory',
}

export default EquipmentDetailList;
