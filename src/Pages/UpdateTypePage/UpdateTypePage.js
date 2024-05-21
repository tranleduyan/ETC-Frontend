//#region Import Necessary Dependencies
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API, MESSAGE } from "../../Constants";
import { connect } from "react-redux";
//#endregion

//#region Import UI Components
import IconModal from "../../Components/Modals/IconModal/IconModal";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal/ConfirmationModal";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import IconButton from "../../Components/Buttons/IconButton/IconButton";
import TypeForm from "../../Components/Forms/TypeForm/TypeForm";
//#endregion

// Import Stylings
import "./UpdateTypePage.css";

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

// Define UpdateTypePage Component
function UpdateTypePage(props) {
  // Extract relevant information
  const { setEditSection, typeId, schoolId, setIsUpdated } = props;

  // Information for updating type
  const [typeInformation, setTypeInformation] = useState({
    name: "",
  });

  // Type form error state and error message
  const [typeIsError, setTypeIsError] = useState(false);
  const [typeErrorMessage, setTypeErrorMessage] = useState("");

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

  // IsTypeFormValid - Check for form validation
  const IsTypeFormValid = () => {
    if (!typeInformation.name) {
      setTypeIsError(true);
      setTypeErrorMessage("Please enter the type name.");
      return false;
    }

    if (typeIsError) {
      setTypeIsError(false);
      setTypeErrorMessage("");
    }

    return true;
  };

  // OnBack - Set editSection to empty to hide the component and show the previous page.
  const OnBack = () => {
    setEditSection("");
    setTypeInformation({
      name: "",
    });
  };

  // SaveUpdate - Update the type information
  const SaveUpdate = () => {
    if (IsTypeFormValid()) {
      // Show processing message
      setIsProcessing(true);
      setResponseModal({
        message: "Saving the updates...",
        error: false,
        isVisible: true,
      });

      const requestBody = {
        schoolId: schoolId,
        equipmentTypeName: typeInformation.name,
      };

      // Perform API call for equipment type update
      axios
        .put(`${API.domain}/api/inventory/types/${typeId}`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then(() => {
          // Hide processing message
          setIsProcessing(false);

          // Show success message
          setResponseModal({
            message: MESSAGE.successTypeUpdate,
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
            message: "Something went wrong while updating the current type.",
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

  // DeleteType - Delete the type
  const DeleteType = () => {
    // Show confirmation modal for type deletion
    setConfirmationModal({
      title: "Remove Type",
      content: "Are you sure you want to remove the current equipment type?",
      warning:
        "This will also permanently delete all equipment and models associated with the current type and the action cannot be undone.",
      onYes: () => {
        // Close the confirmation modal
        CloseConfirmationModal();

        // Set and Show the response modal
        setResponseModal({
          message: "Deleting the current type...",
          isVisible: true,
        });

        // Set state to is processing
        setIsProcessing(true);

        // Process - perform deletion API
        axios
          .delete(`${API.domain}/api/inventory/types`, {
            headers: {
              "X-API-KEY": API.key,
            },
            data: {
              schoolId: schoolId,
              typeIds: [typeId],
            },
          })
          .then(() => {
            setIsProcessing(false);
            setResponseModal({
              message: MESSAGE.successTypeMassRemoval,
              error: false,
              isVisible: true,
            });
            setTimeout(() => {
              setResponseModal({
                message: "",
                error: false,
                isVisible: false,
              });
            }, 1500);

            setIsUpdated(true);

            // Return to the previous page
            OnBack();
          })
          .catch(() => {
            // Hide processing message
            setIsProcessing(false);

            // Show error message
            setResponseModal({
              message: "Something went wrong while deleting the current type.",
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
      // Close the Confirmation modal if choose not to proceed further
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

  // FetchTypeInformation - Fetch the type information
  const FetchTypeInformation = () => {
    axios
      .get(`${API.domain}/api/inventory/types/${typeId}`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        setTypeInformation({
          ...typeInformation,
          name: response?.data?.responseObject?.typeName,
        });
      })
      .catch(() => {
        setResponseModal({
          message:
            "Something went wrong while retrieving the current type information.",
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
        OnBack();
      });
  };

  // Side Effects
  useEffect(() => {
    FetchTypeInformation();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Response Modal for displaying successful messages or errors */}
      <IconModal
        className="UpdateTypePage-ResponseModalContainer"
        icon={ResponseIcon()}
        iconClassName="UpdateTypePage-ResponseModalIcon"
        message={responseModal.message}
        isVisible={responseModal.isVisible || isProcessing}
      />
      {/* Confirmation Modal for warnings and confirmation actions */}
      <ConfirmationModal
        className="UpdateTypePage-ConfirmationModalContainer"
        title={confirmationModal.title}
        content={confirmationModal.content}
        warning={confirmationModal.warning}
        onYes={confirmationModal.onYes}
        onNo={confirmationModal.onNo}
        isVisible={confirmationModal.isVisible}
      />
      <div className="UpdateTypePage-ContentContainer">
        {/* Content Header Container */}
        <div className="UpdateTypePage-ContentHeaderContainer">
          {/* Header Container */}
          <div className="UpdateTypePage-HeaderContainer">
            {/* Back Button */}
            <IconButton
              icon={HiChevronLeft}
              className="UpdateTypePage-BackButton"
              onClick={OnBack}
            />
            {/* Header */}
            <p className="heading-5">Update Type</p>
          </div>
          {/* Action Container */}
          <div className="UpdateTypePage-ActionContainer">
            <StandardButton
              title="Save"
              onClick={SaveUpdate}
              className="UpdateTypePage-SaveButton"
              icon={HiBookmarkAlt}
            />
            <StandardButton
              title=""
              onClick={DeleteType}
              className="UpdateTypePage-DeleteButton"
              icon={HiTrash}
            />
          </div>
        </div>
        {/* Type Form */}
        <TypeForm
          typeInformation={typeInformation}
          setTypeInformation={setTypeInformation}
          isError={typeIsError}
          errorMessage={typeErrorMessage}
        />
        {/* Mobile Save Update Button */}
        <StandardButton
          title="Save"
          onClick={SaveUpdate}
          className="UpdateTypePage-MobileSaveButton"
          icon={HiBookmarkAlt}
        />
      </div>
    </>
  );
}

// Define the props type for the component
UpdateTypePage.propTypes = {
  setEditSection: PropTypes.func.isRequired,
  typeId: PropTypes.number.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  schoolId: PropTypes.string,
};

// Define default props for the component
UpdateTypePage.defaultProps = {
  schoolId: "",
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  schoolId: state.user.userData?.schoolId,
});

// Exports the UpdateTypePage component as the default export for the UpdateTypePage module.
export default connect(mapStateToProps)(UpdateTypePage);
