// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './FilterButton.css';

// Import Icons

function FilterButton(props) {

  const { title, className, isActive, onClick} = props;

  const containerClassName = `${className} FilterButton-Container ${isActive ? 'FilterButton-Active' : ''}`;

  return (
    <button className={containerClassName} onClick={onClick}>
      <p className='heading-5'>{title}</p>
    </button>
  )
}

FilterButton.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

FilterButton.defaultProps = {
  title: '',
  className: '',
  isActive: false,
  onClick: null,
}

export default FilterButton;
