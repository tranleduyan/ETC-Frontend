// Import Components
import React from 'react';

// Import Stylings
import './LinkButton.css';

function LinkButton(props) {
  const { title, onClick, className } = props;
  return (
    <div className={`${className} LinkButton-Container`} onClick={onClick}>
        <p className='paragraph-1'>{title}</p>
    </div>
  )
}

export default LinkButton