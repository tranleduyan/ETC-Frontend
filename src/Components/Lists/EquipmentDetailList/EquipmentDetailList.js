// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentDetailCard from '../../Cards/EquipmentDetailCard/EquipmentDetailCard';

// Import Stylings
import './EquipmentDetailList.css';

// Import Icons


// Render EquipmentDetailList
function EquipmentDetailList(props) {

  const { className, equipmentDetails, detailsType } = props;
  
  return (
    <div className={`${className} EquipmentDetailList-Container`}>
      {detailsType === 'inventory' && (
        equipmentDetails.map((item) => (
          <EquipmentDetailCard
            className='EquipmentDetailList-EquipmentDetailCard'
            key={item.serialNumber}
            title={item.modelName}
            information={[item.typeName, item.serialNumber]}/>
        )
      ))}
      {detailsType === 'reservation' && (
        equipmentDetails.map((item) => (
          <EquipmentDetailCard
            className='EquipmentDetailList-EquipmentDetailCard'
            key={item.reservedEquipmentID}
            title={item.modelName}
            information={[item.typeName, `Quantity: ${item.reservedQuantity}`]}/>
        )
      ))}
    </div>
  )
}

EquipmentDetailList.propTypes = {
  className: PropTypes.string,
  equipmentDetails: PropTypes.array,
  detailsType: PropTypes.oneOf(['inventory', 'reservation']),
}

EquipmentDetailList.defaultProps = {
  className: '',
  equipmentDetails: [],
  detailsType: 'inventory',
}

export default EquipmentDetailList;
