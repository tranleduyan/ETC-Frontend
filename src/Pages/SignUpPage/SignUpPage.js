// Import Components
import React, { useState} from 'react';
import ETC_Transparent_Logo from '../../Assets/Images/ETC-Logo-Transparent.png';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField/StandardTextInputField';
import Message from '../../Components/Message/Message';
import StandardButton from '../../Components/Buttons/StandardButton';
import LinkButton from '../../Components/Buttons/LinkButton/LinkButton';
import { useNavigate } from 'react-router-dom';
import { REGEX } from '../../Constants';

// Import Stylings
import './SignUpPage.css';

// Import Icons
import { HiExclamationCircle } from 'react-icons/hi';

// Render the sign up page
function SignUpPage() {
  
  const navigate = useNavigate();

  // Number of input field states
  const maxState = 4; 

  // Error handlers - display error visually
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Input Object from the form - used for gathering and submit to request body
  const [userInformation, setUserInformation] = useState({
    emailAddress: '',
    userRole: 'Student',
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    password: '',
    confirmPassword: '',
  });

  /* Prompt State includes: 
     0 - emailAddress
     1 - firstName, middleName, lastName
     2- studentId
     3 - password, confirmPassword
  */
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
      return 'SignUpPage-LastInputField';
    }
    return '';
  }

  // IsValid, Check if the form is ready to continue
  const IsValid = () => {
    // If email address field is empty.
    if(currentPromptState >= 0 && !userInformation.emailAddress) {
      setIsError(true);
      setErrorMessage('Please enter your school email address.');
      return false;
    }

    // Else if email address field is not in a valid format.
    else if(currentPromptState >= 0 && !REGEX.emailAddress.test(userInformation.emailAddress)){
      setIsError(true);
      setErrorMessage('Please enter a valid school email address.');
      return false;
    }

    // Else if firstName field is empty.
    else if(currentPromptState >= 1 && !userInformation.firstName) {
      setIsError(true);
      setErrorMessage('Please enter your first name.');
      return false;
    }

    // Else if lastName field is empty.
    else if(currentPromptState >= 1 && !userInformation.lastName) {
      setIsError(true);
      setErrorMessage('Please enter your last name.');
      return false;
    }

    // Else if first name is not in valid form.
    else if(currentPromptState >= 1 && !REGEX.name.test(userInformation.firstName)) {
      setIsError(true);
      setErrorMessage('Please enter a valid first name.');
      return false;
    }

    // Else if first name is too long (we only take up to 25 referring to the schema)
    else if(currentPromptState >= 1 && userInformation.firstName.length > 25) {
      setIsError(true);
      setErrorMessage('Your first name is too long.');
      return false;
    }

    // Else if last name is not in valid form.
    else if(currentPromptState >= 1 && !REGEX.name.test(userInformation.lastName)) {
      setIsError(true);
      setErrorMessage('Please enter a valid last name.');
      return false;
    }

    // Else if last name is too long (we only take up to 25 referring to the schema)
    else if(currentPromptState >= 1 && userInformation.lastName.length > 25) {
      setIsError(true);
      setErrorMessage('Your last name is too long.');
      return false;
    }

    // Else if middle name is too long (we only take up to 30 referring to the schema)
    else if(currentPromptState >= 1 && userInformation.middleName.length > 30) {
      setIsError(true);
      setErrorMessage('Your middle name is too long.');
      return false;
    }

    // TODO: Check if faculty or not, if not require studentId, if is faculty, then this field - studentID can be empty. For now, lets just default student and require student ID.
    else if(currentPromptState >= 2 && !userInformation.studentId) {
      setIsError(true);
      setErrorMessage('Please enter your student ID.');
      return false;
    }

    // Else if studentId is in valid form and have length of 9.
    else if((currentPromptState >= 2 && !REGEX.onlyDigits.test(userInformation.studentId)) 
    || (currentPromptState >= 2 && userInformation.studentId.length !== 9)) {
      setIsError(true);
      setErrorMessage('Please enter a valid student ID.');
      return false;
    }

    // Else if the password is empty field.
    else if(currentPromptState >= 3 && !userInformation.password) {
      setIsError(true);
      setErrorMessage('Please enter your password.');
      return false;
    }
    
    // Else if confirmPassword is empty field.
    else if(currentPromptState >= 3 && !userInformation.confirmPassword) {
      setIsError(true);
      setErrorMessage('Please confirm the password.');
      return false;
    }

    // Else if password is less than 6 (we require to have it more than 6 characters)
    else if(currentPromptState >= 3 && userInformation.password.length < 6) {
      setIsError(true);
      setErrorMessage('Password must be 6 or more characters long.');
      return false;
    }

    // Else if the passwords do not match.
    else if(currentPromptState >= 3 && userInformation.password !== userInformation.confirmPassword) {
      setIsError(true);
      setErrorMessage('Passwords do not match.');
      return false;
    }

    if(isError){
      setIsError(false);
      setErrorMessage('');
    }

    return true;
  }

  // Continuing reveal the next input field when the current one is filled
  const Continue = () => {
    if(IsValid()) {
      let currentState = currentPromptState;
      currentState++;
      if(currentState > maxState - 1) {
        console.log("continue to verify");
        NavigateEmailVerification();
      }
      else {
        setCurrentPromptState(currentState);
      }
    }
  }

  //#region Navigation
  const NavigateSignIn = () => {
    navigate('/');
  }
  const NavigateEmailVerification = () => {
    navigate('/Verification');
  }
  //#endregion
  return (
    <div className='wrapper SignUpPage-Wrapper'>
      <div className='SignUpPage-FormContainer'>
        {/* Form Header */}
        <div className='SignUpPage-FormHeaderContainer'>
          <div className='SignUpPage-LogoContainer'>
            <img src={ETC_Transparent_Logo} alt='ETC Logo'/>
          </div>
            <p className='heading-4'>Sign up to continue</p>
        </div>
        {/* Form */}
        <div className='SignUpPage-Form'>
          {/* Email Address Input Field */}
          <StandardTextInputField 
            placeholder='Enter your school email' 
            className= {`${SetCurrentLastInputFieldClass(0)} SignUpPage-StandardTextInputField`}
            name='emailAddress'
            visibility={isVisible(0)}
            onChange={HandleInputChange}/>
          {/* First Name Input Field */}
          <StandardTextInputField 
            placeholder='Enter first name' 
            className= {`SignUpPage-StandardTextInputField`}
            name='firstName'
            visibility={isVisible(1)}
            onChange={HandleInputChange}/>
          {/* Middle Name Input Field */}
          <StandardTextInputField 
            placeholder='Enter middle name (optional)' 
            className= {`SignUpPage-StandardTextInputField`}
            name='middleName'
            visibility={isVisible(1)}
            onChange={HandleInputChange}/>
          {/* Last Name Input Field */}
          <StandardTextInputField 
            placeholder='Enter last name' 
            className= {`${SetCurrentLastInputFieldClass(1)} SignUpPage-StandardTextInputField`}
            name='lastName'
            visibility={isVisible(1)}
            onChange={HandleInputChange}/>
          {/* Student ID Input Field */}
          <StandardTextInputField 
            placeholder='Enter student ID' 
            className= {`${SetCurrentLastInputFieldClass(2)} SignUpPage-StandardTextInputField`}
            name='studentId'
            visibility={isVisible(2)}
            onChange={HandleInputChange}/>
          {/* Password Input Field */}
          <StandardTextInputField 
            placeholder='Enter password' 
            className= {`SignUpPage-StandardTextInputField`}
            name='password'
            type='password'
            visibility={isVisible(3)}
            onChange={HandleInputChange}/>
          {/* Confirm Password Input Field */}
          <StandardTextInputField 
            placeholder='Confirm password' 
            className= {`${SetCurrentLastInputFieldClass(3)} SignUpPage-StandardTextInputField`}
            name='confirmPassword'
            type='password'
            visibility={isVisible(3)}
            onChange={HandleInputChange}/>
          {/* Error Message */}
          <Message 
            icon={HiExclamationCircle} 
            message={errorMessage} 
            className='SignUpPage-ErrorMessageContainer' 
            visibility={isError}/>
        </div>
        {/* Form Footer */}
        <div className='SignUpPage-FormFooterContainer'>
          <StandardButton 
            title={'Continue'} 
            onClick={Continue} 
            className='SignUpPage-ContinueButton'/>
          <div className='SignUpPage-FooterButtonsContainer'>
            <LinkButton onClick={NavigateSignIn} title={'Already have an account? Sign In'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
