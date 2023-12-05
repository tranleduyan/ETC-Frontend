// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './DetailSection.css';
import EquipmentDetailList from '../../Lists/EquipmentDetailList/EquipmentDetailList';

// Import Icons


// Render Details Section
function DetailSection(props) {

  const { className, title } = props;

  return (
    <div className={`${className} DetailSection-Container`}>
      <div className='DetailSection-SectionHeader'>
        <p className='heading-5'>{title}</p>
        <p className='paragraph-1'>3 items</p>
      </div>
      <EquipmentDetailList className='DetailSection-EquipmentDetailList'/>
    </div>
  )
}

DetailSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
}

DetailSection.defaultProps = {
  className: '',
  title: '',
}

export default DetailSection;
