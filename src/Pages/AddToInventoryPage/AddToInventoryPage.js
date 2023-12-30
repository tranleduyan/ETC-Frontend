// Import Components 
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { API } from '../../Constants';
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import HeaderButton from '../../Components/Buttons/HeaderButton/HeaderButton';
import EquipmentAdditionForm from '../../Components/Forms/EquipmentAdditionForm/EquipmentAdditionForm';
import TypeAdditionForm from '../../Components/Forms/TypeAdditionForm/TypeAdditionForm';
import ModelAdditionForm from '../../Components/Forms/ModelAdditionForm/ModelAdditionForm';

// Import Stylings
import './AddToInventoryPage.css';

// Import Icons
import { HiDocumentText, HiPlus } from 'react-icons/hi';

// Define AddEquipmentPage Component
function AddToInventoryPage(props) {

  // Extract relevant information
  const { userRole, schoolId } = props;

  // Section State of the page - Equipment, Type, Model tabs
  const [currentSection, setCurrentSection] = useState('Equipment');

  // #region Addition Information
  // Information for adding equipment
  const [equipmentAdditionInformation, setEquipmentAdditionInformation] = useState({
    serialNumber: '',
    type: null,
    model: null,
    maintenanceStatus: '',
    reservationStatus: '',
    RFIDTag: '',
    homeLocation: null,
    condition: '',
    purchaseCost: '',
    purchaseDate: '',
  });

  // Information for adding type
  const [typeAdditionInformation, setTypeAdditionInformation] = useState({
    name: '',
  });

  // Information for adding model
  const [modelAdditionInformation, setModelAdditionInformation] = useState({
    name: '',
    type: null,
    photo: null,
  });
  // #endregion

  // TODO: Add Equipment - Add the equipment to the database.
  const AddEquipment = () => {
    console.log(equipmentAdditionInformation);
  };

  // TODO: Import Equipment - Import CSV and add the content to the database
  const ImportEquipment = () => {
    console.log('Import Equipment');
  };

  // Add Type - Add the type to the database
  const AddType = () => {
    const requestBody = {
      schoolId: schoolId,
      equipmentTypeName: typeAdditionInformation.name,
    };

    // HTTP post request to post the request body
    axios
      .post(`${API.domain}/api/inventory/types`, requestBody, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        // TODO: Implement modal
        // Reset the field.
        setTypeAdditionInformation({
          name: '',
        });
      })
      .catch(error => {
        // TODO: Implement Message
        console.log(error);
      });
  };

  // Add Model - Add the model to the database
  const AddModel = () => {
    
    // Form data to submit the image
    const formData = new FormData();

    // Append neccessary information to the form data
    formData.append('modelName', modelAdditionInformation.name);
    formData.append('typeId', modelAdditionInformation.type.value);
    formData.append('image', modelAdditionInformation.photo);
    formData.append('schoolId', schoolId);

    // HTTP post request to post the form data
    axios
      .post(`${API.domain}/api/inventory/models`, formData, {
        headers: {
          'X-API-KEY': API.key,
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(response => {
        // TODO: Implement modal
        // Reset the information
        setModelAdditionInformation({
          name: '',
          type: null,
          photo: null,
        });
      })
      .catch(error => {
        // TODO: Implement message
        console.log(error);
      });
  };

  return (
    <GeneralPage>
      <div className='AddToInventoryPage-PageContentContainer'>
        {/* Page Header - Add to Inventory */}
        <div className='AddToInventoryPage-PageHeaderContainer'>
          <Logo className='AddToInventoryPage-LogoContainer'/>
          <p className='heading-2'>Add to Inventory</p>
        </div>
        {/* Page Content */}
        <div className='AddToInventoryPage-ContentContainer'>
          {/* Content Header Container */}
          <div className='AddToInventoryPage-ContentHeaderContainer'>
            {/* Header Container */}
            <div className='AddToInventoryPage-HeaderContainer'>
              {/* Equipment Tab Button */}
              <HeaderButton
                title='Equipment'
                isSelected={currentSection === 'Equipment'}
                onClick={() => setCurrentSection('Equipment')}/>
              {/* Type Tab Button */}
              <HeaderButton
                title='Type'
                isSelected={currentSection === 'Type'}
                onClick={() => setCurrentSection('Type')}/>
              {/* Model Tab Button */}
              <HeaderButton
                title='Model'
                isSelected={currentSection === 'Model'}
                onClick={() => setCurrentSection('Model')}/>
            </div>
            {/* Action Container */}
            <div className='AddToInventoryPage-ActionContainer'>
              {/* If equipment tab, display Add Equipment and Import buttons */}
              {currentSection === 'Equipment' && (
                <>
                  <StandardButton 
                    title='Add Equipment'
                    onClick={AddEquipment}
                    className='AddToInventoryPage-AddButton'
                    icon={HiPlus}/>
                  <StandardButton 
                    title='Import'
                    onClick={ImportEquipment}
                    className='AddToInventoryPage-ImportEquipmentButton'
                    icon={HiDocumentText}/>
                </>
              )}
              {/* If type tab, display Add Type Button */}
              {currentSection === 'Type' && (
                  <StandardButton 
                    title='Add Type'
                    onClick={AddType}
                    className='AddToInventoryPage-AddButton'
                    icon={HiPlus}/>
              )}
              {/* If model tab, display Add Model button */}
              {currentSection === 'Model' && (
                  <StandardButton 
                    title='Add Model'
                    onClick={AddType}
                    className='AddToInventoryPage-AddButton'
                    icon={HiPlus}/>
              )}
            </div>
          </div>
          {/* Equipment Tab */}
          {currentSection === 'Equipment' && (
            <>
              {/* Equipment Form */}
              <EquipmentAdditionForm 
                equipmentAdditionInformation={equipmentAdditionInformation}
                setEquipmentAdditionInformation={setEquipmentAdditionInformation}/>
              {/* Mobile Add Equipment Button */}
              <StandardButton 
                title='Add Equipment'
                onClick={AddEquipment}
                className='AddToInventoryPage-MobileAddButton'
                icon={HiPlus}/>
            </>
          )}
          {/* Type Tab */}
          {currentSection === 'Type' && (
              <>
                {/* Type Addition Form */}
                <TypeAdditionForm
                  typeAdditionInformation={typeAdditionInformation}
                  setTypeAdditionInformation={setTypeAdditionInformation}/>
                {/* Mobile Add Type Button */}
                <StandardButton 
                  title='Add Type'
                  onClick={AddType}
                  className='AddToInventoryPage-MobileAddButton'
                  icon={HiPlus}/>
              </>
          )}
          {/* Model Tab */}
          {currentSection === 'Model' && (
              <>
                {/* Model Addition Form */}
                <ModelAdditionForm
                  modelAdditionInformation={modelAdditionInformation}
                  setModelAdditionInformation={setModelAdditionInformation}/>
                {/* Mobile Add Model Button */}
                <StandardButton 
                  title='Add Model'
                  onClick={AddModel}
                  className='AddToInventoryPage-MobileAddButton'
                  icon={HiPlus}/>
              </>
          )}
        </div>
      </div>
    </GeneralPage>
  )
};

// Define PropTypes of the component
AddToInventoryPage.propTypes = {
  userRole: PropTypes.string,
  schoolId: PropTypes.string,
};

// Define defaultProps of the component
AddToInventoryPage.defaultProps = {
  userRole: '',
  schoolId: '',
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Exports the AddToInventoryPage component as the default export for the AddToInventoryPage module.
export default connect(mapStateToProps)(AddToInventoryPage);
