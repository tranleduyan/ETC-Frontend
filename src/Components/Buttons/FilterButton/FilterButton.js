// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './FilterButton.css';

// Import Icons

function FilterButton(props) {

  const { title, className, isActive } = props;

  const containerClassName = `${className} FilterButton-Container ${isActive ? 'FilterButton-Active' : ''}`;

  return (
    <div className={containerClassName}>
      <p className='heading-5'>{title}</p>
    </div>
  )
}

FilterButton.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  isActive: PropTypes.bool,
}

FilterButton.defaultProps = {
  title: '',
  className: '',
  isActive: false,
}

export default FilterButton;
