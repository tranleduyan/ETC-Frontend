// Import Components
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LinkButton from '../../Components/Buttons/LinkButton/LinkButton';
import Message from '../../Components/Message/Message';
import StandardButton from '../../Components/Buttons/StandardButton';
import ETC_Transparent_Logo from '../../Assets/Images/ETC-Logo-Transparent.png';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField/StandardTextInputField';
import axios from 'axios';
import { API } from '../../Constants';

// Import Stylings
import './VerificationPage.css';

// Import Icons
import { HiExclamationCircle } from 'react-icons/hi';

function VerificationPage() {
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const userInformation = location.state?.userInformation;
  let generatedVerificationCode = location.state?.verificationCode;

  // Error handlers - display error visually
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Input value from the form - used for gathering and submit to request body
  const [verificationCode, setVerificationCode] = useState('');

  // Handle Input Change to update the state of userInformation object
  const HandleInputChange = (propertyName, inputValue) => {
    setVerificationCode(inputValue);
  }

  // Verify - Check if everything is fine, if it is fine then sign up
  const Verify = () => {
    if(IsValid()) {
        SignUp();
    }
  }

  const NavigateSignIn = () => {
    navigate('/');
  }

  // TODO: Compare the generated verification code with the input verification code
  const IsValid = () => {
    if(!verificationCode) {
        setIsError(true);
        setErrorMessage('Please enter verification code.');
        return false;
    }
    else if(verificationCode !== generatedVerificationCode) {
      setIsError(true);
      setErrorMessage('Incorrect verification code.');
      return false;
    }
    if(isError){
        setIsError(false);
        setErrorMessage('');
      }
      return true;
  }

  // Call the sign up api and navigate to the sign in page.
  const SignUp = () => {
    const requestBody = {
      userRole: userInformation.userRole,
      firstName: userInformation.firstName,
      middleName: userInformation.middleName,
      lastName: userInformation.lastName,
      studentId: userInformation.studentId,
      emailAddress: userInformation.emailAddress,
      accountPassword: userInformation.password
    }
    axios
      .post(`${API.domain}/api/authentication/sign-up`, requestBody, {
        headers: {
          'X-API-KEY': API.key,
        }
      })
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <div className='wrapper VerificationPage-Wrapper'>
        <div className='VerificationPage-FormContainer'>
            {/* Form Header */}
            <div className='VerificationPage-FormHeaderContainer'>
                <div className='VerificationPage-LogoContainer'>
                    <img src={ETC_Transparent_Logo} alt='ETC Logo'/>
                </div>
                <p className='heading-4'>We've emailed you a code</p>
                {/* Instructions */}
                <Message  
                message={'To complete, please enter the verification code we\'ve sent to:'} 
                className='VerificationPage-InstructionMessage' 
                visibility={true}/>
                <Message  
                message={`${userInformation.emailAddress}`} 
                className='VerificationPage-EmailMessage' 
                visibility={true}/>
            </div>
            {/* Form */}
            <div className='VerificationPage-Form'>
                {/* Verification Code Input Field */}
                <StandardTextInputField 
                    placeholder='Enter verification code' 
                    className= {'VerificationPage-StandardTextInputField'}
                    name='verificationCode'
                    visibility={true}
                    onChange={HandleInputChange}/>
                {/* Error Message */}
                <Message 
                    icon={HiExclamationCircle} 
                    message={errorMessage} 
                    className='Verification-ErrorMessage' 
                    visibility={isError}/>
            </div>
            {/* Form Footer */}
            <div className='VerificationPage-FormFooterContainer'>
                <StandardButton
                    title='Verify'
                    onClick={Verify}
                    className='VerificationPage-VerifyButton'/>
                <div className='VerificationPage-FooterButtonsContainer'>
                    <LinkButton onClick={NavigateSignIn} title={'Already have an account? Sign In'} />
                </div>
            </div>
        </div>
    </div> 
  )
}

export default VerificationPage;
