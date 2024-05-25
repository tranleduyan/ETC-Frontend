//#region Import Necessary Dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//#endregion

//#region Import Stylings
import "./UsersPage.css";
//#endregion

//#region Import UI Components
import GeneralPage from "../GeneralPage/GeneralPage";
import UnauthorizedPanel from "../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel";
import IconModal from "../../Components/Modals/IconModal/IconModal";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal/ConfirmationModal";
import Logo from "../../Components/Logo/Logo";
import HeaderButton from "../../Components/Buttons/HeaderButton/HeaderButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import StandardDropDown from "../../Components/DropDowns/StandardDropDown/StandardDropDown";
import UserForm from "../../Components/Forms/UserForm/UserForm";
//#endregion

//#region Import Icons
import { HiBookmarkAlt, HiExclamationCircle, HiRefresh } from "react-icons/hi";
//#endregion

// Define UsersPage Component
function UsersPage(props) {
  // Extract necessary props
  const { userRole, schoolId } = props;

  // State for current section of the page
  const [currentSection, setCurrentSection] = useState("Manage Information");

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

  // Selected User States
  const [selectedUserInformation, setSelectedUserInformation] = useState({
    schoolId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    tagId: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  // SaveUpdateUserInformation - Update the user information
  const SaveUpdateUserInformation = () => {
    console.log("Update");
  };

  // HandleUserSelectionInputChange - Handle user selection
  const HandleUserSelectionInputChange = (_, selectedValue) => {
    setSelectedUser(selectedValue);
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

  return (
    <>
      {userRole === "Admin" ? (
        <GeneralPage>
          {/* Response Modal for displaying loading, successful messages or errors */}
          <IconModal
            className="UsersPage-IconModalContainer"
            icon={iconModal.icon}
            iconClassName="UsersPage-IconModalIcon"
            message={iconModal.message}
            isVisible={iconModal.visibility}
            isSpinning={iconModal.isIconSpin}
          />
          {/* Confirmation Modal for warnings and confirmation actions */}
          <ConfirmationModal
            className="UsersPage-ConfirmationModalContainer"
            title={confirmationModal.title}
            content={confirmationModal.content}
            warning={confirmationModal.warning}
            onYes={confirmationModal.onYes}
            onNo={confirmationModal.onNo}
            isVisible={confirmationModal.isVisible}
          />
          <div className="UsersPage-PageContentContainer">
            {/* Page header - Users */}
            <div className="UsersPage-PageHeaderContainer">
              <Logo className="UsersPage-LogoContainer" />
              <p className="heading-2">Users</p>
            </div>
            {/* Page Content */}
            <div className="UsersPage-ContentContainer">
              {/* Content Header Container */}
              <div className="UsersPage-ContentHeaderContainer">
                {/* Header Container */}
                <div className="UsersPage-HeaderContainer">
                  {/* Manage Information Tab */}
                  <HeaderButton
                    title="Manage Information"
                    isSelected={currentSection === "Manage Information"}
                    onClick={() => setCurrentSection("Manage Information")}
                  />
                </div>
                {/* Action Container */}
                <div className="UsersPage-ActionContainer">
                  {currentSection === "Manage Information" && (
                    <StandardButton
                      title="Save"
                      onClick={SaveUpdateUserInformation}
                      className="UsersPage-SaveButton"
                      icon={HiBookmarkAlt}
                    />
                  )}
                </div>
              </div>
              <div className="UsersPage-FormContainer">
                <div className="UsersPage-UserSelectionContainer">
                  <p className="heading-5">User</p>
                  <StandardDropDown
                    placeholder="Select user"
                    className="UsersPage-SelectUserField"
                    name="userSelection"
                    value={selectedUser}
                    options={[]}
                    onChange={(name, value) =>
                      HandleUserSelectionInputChange(name, value)
                    }
                  />
                </div>
                {/* Instructions/Messages */}
                {!selectedUser ? (
                  <p className="paragraph-1 UsersPage-Instructions">
                    Please select a user to manage their information.
                  </p>
                ) : (
                  <UserForm
                    className="UsersPage-UsersForm"
                    userInformation={selectedUserInformation}
                    setUserInformation={setSelectedUserInformation}
                  />
                )}
              </div>
              {/* Mobile Save Button */}
              <StandardButton
                title="Save"
                onClick={SaveUpdateUserInformation}
                className="UsersPage-MobileSaveButton"
                icon={HiBookmarkAlt}
              />
            </div>
          </div>
        </GeneralPage>
      ) : (
        <UnauthorizedPanel />
      )}
    </>
  );
}

// Define propTypes for UsersPage
UsersPage.propTypes = {
  userRole: PropTypes.string,
  schoolId: PropTypes.string,
};

// Define defaultProps for UsersPage
UsersPage.defaultProps = {
  userRole: "",
  schoolId: "",
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Exports the UsersPage component as the default export for the UsersPage module.
export default connect(mapStateToProps)(UsersPage);
