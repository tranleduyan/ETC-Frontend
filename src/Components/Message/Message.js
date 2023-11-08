// Import Components
import React from 'react';

// Import Stylings
import './Message.css';

function Message(props) {
  const { icon: Icon, message, className, visibility } = props;
  return (
    <div className={`${visibility === false ? `hide ${className}` : className} Message-Container`}>
        {Icon &&
            <Icon className='Message-Icon'/>
        }
        <p className='paragraph-1'>{message}</p>
    </div>
  )
}

export default Message;
