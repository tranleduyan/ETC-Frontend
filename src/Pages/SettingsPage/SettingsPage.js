//#region Import Necessary Dependencies
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { API, OPTIONS, REGEX } from "../../Constants";
import { useDispatch } from "react-redux";
import { setUserData } from "../../storage";
//#endregion

//#region Import Stylings
import "./SettingsPage.css";
//#endregion

//#region Import UI Components
import GeneralPage from "../GeneralPage/GeneralPage";
import UnauthorizedPanel from "../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel";
import IconModal from "../../Components/Modals/IconModal/IconModal";
import Logo from "../../Components/Logo/Logo";
import HeaderButton from "../../Components/Buttons/HeaderButton/HeaderButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import UserForm from "../../Components/Forms/UserForm/UserForm";
//#endregion

//#region Import Icons
import {
  HiBookmarkAlt,
  HiCheck,
  HiExclamationCircle,
  HiRefresh,
} from "react-icons/hi";
//#endregion

// Define SettingsPage Component
function SettingsPage(props) {
  // Extract necessary props
  const { userRole, schoolId, userData } = props;

  // Use the dispatch function to dispatch actions
  const dispatch = useDispatch();

  // State for current section of the page
  const [currentSection, setCurrentSection] = useState("User Information");

  // State variable for icon modal
  const [iconModal, setIconModal] = useState({
    message: "",
    visibility: false,
    icon: HiExclamationCircle,
    isIconSpin: false,
  });

  // State variable for user Information
  const [userInformation, setUserInformation] = useState({
    schoolId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    tagId: "",
  });

  const [userFormDisable, setUserFormDisable] = useState({
    firstName: true,
    middleName: true,
    lastName: true,
    emailAddress: true,
    schoolId: true,
    tagId: true,
    userRole: true,
    editable: true,
  });

  // SaveUpdateUserInformation - Update the user information
  const SaveUpdateUserInformation = () => {
    if (userFormDisable.editable && IsUserFormValid() && IsValidTagID()) {
      // Show processing message
      setIconModal({
        message: "Saving the updates...",
        icon: HiRefresh,
        visibility: true,
        isIconSpin: true,
      });

      const requestBody = {
        targetSchoolId: schoolId,
        firstName: userInformation.firstName,
        middleName: userInformation.middleName,
        lastName: userInformation.lastName,
        emailAddress: userInformation.emailAddress,
        newSchoolId: userInformation.schoolId,
        tagId: userInformation.tagId,
        newUserRole: userInformation.userRole.value,
      };

      axios
        .put(`${API.domain}/api/user/${schoolId}`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then((response) => {
          const responseUserInfo = response?.data?.responseInfo;

          // Show Success Message
          setIconModal({
            message: "The user has been successfully update!",
            icon: HiCheck,
            visibility: true,
            isIconSpin: false,
          });

          setTimeout(() => {
            setIconModal({
              message: "",
              icon: HiExclamationCircle,
              visibility: false,
              isIconSpin: false,
            });

            setUserInformation({
              schoolId: responseUserInfo?.schoolId,
              firstName: responseUserInfo?.firstName,
              middleName: responseUserInfo?.middleName,
              lastName: responseUserInfo?.lastName,
              emailAddress: responseUserInfo?.emailAddress,
              tagId: responseUserInfo?.tagId,
              userRole: OPTIONS.user.roles.find(
                (role) => role.value === responseUserInfo?.userRole
              ),
            });

            if (schoolId !== responseUserInfo?.schoolId) {
              dispatch(
                setUserData({
                  ...props.userData,
                  schoolId: responseUserInfo?.schoolId,
                })
              );
            }

            console.log(responseUserInfo);
          }, 1500);
        })
        .catch((error) => {
          const errorMessage =
            error?.response?.data?.message ||
            "An error occurred. Please try again.";
          setIconModal({
            message: errorMessage,
            icon: HiExclamationCircle,
            visibility: true,
            isIconSpin: false,
          });

          // Automatically hide the modal after 3 seconds
          setTimeout(() => {
            setIconModal({
              message: "",
              icon: HiExclamationCircle,
              visibility: false,
              isIconSpin: false,
            });
          }, 1500);
        });
    }
  };

  // IsUserFormValid - Validate the user information
  const IsUserFormValid = () => {
    if (!userInformation.firstName) {
      ShowModalMessage("The user must have a first name!");
      return false;
    } else if (!REGEX.name.test(userInformation.firstName)) {
      ShowModalMessage("The user's first name is not valid!");
      return false;
    } else if (userInformation.firstName.length > 25) {
      ShowModalMessage("The user's first name is too long.");
      return false;
    } else if (!userInformation.lastName) {
      ShowModalMessage("The user must have a last name!");
      return false;
    } else if (!REGEX.name.test(userInformation.lastName)) {
      ShowModalMessage("The user's last name is not valid!");
      return false;
    } else if (userInformation.lastName.length > 25) {
      ShowModalMessage("The user's last name is too long.");
      return false;
    } else if (userInformation.middleName.length > 30) {
      ShowModalMessage("The user's middle name is too long.");
      return false;
    } else if (
      !userInformation.schoolId &&
      !REGEX.schoolId.test(userInformation.schoolId)
    ) {
      ShowModalMessage("The user's school ID is not valid.");
      return false;
    } else if (
      !userInformation.emailAddress &&
      !REGEX.schoolId.test(userInformation.emailAddress)
    ) {
      ShowModalMessage("The user's email address is not valid.");
      return false;
    }

    return true;
  };

  const IsValidTagID = () => {
    if (
      userInformation.tagId &&
      (!/^[0-9A-Fa-f]+$/.test(userInformation.tagId) ||
        userInformation.tagId.length !== 4)
    ) {
      ShowModalMessage("Invalid Tag ID. Tag ID must be HEX presentation.");
      return false;
    }
    return true;
  };

  // IsUserRoleValid - Validation for userRole
  const IsUserRoleValid = () => {
    return (
      userRole === "Admin" || userRole === "Student" || userRole === "Faculty"
    );
  };

  const DisableUserInformation = () => {
    if (userRole === "Admin") {
      setUserFormDisable({
        firstName: false,
        middleName: false,
        lastName: false,
        emailAddress: false,
        schoolId: false,
        tagId: false,
        userRole: true,
        editable: true,
      });
    } else if (userRole === "Faculty") {
      setUserFormDisable({
        firstName: false,
        middleName: false,
        lastName: false,
        emailAddress: false,
        schoolId: true,
        tagId: true,
        userRole: true,
        editable: true,
      });
    } else {
      setUserFormDisable({
        firstName: true,
        middleName: true,
        lastName: true,
        emailAddress: true,
        schoolId: true,
        userRole: true,
        tagId: true,
        editable: false,
      });
    }
  };

  const FetchUserInformation = () => {
    axios
      .get(`${API.domain}/api/user/${schoolId}`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        const responseObject = response?.data?.responseObject;
        setUserInformation({
          schoolId: responseObject?.schoolId,
          firstName: responseObject?.firstName,
          middleName: responseObject?.middleName,
          lastName: responseObject?.lastName,
          emailAddress: responseObject?.emailAddress,
          tagId: responseObject?.tagId,
          userRole: OPTIONS.user.roles.find(
            (role) => role.value === responseObject.userRole
          ),
        });
      })
      .catch(() => {
        setUserInformation({
          schoolId: "",
          firstName: "",
          middleName: "",
          lastName: "",
          emailAddress: "",
          tagId: "",
          userRole: OPTIONS.user.roles.find((role) => role.value === "Student"),
        });
      });
  };

  const ShowModalMessage = (message, icon = HiExclamationCircle) => {
    setIconModal({
      message: message,
      visibility: true,
      icon: icon,
      isIconSpin: false,
    });
    setTimeout(() => {
      setIconModal({
        message: "",
        visibility: false,
        icon: HiExclamationCircle,
        isIconSpin: false,
      });
    }, 1500);
  };

  useEffect(() => {
    FetchUserInformation();
    DisableUserInformation();
  }, []);

  return (
    <>
      {IsUserRoleValid() ? (
        <GeneralPage>
          {/* Response Modal for displaying loading, successful messages or errors */}
          <IconModal
            className="SettingsPage-IconModalContainer"
            icon={iconModal.icon}
            iconClassName="SettingsPage-IconModalIcon"
            message={iconModal.message}
            isVisible={iconModal.visibility}
            isSpinning={iconModal.isIconSpin}
          />
          <div className="SettingsPage-PageContentContainer">
            {/* Page Header - Settings */}
            <div className="SettingsPage-PageHeaderContainer">
              <Logo className="SettingsPage-LogoContainer" />
              <p className="heading-2">Settings</p>
            </div>
            {/* Page Content */}
            <div className="SettingsPage-ContentContainer">
              {/* Content Header Container */}
              {/* Content Header Container */}
              <div className="SettingsPage-ContentHeaderContainer">
                <div className="SettingsPage-HeaderContainer">
                  {/* User Information Tab */}
                  <HeaderButton
                    title="User Information"
                    isSelected={currentSection === "User Information"}
                    onClick={() => setCurrentSection("User Information")}
                  />
                </div>
                {/* Action Container */}
                <div className="SettingsPage-ActionContainer">
                  {currentSection === "User Information" &&
                    userFormDisable.editable && (
                      <StandardButton
                        title="Save"
                        onClick={SaveUpdateUserInformation}
                        className="SettingsPage-SaveButton"
                        icon={HiBookmarkAlt}
                      />
                    )}
                </div>
              </div>
              <div className="SettingsPage-FormContainer">
                <UserForm
                  className="SettingsPage-UsersForm"
                  userInformation={userInformation}
                  setUserInformation={setUserInformation}
                  disableFirstName={userFormDisable.firstName}
                  disableMiddleName={userFormDisable.middleName}
                  disableLastName={userFormDisable.lastName}
                  disableEmailAddress={userFormDisable.emailAddress}
                  disableSchoolId={userFormDisable.schoolId}
                  disableTagId={userFormDisable.tagId}
                  disableUserRole={userFormDisable.userRole}
                />
              </div>
              {/* Mobile Save Button */}
              {currentSection === "User Information" &&
                userFormDisable.editable && (
                  <StandardButton
                    title="Save"
                    onClick={SaveUpdateUserInformation}
                    className="SettingsPage-MobileSaveButton"
                    icon={HiBookmarkAlt}
                  />
                )}
            </div>
          </div>
        </GeneralPage>
      ) : (
        <UnauthorizedPanel />
      )}
    </>
  );
}

// Define propTypes for SettingsPage
SettingsPage.propTypes = {
  userRole: PropTypes.string,
  schoolId: PropTypes.string,
};

// Define defaultProps for SettingsPage
SettingsPage.defaultProps = {
  userRole: "",
  schoolId: "",
  userData: {},
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
  userData: state.user.userData,
});

// Exports the SettingsPage component as the default export for the SettingsPage module.
export default connect(mapStateToProps)(SettingsPage);
