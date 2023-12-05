// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// Import Stylings
import './EquipmentDetailCard.css';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

function EquipmentDetailCard(props) {

  const { className, title, information } = props;

  const informationWithIDs = information.map((details) => ({
    id: uuidv4(),
    details
  }));

  return (
    <div className={`${className} EquipmentDetailCard-Container`}>
      <div className='EquipmentDetailCard-Image'>
        <FontAwesomeIcon icon={faScrewdriverWrench} className='EquipmentDetailCard-DefaultEquipmentIcon'/>
      </div>
      <div className='EquipmentDetailCard-Details'>
        <p className='heading-5'>{title}</p>
        {informationWithIDs.map((info) => (
          <p className='paragraph-3' key={info.id}>{info.details}</p>
        ))}
      </div>
    </div>
  )
}

EquipmentDetailCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  information: PropTypes.array,
}

EquipmentDetailCard.defaultProps = {
  className: '',
  title: '',
  information: [],
}

export default EquipmentDetailCard;
