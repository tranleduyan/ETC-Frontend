// Import Components
import React from 'react';
import PropTypes from 'prop-types';

// Import Stylings
import './FilterCard.css';

// Define FilterCard Component
function FilterCard(props) {

  // Destructure props to extract relevant information
  const { icon: Icon, className, iconClassName, title, quantity, units, onClick, isSelected} = props

  // Determine whether to use with an 's' or no
  const quantityUnitText = quantity > 1 ? `${units}s` : units;

  // Function triggered when the card is clicked
  const OnCardClick = () => {
    if(onClick) {
      onClick(title);
    }
  };

  return (
    <button 
      className={`${className} FilterCard-Container ${isSelected ? 'FilterCard-Active' : ''}`}
      onClick={OnCardClick}>
      { Icon && <Icon className={`FilterCard-Icon ${iconClassName}`}/> }
        <div className='FilterCard-Information'>
            <p className='heading-5'>{title}</p>
            {quantity && <p className='paragraph-1'>{quantity} {quantityUnitText}</p> }
        </div>
    </button>
  )
}

FilterCard.propTypes = {
  icon: PropTypes.elementType,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  units: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

FilterCard.defaultProps = {
  icon: null,
  className: '',
  iconClassName: '',
  quantity: 0,
  units: 'item',
  isSelected: false,
  onClick: () => {},
};

export default FilterCard;
