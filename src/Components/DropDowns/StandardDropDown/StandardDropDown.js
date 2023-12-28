// Import Components
import React from 'react';
import PropTypes from 'prop-types';
import Select, { components} from 'react-select';

// Import Icons
import { HiChevronDown } from 'react-icons/hi';

// Define StandardDropDown Component
function StandardDropDown(props) {

  const { className, placeholder, name, value, onChange, options, visibility } = props;

  const hiddenClassName= `hide ${className}`;

  const HandleInputChange = (selectedOption) => {
    const { value } = selectedOption;
    console.log(selectedOption);
    onChange(name, value); 
  };

  /* Component to sub for Drop Down Indicator of 'Select' - Override Icon and Styling Font Size*/
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <HiChevronDown 
          style={{fontSize:'calc(3.3375vmin)'}} />
      </components.DropdownIndicator>
    );
  };

  return (
      <Select
        styles={styles}
        placeholder={placeholder}
        className={`StandardDropDown ${visibility === false ? hiddenClassName : className}`}
        name={name}
        value={value}
        options={options}
        components={{DropdownIndicator}}
        onChange={HandleInputChange}/>
  )
};

const styles = {
  control: (provided, state) => ({
    ...provided,
    height: 'calc(6.675vmin)',
    padding: '0px calc(0.5vmin)',
    borderRadius: 'calc(1.390625vmin)',
    border: `calc(0.278125vmin) solid ${state.isFocused ? 'var(--Blue1)' : 'var(--Gray1)'}`,
    fontSize: 'calc(2.225vmin)',
    fontFamily: "'Poppins Regular', sans-serif",
    '&:hover': undefined,
    boxShadow: "none",
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  }),
  menu: (provided) => ({
    ...provided,

    overflow: 'auto',
    borderRadius: 'calc(0.6953125vmin)',
    border: 'calc(0.1390625vmin) solid var(--Gray1)',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 'calc(2.225vmin)',
    fontFamily: "'Poppins Regular', sans-serif",
    padding: 'calc(1.75vmin) calc(2vmin)',
    color: state.isSelected ? 'var(--White1)' : 'var(--Black1)',
  }),
  menuList: (provided, state) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    height: 'auto'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused || state.hasValue ? 'var(--Black1) !important' : 'var(--Gray1) !important',
  }),
};

// Define PropTypes for type-checking and documentation
StandardDropDown.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  visibility: PropTypes.bool,
};

// Set default values for props to avoid potential issues if not provided
StandardDropDown.defaultProps = {
  className: '',
  placeholder: 'Select an option',
  options: [],
  visibility: true,
};

// Exports the StandardDropDown component as the default export for the StandardDropDown module.
export default StandardDropDown;
