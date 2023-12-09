// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// Import Stylings
import './EquipmentDetailCard.css';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

// Define EquipmentDetailCard Component
function EquipmentDetailCard(props) {

  // Destructure props to extract className, title, and information
  const { className, title, information } = props;

  // Map through the information array and assign unique IDs using UUID
  const informationWithIDs = information.map((details) => ({
    id: uuidv4(),
    details
  }));

  return (
    <div className={`${className} EquipmentDetailCard-Container`}>
      {/* Equipment image with a default icon */}
      <div className='EquipmentDetailCard-Image'>
        <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
      </div>
      {/* Details section containing title and mapped information with unique IDs */}
      <div className='EquipmentDetailCard-Details'>
        <p className='heading-5'>{title}</p>
        {informationWithIDs.map((info) => (
          <p className='paragraph-3' key={info.id}>{info.details}</p>
        ))}
      </div>
    </div>
  )
}

// Define PropTypes for type-checking and documentation
EquipmentDetailCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  information: PropTypes.array,
}

// Set default values for props to avoid potential issues if not provided
EquipmentDetailCard.defaultProps = {
  className: '',
  title: '',
  information: [],
}

export default EquipmentDetailCard;
