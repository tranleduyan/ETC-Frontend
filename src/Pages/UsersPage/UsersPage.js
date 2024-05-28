//#region Import Necessary Dependencies
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { API, OPTIONS, REGEX } from "../../Constants";
//#endregion

//#region Import Stylings
import "./UsersPage.css";
//#endregion

//#region Import UI Components
import GeneralPage from "../GeneralPage/GeneralPage";
import UnauthorizedPanel from "../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel";
import IconModal from "../../Components/Modals/IconModal/IconModal";
import Logo from "../../Components/Logo/Logo";
import HeaderButton from "../../Components/Buttons/HeaderButton/HeaderButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import StandardDropDown from "../../Components/DropDowns/StandardDropDown/StandardDropDown";
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

// Define UsersPage Component
function UsersPage(props) {
  // Extract necessary props
  const { userRole, schoolId } = props;

  // State for current section of the page
  const [currentSection, setCurrentSection] = useState("Manage Information");

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
    userRole: OPTIONS.user.roles?.find((role) => role.value === "Student"),
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const [usersOptions, setUsersOptions] = useState([]);

  // SaveUpdateUserInformation - Update the user information
  const SaveUpdateUserInformation = () => {
    if (IsUserFormValid() && IsValidTagID()) {
      // Show processing message
      setIconModal({
        message: "Saving the updates...",
        icon: HiRefresh,
        visibility: true,
        isIconSpin: true,
      });

      const requestBody = {
        targetSchoolId: selectedUser.value,
        firstName: selectedUserInformation.firstName,
        middleName: selectedUserInformation.middleName,
        lastName: selectedUserInformation.lastName,
        emailAddress: selectedUserInformation.emailAddress,
        newSchoolId: selectedUserInformation.schoolId,
        tagId: selectedUserInformation.tagId,
        newUserRole: selectedUserInformation.userRole.value,
      };

      axios
        .put(`${API.domain}/api/user/${schoolId}`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then((response) => {
          const responseObject = response?.data?.responseObject;
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

            // Filter out the user with the same schoolId as the current user
            const filteredUsers = responseObject?.filter(
              (user) => user.schoolId !== schoolId
            );

            // Map value and label to options
            const options = filteredUsers?.map((user) => ({
              value: user?.schoolId,
              label: user?.fullNameId,
            }));

            const userList = filteredUsers?.map((user) => ({
              ...user,
              userRole: OPTIONS.user.roles.find(
                (role) => role.value === user.userRole
              ),
            }));

            // Set the selected user with the updated information
            const updatedUser = userList.find(
              (user) => user.schoolId === selectedUserInformation.schoolId
            );
            setSelectedUser({
              value: updatedUser.schoolId,
              label: updatedUser.fullNameId,
            });

            setSelectedUserInformation({
              schoolId: updatedUser.schoolId,
              firstName: updatedUser.firstName,
              middleName: updatedUser.middleName,
              lastName: updatedUser.lastName,
              emailAddress: updatedUser.emailAddress,
              tagId: updatedUser.tagId,
              userRole: updatedUser.userRole,
            });

            setUsersOptions(options);
            setUsers(userList);
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

  // HandleUserSelectionInputChange - Handle user selection
  const HandleUserSelectionInputChange = (_, selectedValue) => {
    setSelectedUser(selectedValue);
    const chosenUser = users.find(
      (user) => user.schoolId === selectedValue.value
    );
    if (chosenUser) {
      setSelectedUserInformation({
        schoolId: chosenUser.schoolId,
        firstName: chosenUser.firstName,
        middleName: chosenUser.middleName,
        lastName: chosenUser.lastName,
        emailAddress: chosenUser.emailAddress,
        tagId: chosenUser.tagId,
        userRole: chosenUser.userRole,
      });
    } else {
      setSelectedUserInformation({
        schoolId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        emailAddress: "",
        tagId: "",
      });
    }
  };

  // FetchAllUsers - Fetch the information of all users
  const FetchAllUsers = () => {
    // HTTP get request to fetch all the users
    axios
      .get(`${API.domain}/api/user`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        const responseObject = response?.data?.responseObject;

        // Filter out the user with the same schoolId as the current user
        const filteredUsers = responseObject?.filter(
          (user) => user.schoolId !== schoolId
        );

        // Map value and label to options
        const options = filteredUsers?.map((user) => ({
          value: user?.schoolId,
          label: user?.fullNameId,
        }));

        const userList = filteredUsers?.map((user) => ({
          ...user,
          userRole: OPTIONS.user.roles.find(
            (role) => role.value === user.userRole
          ),
        }));

        setUsersOptions(options);
        setUsers(userList);
      })
      .catch(() => {
        setUsers([]);
        setUsersOptions([]);
      });
  };

  // IsUserFormValid - Validate the user information
  const IsUserFormValid = () => {
    if (!selectedUserInformation.firstName) {
      ShowModalMessage("The user must have a first name!");
      return false;
    } else if (!REGEX.name.test(selectedUserInformation.firstName)) {
      ShowModalMessage("The user's first name is not valid!");
      return false;
    } else if (selectedUserInformation.firstName.length > 25) {
      ShowModalMessage("The user's first name is too long.");
      return false;
    } else if (!selectedUserInformation.lastName) {
      ShowModalMessage("The user must have a last name!");
      return false;
    } else if (!REGEX.name.test(selectedUserInformation.lastName)) {
      ShowModalMessage("The user's last name is not valid!");
      return false;
    } else if (selectedUserInformation.lastName.length > 25) {
      ShowModalMessage("The user's last name is too long.");
      return false;
    } else if (selectedUserInformation.middleName.length > 30) {
      ShowModalMessage("The user's middle name is too long.");
      return false;
    } else if (
      !selectedUserInformation.schoolId &&
      !REGEX.schoolId.test(selectedUserInformation.schoolId)
    ) {
      ShowModalMessage("The user's school ID is not valid.");
      return false;
    } else if (
      !selectedUserInformation.emailAddress &&
      !REGEX.schoolId.test(selectedUserInformation.emailAddress)
    ) {
      ShowModalMessage("The user's email address is not valid.");
      return false;
    }

    return true;
  };

  const IsValidTagID = () => {
    if (
      selectedUserInformation.tagId &&
      (!/^[0-9A-Fa-f]+$/.test(selectedUserInformation.tagId) ||
        selectedUserInformation.tagId.length !== 4)
    ) {
      ShowModalMessage("Invalid Tag ID. Tag ID must be HEX presentation.");
      return false;
    }
    return true;
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
    FetchAllUsers();
    // eslint-disable-next-line
  }, []);

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
                    options={usersOptions}
                    onChange={(name, value) =>
                      HandleUserSelectionInputChange(name, value)
                    }
                    isSearchable={true}
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
