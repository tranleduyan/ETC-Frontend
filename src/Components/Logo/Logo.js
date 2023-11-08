// Import Components
import React from 'react';
import ETC_Color_Logo from '../../Assets/Images/ETC-Logo-Color.png';

// Import Stylings
import './Logo.css';

function Logo(props) {
  const { className } = props;
  return (
    <div className={`${className} Logo-Container`}>
      <img src={ETC_Color_Logo} alt='ETC Logo'/>
    </div>
  )
}

export default Logo;
