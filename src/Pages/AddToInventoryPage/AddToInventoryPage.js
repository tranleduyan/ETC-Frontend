// Import Components 
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import GeneralPage from '../GeneralPage/GeneralPage';
import Logo from '../../Components/Logo/Logo';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import HeaderButton from '../../Components/Buttons/HeaderButton/HeaderButton';
import EquipmentAdditionForm from '../../Components/Forms/EquipmentAdditionForm/EquipmentAdditionForm';
import TypeAdditionForm from '../../Components/Forms/TypeAdditionForm/TypeAdditionForm';

// Import Stylings
import './AddToInventoryPage.css';

// Import Icons
import { HiDocumentText, HiPlus } from 'react-icons/hi';
import ModelAdditionForm from '../../Components/Forms/ModelAdditionForm/ModelAdditionForm';
import { API } from '../../Constants';

// Define AddEquipmentPage Component
function AddToInventoryPage(props) {

  const { userRole, schoolId } = props;

  const [currentSection, setCurrentSection] = useState('Equipment');

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

  const [typeAdditionInformation, setTypeAdditionInformation] = useState({
    name: '',
  });

  const [modelAdditionInformation, setModelAdditionInformation] = useState({
    name: '',
    type: null,
    photo: null,
  });

  const AddEquipment = () => {
    console.log(equipmentAdditionInformation);
  };

  const ImportEquipment = () => {
    console.log('Import Equipment');
  };

  const AddType = () => {
    console.log(schoolId);
    const requestBody = {
      schoolId: schoolId,
      equipmentTypeName: typeAdditionInformation.name,
    };
    axios
      .post(`${API.domain}/api/inventory/types`, requestBody, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const AddModel = () => {
    console.log(modelAdditionInformation);
    const formData = new FormData();

    formData.append('modelName', modelAdditionInformation.name);
    formData.append('typeId', modelAdditionInformation.type.value);
    formData.append('image', modelAdditionInformation.photo);
    formData.append('schoolId', schoolId);

    axios
      .post(`${API.domain}/api/inventory/models`, formData, {
        headers: {
          'X-API-KEY': API.key,
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

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
          <div className='AddToInventoryPage-ContentHeaderContainer'>
            <div className='AddToInventoryPage-HeaderContainer'>
              <HeaderButton
                title='Equipment'
                isSelected={currentSection === 'Equipment'}
                onClick={() => setCurrentSection('Equipment')}/>
              <HeaderButton
                title='Type'
                isSelected={currentSection === 'Type'}
                onClick={() => setCurrentSection('Type')}/>
              <HeaderButton
                title='Model'
                isSelected={currentSection === 'Model'}
                onClick={() => setCurrentSection('Model')}/>
            </div>
            <div className='AddToInventoryPage-ActionContainer'>
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
              {currentSection === 'Type' && (
                  <StandardButton 
                    title='Add Type'
                    onClick={AddType}
                    className='AddToInventoryPage-AddButton'
                    icon={HiPlus}/>
              )}
              {currentSection === 'Model' && (
                  <StandardButton 
                    title='Add Model'
                    onClick={AddType}
                    className='AddToInventoryPage-AddButton'
                    icon={HiPlus}/>
              )}
            </div>
          </div>
          {currentSection === 'Equipment' && (
            <>
              <EquipmentAdditionForm 
                equipmentAdditionInformation={equipmentAdditionInformation}
                setEquipmentAdditionInformation={setEquipmentAdditionInformation}/>
              <StandardButton 
                title='Add Equipment'
                onClick={AddEquipment}
                className='AddToInventoryPage-MobileAddButton'
                icon={HiPlus}/>
            </>
          )}
          {currentSection === 'Type' && (
              <>
                <TypeAdditionForm
                  typeAdditionInformation={typeAdditionInformation}
                  setTypeAdditionInformation={setTypeAdditionInformation}/>
                <StandardButton 
                  title='Add Type'
                  onClick={AddType}
                  className='AddToInventoryPage-MobileAddButton'
                  icon={HiPlus}/>
              </>
          )}
          {currentSection === 'Model' && (
              <>
                <ModelAdditionForm
                  modelAdditionInformation={modelAdditionInformation}
                  setModelAdditionInformation={setModelAdditionInformation}/>
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

AddToInventoryPage.propTypes = {
  userRole: PropTypes.string,
  schoolId: PropTypes.string,
};

AddToInventoryPage.defaultProps = {
  userRole: '',
  schoolId: '',
};

// Map schoolId and userRole from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Exports the AddEquipmentPage component as the default export for the AddEquipmentPage module.
export default connect(mapStateToProps)(AddToInventoryPage);
