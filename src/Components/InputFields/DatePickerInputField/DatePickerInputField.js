//#region Import Necessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//#endregion

// Import UI Components
import DatePicker from 'react-datepicker';

//#region Import Stylings
import './DatePickerInputField.css';
import 'react-datepicker/dist/react-datepicker.css';
//#endregion

// Define DatePickerInputField Component
function DatePickerInputField(props) {
  
  const { className, onChange, name, value, placeholder } = props;

  const HandleDateChange = (date) => {
    onChange(name, date);
  }

  return (
    <DatePicker showIcon
                placeholderText={placeholder}
                wrapperClassName={className}
                name={name}
                selected={value}
                onChange={HandleDateChange}
                dateFormat="MM/dd/yyyy"/>
  )
};

// Define PropTypes of the component
DatePickerInputField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

DatePickerInputField.defaultProps = {
  className: '',
  value: null,
  placeholder: 'Please Select Date',
  onChange: () => {},
};

// Exports the DatePickerInputField component as the default export for the EquipmentAdditionForm module.
export default DatePickerInputField;