// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './Message.css';

// Define the Message component
function Message(props) {
  
  // Destructure props to extract relevant information
  const { icon: Icon, message, className, visibility } = props;

  // Class Name Styling for hidden visibility
  const hiddenClassName = `hide ${className}`;

  return (
    <div className={`${visibility === false ? hiddenClassName : className} Message-Container`}>
      {/* Render the specified Icon component if provided */}
      {Icon &&
          <Icon className='Message-Icon'/>
      }
      {/* Render the message with paragraph-1 style */}
      <p className='paragraph-1'>{message}</p>
    </div>
  )
}

// Define PropTypes for type-checking and documentation
Message.propTypes = {
  icon: PropTypes.elementType,
  message: PropTypes.string,
  className: PropTypes.string,
  visibility: PropTypes.bool,
}

// Set default values for props to avoid potential issues if not provided
Message.defaultProps = {
  icon: null,
  message: '',
  className: '',
  visibility: true
}

export default Message;
