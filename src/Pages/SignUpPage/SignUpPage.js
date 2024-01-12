//#region Import Necessary Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API, REGEX } from '../../Constants';
//#endregion

//#region Import UI Components
import ETC_Transparent_Logo from '../../Assets/Images/ETC-Logo-Transparent.png';
import StandardTextInputField from '../../Components/InputFields/StandardTextInputField/StandardTextInputField';
import Message from '../../Components/Message/Message';
import StandardButton from '../../Components/Buttons/StandardButton';
import LinkButton from '../../Components/Buttons/LinkButton/LinkButton';
//#endregion

// Import Stylings
import './SignUpPage.css';

// Import Icons
import { HiExclamationCircle } from 'react-icons/hi';

// Render the sign up page
function SignUpPage(props) {

  const { userData } = props;
  
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
    schoolId: '',
    password: '',
    confirmPassword: '',
  });

  /* Prompt State includes: 
     0 - emailAddress
     1 - firstName, middleName, lastName
     2 - schoolId
     3 - password, confirmPassword
  */
  const [currentPromptState, setCurrentPromptState] = useState(0);

  // Handle Input Change to update the state of userInformation object
  const HandleInputChange = (propertyName, inputValue) => {
    setUserInformation({...userInformation, [propertyName]: inputValue});
  };

  // Control the visibility of the input field
  const isVisible = (promptState) => {
    return (promptState <= currentPromptState);
  };

  // Set the input field styling to be last input field due to the behavior of last-child is conflicting with display:none.
  const SetCurrentLastInputFieldClass = (promptState) => {
    if (promptState === currentPromptState) {
      return 'SignUpPage-LastInputField';
    }
    return '';
  };

  // IsValidEmailAddress, Check that the email address is valid to continue.
  const IsValidEmailAddress = () => {
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

    return true;
  };

  // IsValidName, check for if the names are valid.
  const IsValidName = () => {
    // If first name is empty.
    if(currentPromptState >= 1 && !userInformation.firstName) {
      setIsError(true);
      setErrorMessage('Please enter your first name.');
      return false;
    }
    // Else if last name is empty.
    else if(currentPromptState >= 1 && !userInformation.lastName) {
      setIsError(true);
      setErrorMessage('Please enter your last name.');
      return false;
    }
    // Else if first name is not in a valid form.
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

    return true;
  };

  // IsValidSchoolId, every SPU member must need to provide schoolId.
  const IsValidSchoolId = () => {
    if(currentPromptState >= 2 && !userInformation.schoolId) {
      setIsError(true);
      setErrorMessage('Please enter your school ID.');
      return false;
    }

    // Else if schoolId is in valid form and have length of 9.
    else if((currentPromptState >= 2 && !REGEX.schoolId.test(userInformation.schoolId)) 
    || (currentPromptState >= 2 && userInformation.schoolId.length !== 9)) {
      setIsError(true);
      setErrorMessage('Please enter a valid school ID.');
      return false;
    }
    
    return true;
  };

  // IsValidPassword, Check for if the password is valid - must be 6 character long or more
  const IsValidPassword = () => {
    // if the password is empty field.
    if(currentPromptState >= 3 && !userInformation.password) {
      setIsError(true);
      setErrorMessage('Please enter your password.');
      return false;
    }
    // Else if password is less than 6 (we require to have it more than 6 characters)
    else if(currentPromptState >= 3 && userInformation.password.length < 6) {
      setIsError(true);
      setErrorMessage('Password must be 6 or more characters long.');
      return false;
    }

    return true;
  };

  // IsValidConfirmPassword, Check for if the confirm password is valid and matched the password
  const IsValidConfirmPassword = () => {
    // if password is less than 6 (we require to have it more than 6 characters)
    if(currentPromptState >= 3 && userInformation.password.length < 6) {
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

    return true;
  };

  // IsValid, Check if the form is ready to continue
  const IsValid = () => {
    if(IsValidEmailAddress() && IsValidName() && IsValidSchoolId() && IsValidPassword() && IsValidConfirmPassword()){
      if(isError){
        setIsError(false);
        setErrorMessage('');
      }
      return true;
    }
    return false;
  };

  // Continuing reveal the next input field when the current one is filled
  const Continue = async () => {
    if(IsValid()) {
      let currentState = currentPromptState;
      currentState++;
      if(currentState > maxState - 1) {
        await SendVerification();
      }
      else {
        setCurrentPromptState(currentState);
      }
    }
  };

  // SendVerification: This function generates verification code and call the API to send the generated code to the user's registered email. If every thing is success, navigate to email verification page to continue the sign up process.
  const SendVerification = async () => {
    const GenerateVerificationCode = () => {
      const verificationCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      return verificationCode.toString();
    };
    const requestBody = {
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      emailAddress: userInformation.emailAddress,
      schoolId: userInformation.schoolId,
      verificationCode: GenerateVerificationCode(),
      isNewAccount: true,
    };
    axios
      .post(`${API.domain}/api/authentication/send-verification-code`, requestBody, {
        headers: {
          'X-API-KEY': API.key,
        },
      })
      .then(response => {
        NavigateEmailVerification(requestBody);
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    // Check if userData is not null
    if (userData) {
      navigate('/Dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  //#region Navigation
  const NavigateSignIn = () => {
    navigate('/');
  };

  // Navigate to the verification page with the parameters of userInformation and the generated verificationCode
  const NavigateEmailVerification = (requestBody) => {
    navigate('/Verification', { state: {userInformation,
                                        verificationCode: requestBody.verificationCode}});
  };
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
            onChange={HandleInputChange}
            value={userInformation.emailAddress}
            onKeyDown={(e) => e.key === 'Enter' && Continue()}/>
          {/* First Name Input Field */}
          <StandardTextInputField 
            placeholder='Enter first name' 
            className= {`SignUpPage-StandardTextInputField`}
            name='firstName'
            visibility={isVisible(1)}
            onChange={HandleInputChange}
            value={userInformation.firstName}
            onKeyDown={(e) => e.key === 'Enter' && Continue()}/>
          {/* Middle Name Input Field */}
          <StandardTextInputField 
            placeholder='Enter middle name (optional)' 
            className= {`SignUpPage-StandardTextInputField`}
            name='middleName'
            visibility={isVisible(1)}
            onChange={HandleInputChange}
            value={userInformation.middleName}
            onKeyDown={(e) => e.key === 'Enter' && Continue()}/>
          {/* Last Name Input Field */}
          <StandardTextInputField 
            placeholder='Enter last name' 
            className= {`${SetCurrentLastInputFieldClass(1)} SignUpPage-StandardTextInputField`}
            name='lastName'
            visibility={isVisible(1)}
            onChange={HandleInputChange}
            value={userInformation.lastName}
            onKeyDown={(e) => e.key === 'Enter' && Continue()}/>
          {/* School ID Input Field */}
          <StandardTextInputField 
            placeholder='Enter school ID' 
            className= {`${SetCurrentLastInputFieldClass(2)} SignUpPage-StandardTextInputField`}
            name='schoolId'
            visibility={isVisible(2)}
            onChange={HandleInputChange}
            value={userInformation.schoolId}
            onKeyDown={(e) => e.key === 'Enter' && Continue()}/>
          {/* Password Input Field */}
          <StandardTextInputField 
            placeholder='Enter password' 
            className= {`SignUpPage-StandardTextInputField`}
            name='password'
            type='password'
            visibility={isVisible(3)}
            onChange={HandleInputChange}
            value={userInformation.password}
            onKeyDown={(e) => e.key === 'Enter' && Continue()}/>
          {/* Confirm Password Input Field */}
          <StandardTextInputField 
            placeholder='Confirm password' 
            className= {`${SetCurrentLastInputFieldClass(3)} SignUpPage-StandardTextInputField`}
            name='confirmPassword'
            type='password'
            visibility={isVisible(3)}
            onChange={HandleInputChange}
            value={userInformation.confirmPassword}
            onKeyDown={(e) => e.key === 'Enter' && Continue()}/>
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
};

// Define PropTypes for type-checking and documentation
SignUpPage.propTypes = {
  userData: PropTypes.any,
};

// Set default values for props to avoid potential issues if not provided
SignUpPage.defaultProps = {
  userData: null,
};

// Map userData from Redux state to component props
const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

// Exports the SignUpPage component as the default export for the SignUpPage module.
export default connect(mapStateToProps)(SignUpPage);
