// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './Message.css';

// Render the Message component
function Message(props) {
  
  const { icon: Icon, message, className, visibility } = props;

  // Class Name Styling for hidden visibility
  const hiddenClassName = `hide ${className}`;

  return (
    <div className={`${visibility === false ? hiddenClassName : className} Message-Container`}>
        {Icon &&
            <Icon className='Message-Icon'/>
        }
        <p className='paragraph-1'>{message}</p>
    </div>
  )
}

Message.propTypes = {
  icon: PropTypes.elementType,
  message: PropTypes.string,
  className: PropTypes.string,
  visibility: PropTypes.bool,
}

Message.defaultProps = {
  icon: null,
  message: '',
  className: '',
  visibility: true
}

export default Message;
