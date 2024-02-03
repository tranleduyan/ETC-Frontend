import React, { useEffect, useState } from 'react';
import StandardButton from '../../Components/Buttons/StandardButton/StandardButton';
import { HiBookmarkAlt, HiChevronLeft, HiTrash } from 'react-icons/hi';
import IconButton from '../../Components/Buttons/IconButton/IconButton';
import './UpdateTypePage.css';
import TypeForm from '../../Components/Forms/TypeForm/TypeForm';
import axios from 'axios';
import { API } from '../../Constants';

function UpdateTypePage(props) {

  const { setEditSection, typeId } = props; 

  // Information for updating type
  const[typeInformation, setTypeInformation] = useState({
    name: '',
  });

  // Type form error state and error message
  const [typeIsError, setTypeIsError] = useState(false);
  const [typeErrorMessage, setTypeErrorMessage] = useState('');

  // IsTypeFormValid - Check for form validation
  const IsTypeFormValid = () => {
    if(!typeInformation.name) {
      setTypeIsError(true);
      setTypeErrorMessage('Please enter the type name.');
      return false;
    }
  
    if(typeIsError) {
      setTypeIsError(false);
      setTypeErrorMessage('');
    }
  
    return true;
  };

  const OnBack = () => {
    setEditSection('');
    setTypeInformation({
      name: '',
    });
  };

  const SaveUpdate = () => {

  };

  const DeleteType = () => {

  };

  const FetchTypeInformation = () => {
    axios
      .get(`${API.domain}/api/inventory/types/${typeId}`, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        setTypeInformation({...typeInformation, name: response.data.responseObject.typeName});
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchTypeInformation();
  }, []);

  return (
    <div className='UpdateTypePage-ContentContainer'>
      {/* Content Header Container */}
      <div className='UpdateTypePage-ContentHeaderContainer'>
        {/* Header Container */}
        <div className='UpdateTypePage-HeaderContainer'>
          {/* Back Button */}
          <IconButton
            icon={HiChevronLeft}
            className=''
            onClick={OnBack}/>
          {/* Header */}
          <p className='heading-5'>Update Type</p>
        </div>
        {/* Action Container */}
        <div className='UpdateTypePage-ActionContainer'>
          <StandardButton
            title='Save'
            onClick={SaveUpdate}
            className='UpdateTypePage-SaveButton'
            icon={HiBookmarkAlt}/>
          <StandardButton
            title=''
            onClick={DeleteType}
            className='UpdateTypePage-DeleteButton'
            icon={HiTrash}/>  
        </div>
      </div>
      {/* Type Addition Form */}
      <TypeForm
        typeInformation={typeInformation}
        setTypeInformation={setTypeInformation}
        isError={typeIsError}
        errorMessage={typeErrorMessage}/>
      {/* Mobile Save Update Button */}
      <StandardButton 
        title='Save'
        onClick={SaveUpdate}
        className='UpdateTypePage-MobileSaveButton'
        icon={HiBookmarkAlt}/>
    </div>
  )
};

export default UpdateTypePage;
