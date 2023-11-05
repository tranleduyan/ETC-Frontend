// Import Components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkButton from '../../Components/Buttons/LinkButton/LinkButton';
import Message from '../../Components/Message/Message';
import StandardButton from '../../Components/Buttons/StandardButton';
import ETC_Transparent_Logo from '../../Assets/Images/ETC-Logo-Transparent.png';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField/StandardTextInputField';

// Import Stylings
import './SignInPage.css';

// Import Icons
import { HiExclamationCircle } from 'react-icons/hi';

function SignInPage() {

  const navigate = useNavigate();
  
  // Number of input fields
  const maxState = 2; 

  // The title of the button, initially 'Continue', final state is 'Sign In'
  const [buttonTitle, setButtonTitle] = useState('Continue');

  
  // Error handlers - display error visually
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Input Object from the form - used for gathering and submit to request body
  const [userInformation, setUserInformation] = useState({
    emailAddress: '',
    password: '',
  });

  // Prompt State includes: 0 - emailAddress, 1- password
  const [currentPromptState, setCurrentPromptState] = useState(0);

  // Handle Input Change to update the state of userInformation object
  const HandleInputChange = (propertyName, inputValue) => {
    setUserInformation({...userInformation, [propertyName]: inputValue});
  }

  // Control the visibility of the input field
  const isVisible = (promptState) => {
    if(promptState > currentPromptState) {
      return false;
    }
    return true;
  }

  // Set the input field styling to be last input field due to the behavior of last-child is conflicting with display:none.
  const SetCurrentLastInputFieldClass = (promptState) => {
    if (promptState === currentPromptState) {
      return 'SignInPage-LastInputField';
    }
    return '';
  }

  // Continuing reveal the next input field when the current one is filled
  const Continue = () => {
    if(IsValid()) {
      let currentState = currentPromptState;
      currentState++;
      if(currentState > maxState - 1) {
        SignIn();
      }
      else {
        setCurrentPromptState(currentState);
        if(currentState === maxState - 1) {
          setButtonTitle('Sign In');
        }
      }
    }
  }

  // TODO: Sign In to the application 
  const SignIn = () => {
    navigate('/Dashboard');
  }

  // IsValid to check if the form is ready to continue
  const IsValid = () => {
    // TODO: Check for valid email regex
    if(currentPromptState >= 0 && !userInformation.emailAddress) {
      setIsError(true);
      setErrorMessage('Please enter your email.');
      return false;
    }

    // TODO: Check for valid password regex
    else if(currentPromptState >= 1 && !userInformation.password) {
      setIsError(true);
      setErrorMessage('Please enter your password.');
      return false;
    }
    if(isError){
      setIsError(false);
      setErrorMessage('');
    }
    return true;
  }

  //#region Navigation
  const NavigateForgotPassword = () => {
    // TODO: Navigate to forgot password page
  }

  const NavigateSignUp = () => {
    navigate('/SignUp');
  }
  //#endregion
  
  return (
    <div className='wrapper SignInPage-Wrapper'>
      <div className='SignInPage-FormContainer'>
        {/* Form Header */}
        <div className='SignInPage-FormHeaderContainer'>
          <div className='SignInPage-LogoContainer'>
            <img src={ETC_Transparent_Logo} alt='ETC Logo'/>
          </div>
          <p className='heading-4'>Sign in to continue</p>
        </div>
        {/* Form */}
        <div className='SignInPage-Form'>
          {/* Email Address Input Field */}
          <StandardTextInputField 
            placeholder='Enter your email' 
            className= {`${SetCurrentLastInputFieldClass(0)} SignInPage-StandardTextInputField`}
            name='emailAddress'
            visibility={isVisible(0)}
            onChange={HandleInputChange}/>
          {/* Password Input Field */}
          <StandardTextInputField 
            placeholder='Enter password' 
            type='password'
            className= {`${SetCurrentLastInputFieldClass(1)} SignInPage-StandardTextInputField`}
            name='password'
            visibility={isVisible(1)}
            onChange={HandleInputChange}/>
          {/* Message */}
          <Message 
            icon={HiExclamationCircle} 
            message={errorMessage} 
            className='SignInPage-ErrorMessageContainer' 
            visibility={isError}/>
        </div>
        {/* Form Footer */}
        <div className='SignInPage-FormFooterContainer'>
          <StandardButton 
            title={buttonTitle} 
            onClick={Continue} 
            className='SignInPage-ContinueButton'/>
          <div className='SignInPage-FooterButtonsContainer'>
            <LinkButton onClick={NavigateForgotPassword} title={'Can\'t Sign In?'}/>
            <p className='SignInPage-FooterButtonSeparator paragraph-1'>•</p>
            <LinkButton onClick={NavigateSignUp} title={'Create an account'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage