//#region Import Necessary Dependencies
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { API, REGEX } from "../../Constants";
import { setUserData } from "../../storage";
//#endregion

// Import Stylings
import "./SignInPage.css";

//#region Import UI Components
import ETC_Transparent_Logo from "../../Assets/Images/ETC-Logo-Transparent.png";
import StandardTextInputField from "../../Components/InputFields/StandardTextInputField/StandardTextInputField";
import Message from "../../Components/Message/Message";
import StandardButton from "../../Components/Buttons/StandardButton";
import LinkButton from "../../Components/Buttons/LinkButton/LinkButton";
//#endregion

// Import Icons
import { HiExclamationCircle } from "react-icons/hi";

// Render Sign In Page
function SignInPage(props) {
  const { userData } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Number of input fields
  const maxState = 2;

  // The title of the button, initially 'Continue', final state is 'Sign In'
  const [buttonTitle, setButtonTitle] = useState("Continue");

  // Error handlers - display error visually
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Input Object from the form - used for gathering and submit to request body
  const [userInformation, setUserInformation] = useState({
    emailAddress: "",
    password: "",
  });

  // Prompt State includes: 0 - emailAddress, 1- password
  const [currentPromptState, setCurrentPromptState] = useState(0);

  // Handle Input Change to update the state of userInformation object
  const HandleInputChange = (propertyName, inputValue) => {
    setUserInformation({ ...userInformation, [propertyName]: inputValue });
  };

  // Control the visibility of the input field
  const isVisible = (promptState) => {
    return promptState <= currentPromptState;
  };

  // Set the input field styling to be last input field due to the behavior of last-child is conflicting with display:none.
  const SetCurrentLastInputFieldClass = (promptState) => {
    if (promptState === currentPromptState) {
      return "SignInPage-LastInputField";
    }
    return "";
  };

  // Continuing reveal the next input field when the current one is filled
  const Continue = () => {
    if (IsValid()) {
      let currentState = currentPromptState;
      currentState++;
      if (currentState > maxState - 1) {
        SignIn();
      } else {
        setCurrentPromptState(currentState);
        if (currentState === maxState - 1) {
          setButtonTitle("Sign In");
        }
      }
    }
  };

  // Sign In, post the request body to the API end point. If responseBody is fine/success, capture all the user data, else return the error message for the user's further instructions.
  const SignIn = () => {
    if (IsValid()) {
      // RequestBody to post to the end point.
      const requestBody = {
        emailAddress: userInformation.emailAddress,
        password: userInformation.password,
      };

      // Calling to the Sign In API end point
      axios
        .post(`${API.domain}/api/authentication/sign-in`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })

        // If it is success, extract from the response body and capture the data to the storage, and navigate to dashboard.
        .then((response) => {
          // Extract user data from the response
          const userData = response?.data?.responseObject;
          const userId = userData.userId;

          // Dispatch the setUserData action to update Redux store
          dispatch(setUserData(userData));

          // Navigate to the Dashboard with userId in the state
          navigate("/Dashboard", { state: { userId } });
        })

        // Else if it is not a success, display the error message to the user.
        .catch((error) => {
          setIsError(true);
          setErrorMessage(error?.response?.data?.message);
        });
    }
  };

  // IsValid, Check if the form is ready to continue
  const IsValid = () => {
    // If email address field is empty.
    if (currentPromptState >= 0 && !userInformation.emailAddress) {
      setIsError(true);
      setErrorMessage("Please enter your school email address.");
      return false;
    }

    // Else if email address is not in valid form.
    else if (
      currentPromptState >= 0 &&
      !REGEX.emailAddress.test(userInformation.emailAddress)
    ) {
      setIsError(true);
      setErrorMessage("Please enter a valid school email address.");
      return false;
    }

    // Else if password is empty.
    else if (currentPromptState >= 1 && !userInformation.password) {
      setIsError(true);
      setErrorMessage("Please enter your password.");
      return false;
    }

    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }

    return true;
  };

  useEffect(() => {
    // Check if userData is not null
    if (userData) {
      navigate("/Dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#region Navigation
  const NavigateForgotPassword = () => {
    // TODO: Navigate to forgot password page
  };

  const NavigateSignUp = () => {
    navigate("/SignUp");
  };
  //#endregion

  return (
    <div className="wrapper SignInPage-Wrapper">
      <div className="SignInPage-FormContainer">
        {/* Form Header */}
        <div className="SignInPage-FormHeaderContainer">
          <div className="SignInPage-LogoContainer">
            <img src={ETC_Transparent_Logo} alt="ETC Logo" />
          </div>
          <p className="heading-4">Sign in to continue</p>
        </div>
        {/* Form */}
        <div className="SignInPage-Form">
          {/* Email Address Input Field */}
          <StandardTextInputField
            placeholder="Enter your school email"
            className={`${SetCurrentLastInputFieldClass(
              0
            )} SignInPage-StandardTextInputField`}
            name="emailAddress"
            visibility={isVisible(0)}
            onChange={HandleInputChange}
            value={userInformation.emailAddress}
            onKeyDown={(e) => e.key === "Enter" && Continue()}
          />
          {/* Password Input Field */}
          <StandardTextInputField
            placeholder="Enter password"
            type="password"
            className={`${SetCurrentLastInputFieldClass(
              1
            )} SignInPage-StandardTextInputField`}
            name="password"
            visibility={isVisible(1)}
            onChange={HandleInputChange}
            value={userInformation.password}
            onKeyDown={(e) => e.key === "Enter" && Continue()}
          />
          {/* Error Message */}
          <Message
            icon={HiExclamationCircle}
            message={errorMessage}
            className="SignInPage-ErrorMessageContainer"
            visibility={isError}
          />
        </div>
        {/* Form Footer */}
        <div className="SignInPage-FormFooterContainer">
          <StandardButton
            title={buttonTitle}
            onClick={Continue}
            className="SignInPage-ContinueButton"
          />
          <div className="SignInPage-FooterButtonsContainer">
            <LinkButton
              onClick={NavigateForgotPassword}
              title={"Can't Sign In?"}
            />
            <p className="SignInPage-FooterButtonSeparator paragraph-1">•</p>
            <LinkButton onClick={NavigateSignUp} title={"Create an account"} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Define PropTypes for type-checking and documentation
SignInPage.propTypes = {
  userData: PropTypes.any,
};

// Set default values for props to avoid potential issues if not provided
SignInPage.defaultProps = {
  userData: null,
};

// Map userData from Redux state to component props
const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

// Connect the component to Redux, mapping state and actions to props
export default connect(mapStateToProps)(SignInPage);
