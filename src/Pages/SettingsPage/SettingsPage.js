//#region Import Necessary Dependencies
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//#endregion

//#region Import Stylings
import "./SettingsPage.css";
//#endregion

//#region Import UI Components
import GeneralPage from "../GeneralPage/GeneralPage";
import UnauthorizedPanel from "../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel";
import IconModal from "../../Components/Modals/IconModal/IconModal";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal/ConfirmationModal";
import Logo from "../../Components/Logo/Logo";
import HeaderButton from "../../Components/Buttons/HeaderButton/HeaderButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import UserForm from "../../Components/Forms/UserForm/UserForm";
//#endregion

//#region Import Icons
import { HiBookmarkAlt, HiExclamationCircle, HiRefresh } from "react-icons/hi";
//#endregion

// Define SettingsPage Component
function SettingsPage(props) {
  // Extract necessary props
  const { userRole, schoolId } = props;

  // State for current section of the page
  const [currentSection, setCurrentSection] = useState("User Information");

  // Confirmation Modal State Object
  const [confirmationModal, setConfirmationModal] = useState({
    title: "",
    content: "",
    warning: "",
    onYes: () => {},
    onNo: () => {},
    isVisible: false,
  });

  // IsProcessing State - Determine whether is processing APIs
  const [isProcessing, setIsProcessing] = useState(false);

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
    editable: true,
  });

  // SaveUpdateUserInformation - Update the user information
  const SaveUpdateUserInformation = () => {
    console.log("Update");
  };

  // CloseConfirmationModal - Hide/Close the confirmation modal
  const CloseConfirmationModal = () => {
    setConfirmationModal({
      title: "",
      content: "",
      warning: "",
      onYes: () => {},
      onNo: () => {},
      isVisible: false,
    });
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
        editable: true,
      });
    } else {
      setUserFormDisable({
        firstName: true,
        middleName: true,
        lastName: true,
        emailAddress: true,
        schoolId: true,
        tagId: true,
        editable: false,
      });
    }
  };

  useEffect(() => {
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
          {/* Confirmation Modal for warnings and confirmation actions */}
          <ConfirmationModal
            className="SettingsPage-ConfirmationModalContainer"
            title={confirmationModal.title}
            content={confirmationModal.content}
            warning={confirmationModal.warning}
            onYes={confirmationModal.onYes}
            onNo={confirmationModal.onNo}
            isVisible={confirmationModal.isVisible}
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
                  {currentSection === "Manage Information" &&
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
                />
              </div>
              {/* Mobile Save Button */}
              {currentSection === "Manage Information" &&
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
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Exports the SettingsPage component as the default export for the SettingsPage module.
export default connect(mapStateToProps)(SettingsPage);
