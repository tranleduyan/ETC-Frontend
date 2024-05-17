//#region Import Necessary Dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API, MESSAGE, OPTIONS } from "../../Constants";
import { connect } from "react-redux";
import { resetUserData } from "../../storage";
import PropTypes from "prop-types";
//#endregion

// Import Stylings
import "./UpdateLocationPage.css";

//#region Import UI Components
import IconModal from "../../Components/Modals/IconModal/IconModal";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal/ConfirmationModal";
import IconButton from "../../Components/Buttons/IconButton/IconButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import LocationForm from "../../Components/Forms/LocationForm/LocationForm";
//#endregion

//#region Import Icons
import {
  HiSwitchHorizontal,
  HiExclamationCircle,
  HiCheckCircle,
  HiChevronLeft,
  HiBookmarkAlt,
  HiTrash,
} from "react-icons/hi";
//#endregion

// Define UpdateLocationPage Component
function UpdateLocationPage(props) {
  // Extract relevant information
  const {
    detailSection,
    setDetailSection,
    setEditSection,
    locationId,
    schoolId,
    setIsUpdated,
  } = props;

  // Information for updating location
  const [locationInformation, setLocationInformation] = useState({
    name: "",
  });

  // Location form error state and error message
  const [locationIsError, setLocationIsError] = useState(false);
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

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

  // Response Modal State Object - Control visibility and content of the response
  const [responseModal, setResponseModal] = useState({
    message: "",
    error: false,
    isVisible: false,
  });

  // IsLocationFormValid - Check for form validation
  const IsLocationFormValid = () => {
    if (!locationInformation.name) {
      setLocationIsError(true);
      setLocationErrorMessage("Please enter the location name.");
      return false;
    }

    if (locationIsError) {
      setLocationIsError(false);
      setLocationErrorMessage("");
    }

    return true;
  };

  // OnBack - Set editSection to empty to hide the component and show the previous page.
  const OnBack = () => {
    setEditSection("");
    setLocationInformation({
      name: "",
    });
  };

  // SaveUpdate - Update the location information
  const SaveUpdate = () => {
    if (IsLocationFormValid()) {
      // Show processing message
      setIsProcessing(true);
      setResponseModal({
        message: "Saving the updates...",
        error: false,
        isVisible: true,
      });

      const requestBody = {
        schoolId: schoolId,
        newLocationName: locationInformation.name,
      };

      // Perform API call for equipment type update
      axios
        .put(`${API.domain}/api/location/${locationId}`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then(() => {
          // Hide processing message
          setIsProcessing(false);

          // Show success message
          setResponseModal({
            message: MESSAGE.successLocationUpdate,
            error: false,
            isVisible: true,
          });

          // Turn off the response modal after 1500ms.
          setTimeout(() => {
            setResponseModal({
              message: "",
              error: false,
              isVisible: false,
            });
          }, 1500);
          setIsUpdated(true);
        })
        .catch(() => {
          // Hide processing message
          setIsProcessing(false);

          // Show error message
          setResponseModal({
            message:
              "Something went wrong while updating the current location.",
            error: true,
            isVisible: true,
          });
          setTimeout(() => {
            setResponseModal({
              message: "",
              error: false,
              isVisible: false,
            });
          }, 1500);
          setIsUpdated(false);
        });
    }
  };

  // DeleteLocation - Delete the current location
  const DeleteLocation = () => {
    // Show confirmation modal for equipment deletion
    setConfirmationModal({
      title: "Remove Location",
      content: `Are you sure you want to remove this location?`,
      warning: `This will also permanently delete this location and the action cannot be undone.`,
      onYes: () => {
        // Close confirmation modal
        CloseConfirmationModal();

        // Show processing message
        setResponseModal({
          message: `Deleting this location...`,
          isVisible: true,
        });

        setIsProcessing(true);

        // Perform API call for location deletion
        axios
          .delete(`${API.domain}/api/location`, {
            headers: {
              "X-API-KEY": API.key,
            },
            data: {
              schoolId: schoolId,
              locationIds: [locationId],
            },
          })
          .then(() => {
            // Hide processing message
            setIsProcessing(false);

            // Show success message
            setResponseModal({
              message: `The location has been successfully removed from the system.`,
              error: false,
              isVisible: true,
            });

            // Turn off the response modal after 1500ms and navigate back.
            setTimeout(() => {
              setResponseModal({
                message: "",
                error: false,
                isVisible: false,
              });

              setEditSection("");
              setLocationInformation({
                name: "",
              });

              if (detailSection) {
                setDetailSection("");
              }
            }, 1500);
            setIsUpdated(true);
          })
          .catch(() => {
            // Hide processing message
            setIsProcessing(false);

            // Show error message
            setResponseModal({
              message: "Something went wrong while deleting the location.",
              error: true,
              isVisible: true,
            });
            setTimeout(() => {
              setResponseModal({
                message: "",
                error: false,
                isVisible: false,
              });
            }, 1500);
            setIsUpdated(false);
          });
      },
      // Close the confirmation modal if choose not to proceed further
      onNo: () => {
        CloseConfirmationModal();
      },
      isVisible: true,
    });
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

  // ResponseIcon - Determine the icon for the response modal
  const ResponseIcon = () => {
    if (isProcessing) {
      return HiSwitchHorizontal;
    } else {
      return responseModal.error ? HiExclamationCircle : HiCheckCircle;
    }
  };

  // FetchLocationInformation - Fetch location information
  const FetchLocationInformation = () => {
    axios
      .get(`${API.domain}/api/location/${locationId}`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        const responseObject = response.data.responseObject;

        setLocationInformation({
          name: responseObject.locationName,
        });
      })
      .catch(() => {
        setResponseModal({
          message:
            "Something went wrong while retrieving the current location information.",
          error: true,
          isVisible: true,
        });
        setTimeout(() => {
          setResponseModal({
            message: "",
            error: false,
            isVisible: false,
          });
          setIsUpdated(false);
          OnBack();
        }, 1500);
      });
  };

  // Fetch location information upon mounting
  useEffect(() => {
    FetchLocationInformation();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Response Modal for displaying successful messages or errors */}
      <IconModal
        className="UpdateLocationPage-ResponseModalContainer"
        icon={ResponseIcon()}
        iconClassName="UpdateLocationPage-ResponseModalIcon"
        message={responseModal.message}
        isVisible={responseModal.isVisible || isProcessing}
      />
      {/* Confirmation Modal for warnings and confirmation actions */}
      <ConfirmationModal
        className="UpdateLocationPage-ConfirmationModalContainer"
        title={confirmationModal.title}
        content={confirmationModal.content}
        warning={confirmationModal.warning}
        onYes={confirmationModal.onYes}
        onNo={confirmationModal.onNo}
        isVisible={confirmationModal.isVisible}
      />
      <div className="UpdateLocationPage-ContentContainer">
        {/* Content Header Container */}
        <div className="UpdateLocationPage-ContentHeaderContainer">
          {/* Header Container */}
          <div className="UpdateLocationPage-HeaderContainer">
            {/* Back Button */}
            <IconButton
              icon={HiChevronLeft}
              className="UpdateLocationPage-BackButton"
              onClick={OnBack}
            />
            {/* Header */}
            <p className="heading-5">Update Location</p>
          </div>
          {/* Action Container */}
          <div className="UpdateLocationPage-ActionContainer">
            <StandardButton
              title="Save"
              onClick={SaveUpdate}
              className="UpdateLocationPage-SaveButton"
              icon={HiBookmarkAlt}
            />
            <StandardButton
              title=""
              onClick={DeleteLocation}
              className="UpdateLocationPage-DeleteButton"
              icon={HiTrash}
            />
          </div>
        </div>
        {/* Location Form */}
        <LocationForm
          locationInformation={locationInformation}
          setLocationInformation={setLocationInformation}
          isError={locationIsError}
          errorMessage={locationErrorMessage}
        />
        {/* Mobile Save Update Button */}
        <StandardButton
          title="Save"
          onClick={SaveUpdate}
          className="UpdateLocationPage-MobileSaveButton"
          icon={HiBookmarkAlt}
        />
      </div>
    </>
  );
}

// Define PropTypes
UpdateLocationPage.propTypes = {
  detailSection: PropTypes.string.isRequired,
  setDetailSection: PropTypes.func,
  setEditSection: PropTypes.func.isRequired,
  locationId: PropTypes.number.isRequired,
  schoolId: PropTypes.string,
  setIsUpdated: PropTypes.func.isRequired,
};

// Define defaultProps
UpdateLocationPage.defaultProps = {
  schoolId: "",
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLocationPage);
