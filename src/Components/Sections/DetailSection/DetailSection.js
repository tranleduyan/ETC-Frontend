// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './DetailSection.css';
import EquipmentDetailList from '../../Lists/EquipmentDetailList/EquipmentDetailList';

// Import Icons


// Render Details Section
function DetailSection(props) {

  const { className, title, additionalInformation, equipmentDetails, detailsType, actionIcon: ActionIcon, action, isMargin } = props;

  const itemCount = equipmentDetails.length;

  const itemText = itemCount <= 1 ? 'item' : 'items';

  return (
    <div className={`${className} DetailSection-Container`}>
      <div className='DetailSection-SectionHeader'>
        <div className='DetailSection-Title'>
          <p className='heading-5'>{title}</p>
          <p className='paragraph-3 additionalInformation'>{additionalInformation}</p>
        </div>
        {(ActionIcon) 
          ? 
          <IconButton 
            icon={ActionIcon} 
            className='DetailSection-ActionIcon' 
            onClick={action}/>
          :
          <p className='paragraph-1'>{itemCount} {itemText}</p>
        }
      </div>
      <EquipmentDetailList 
        className='DetailSection-EquipmentDetailList'
        equipmentDetails={equipmentDetails}
        detailsType={detailsType}
        isMargin={isMargin}/>
    </div>
  )
}

DetailSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  additionalInformation: PropTypes.string,
  equipmentDetails: PropTypes.array,
  detailsType: PropTypes.oneOf(['inventory', 'reservation']),
  actionIcon: PropTypes.elementType,
  action: PropTypes.func,
  isMargin: PropTypes.bool,
}

DetailSection.defaultProps = {
  className: '',
  title: '',
  additionalInformation: '',
  equipmentDetails: [],
  detailsType: 'inventory',
  actionIcon: null,
  action: () => {},
  isMargin: false,
}

export default DetailSection;
