// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import EquipmentDetailCard from '../../Cards/EquipmentDetailCard/EquipmentDetailCard';

// Import Stylings
import './EquipmentDetailList.css';

// Import Icons


// Render EquipmentDetailList
function EquipmentDetailList(props) {

  const { className } = props;

  return (
    <div className={`${className} EquipmentDetailList-Container`}>
      <EquipmentDetailCard
        className='EquipmentDetailList-EquipmentDetailCard'
        title='Fluke 87V Max'
        information={['Voltmeter', 'VM-0035']}/>
    </div>
  )
}

EquipmentDetailList.propTypes = {
  className: PropTypes.string,
}

EquipmentDetailList.defaultProps = {
  className: '',
}

export default EquipmentDetailList;
