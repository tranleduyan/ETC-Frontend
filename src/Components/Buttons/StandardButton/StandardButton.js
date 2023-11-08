// Import Components
import React from 'react';

// Import Stylings
import './StandardButton.css';

function StandardButton(props) {
  const { title, onClick, className } = props;
  return (
    <button className={`${className} StandardButton-Container`} onClick={onClick}>
      <p className='paragraph-2'>{title}</p>
    </button>
  )
}

export default StandardButton;
