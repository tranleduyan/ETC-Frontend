// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../Buttons/IconButton/IconButton';

// Import Stylings
import './DetailSection.css';
import EquipmentDetailList from '../../Lists/EquipmentDetailList/EquipmentDetailList';

// Define Details Section Component
function DetailSection(props) {

  // Destructure props to extract relevant values.
  const { className, title, additionalInformation, equipmentDetails, detailsType, actionIcon: ActionIcon, action, isMargin } = props;

  // Calculate the number of items in equipmentDetails array.
  const itemCount = equipmentDetails.length;

  // Choose the appropriate text based on the number of items.
  const itemText = itemCount <= 1 ? 'item' : 'items';

  return (
    <div className={`${className} DetailSection-Container`}>
      <div className='DetailSection-SectionHeader'>
        <div className='DetailSection-Title'>
          {/* Render the title and additional information */}
          <p className='heading-5'>{title}</p>
          <p className='paragraph-3 additionalInformation'>{additionalInformation}</p>
        </div>
        {/* Render either the action icon or item count */}
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
      {/* Render the EquipmentDetailList component */}
      <EquipmentDetailList 
        className='DetailSection-EquipmentDetailList'
        equipmentDetails={equipmentDetails}
        detailsType={detailsType}
        isMargin={isMargin}/>
    </div>
  )
};

// Define PropTypes for type-checking and documentation
DetailSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  additionalInformation: PropTypes.string,
  equipmentDetails: PropTypes.array,
  detailsType: PropTypes.oneOf(['inventory', 'reservation']),
  actionIcon: PropTypes.elementType,
  action: PropTypes.func,
  isMargin: PropTypes.bool,
};

// Set default values for props to avoid potential issues if not provided
DetailSection.defaultProps = {
  className: '',
  title: '',
  additionalInformation: '',
  equipmentDetails: [],
  detailsType: 'inventory',
  actionIcon: null,
  action: () => {},
  isMargin: false,
};

// Exports the DetailSection component as the default export for the DetailSection module.
export default DetailSection;
