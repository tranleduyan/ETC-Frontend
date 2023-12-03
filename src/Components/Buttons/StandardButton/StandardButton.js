// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './StandardButton.css';

function StandardButton(props) {
  const { title, onClick, className, icon: Icon } = props;
  return (
    <button className={`${className} StandardButton-Container`} onClick={onClick}>
      <p className='paragraph-2'>{title}</p>
      {Icon &&
        <Icon className='StandardButton-Icon'/>
      }
    </button>
  )
}

StandardButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  icon: PropTypes.elementType,
}

StandardButton.defaultProps = {
  title: '',
  className: '',
  icon: null,
}

export default StandardButton;
