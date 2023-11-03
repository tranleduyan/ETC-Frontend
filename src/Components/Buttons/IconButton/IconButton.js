// Import Components
import React from 'react';

// Import Stylings
import './IconButton.css';

function NavigationButton(props) {
  const { icon: Icon, className, iconClassName, onClick } = props;
  return (
    <button className={`${className} IconButton-Container`} onClick={onClick}>
        <Icon className={`${iconClassName}`} />
    </button>
  )
}

export default NavigationButton