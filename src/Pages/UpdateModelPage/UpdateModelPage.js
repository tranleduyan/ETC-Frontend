//#region Import Neccessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API, MESSAGE } from '../../Constants';
import { connect } from 'react-redux';
//#endregion

//#region import UI Components
import IconModal from '../../Components/Modals/IconModal/IconModal';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal/ConfirmationModal';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import ModelAdditionForm from '../../Components/Forms/ModelForm/ModelForm';
//#endregion

// Import Stylings
import './UpdateModelPage.css';

//#region Import Icons
import { HiBookmarkAlt, HiChevronLeft, HiTrash,
         HiSwitchHorizontal, HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';
//#endregion

// Define UpdateModelPage Component
function UpdateModelPage() {
  return (
    <div>UpdateModelPage</div>
  )
};

export default UpdateModelPage;