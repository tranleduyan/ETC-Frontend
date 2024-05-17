//#region Import Neccessary Dependencies
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API, MESSAGE } from "../../Constants";
import { connect } from "react-redux";
//#endregion

//#region Import UI Components
import IconModal from "../../Components/Modals/IconModal/IconModal";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal/ConfirmationModal";
import IconButton from "../../Components/Buttons/IconButton/IconButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import RFIDAntennaForm from "../../Components/Forms/RFIDAntennaForm/RFIDAntennaForm";
//#endregion

// Import Stylings
import "./UpdateRFIDAntennaPage.css";

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

// Define UpdateRFIDAntennaPage Component
function UpdateRFIDAntennaPage(props) {
  // Extract relevant information
  const { setEditSection, rfidAntennaId, schoolId, setIsUpdated } = props;

  // Options for locations dropdowns
  const [locationOptions, setLocationOptions] = useState([]);

  // Information for adding RFID antenna
  const [rfidAntennaInformation, setRFIDAntennaInformation] = useState({
    id: "",
    location: null,
  });

  // RFID Antenna form error state and error message
  const [rfidAntennaIsError, setRFIDAntennaIsError] = useState(false);
  const [rfidAntennaErrorMessage, setRFIDAntennaErrorMessage] = useState("");

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

  // IsRFIDAntennaFormValid - Check for form validation
  const IsRFIDAntennaFormValid = () => {
    if (!rfidAntennaInformation.id) {
      setRFIDAntennaIsError(true);
      setRFIDAntennaErrorMessage("Please enter the RFID antenna ID.");
      return false;
    }

    if (rfidAntennaIsError) {
      setRFIDAntennaIsError(false);
      setRFIDAntennaErrorMessage("");
    }

    return true;
  };

  // OnBack - Set editSection to empty to hide the component and show the previous page.
  const OnBack = () => {
    setEditSection("");
    setRFIDAntennaInformation({
      id: "",
      location: null,
    });
  };

  // SaveUpdate - Update the RFID Antenna information
  const SaveUpdate = () => {
    if (IsRFIDAntennaFormValid()) {
      // Show processing message
      setIsProcessing(true);
      setResponseModal({
        message: "Saving the updates...",
        error: false,
        isVisible: true,
      });

      const requestBody = {
        schoolId: schoolId,
        newAntennaId: rfidAntennaInformation.name,
        locationId: rfidAntennaInformation.location?.value,
      };

      // Perform API call for equipment type update
      axios
        .put(
          `${API.domain}/api/inventory/antenna/${rfidAntennaId}`,
          requestBody,
          {
            headers: {
              "X-API-KEY": API.key,
            },
          }
        )
        .then(() => {
          // Hide processing message
          setIsProcessing(false);

          // Show success message
          setResponseModal({
            message: MESSAGE.successRFIDAntennaUpdate,
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
              "Something went wrong while updating the current RFID antenna.",
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

  // DeleteSelectedRFIDAntennas - Show the confirmation modal with warnings, if yes, perform a delete, if no, close the confirmation modal
  const DeleteRFIDAntennas = () => {
    const antennaText = setConfirmationModal({
      // Show confirmation modal for RFID antenna deletion
      title: "Remove RFID Antenna",
      content: `Are you sure you want to remove this ${rfidAntennaId} RFID antenna?`,
      warning: `This will permanently delete this ${rfidAntennaId} RFID antenna and the action cannot be undone.`,
      onYes: () => {
        // Close confirmation modal
        CloseConfirmationModal();

        // Show processing message
        setResponseModal({
          message: `Deleting the ${rfidAntennaId} RFID antenna...`,
          isVisible: true,
        });

        setIsProcessing(true);

        // Perform API call for RFID antennas deletion
        axios
          .delete(`${API.domain}/api/inventory/antenna`, {
            headers: {
              "X-API-KEY": API.key,
            },
            data: {
              schoolId: schoolId,
              antennaIds: [rfidAntennaId],
            },
          })
          .then(() => {
            // Hide processing message
            setIsProcessing(false);

            // Show success message
            setResponseModal({
              message: `The ${rfidAntennaId} RFID antenna has been successfully removed from the inventory.`,
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
              message: `Something went wrong while deleting the ${rfidAntennaId} RFID antenna.`,
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
      onNo: () => {
        // Close confirmation modal if user chooses not to proceed
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

  const FetchAllLocationOptions = () => {
    // HTTP get request to fetch all the location options
    axios
      .get(`${API.domain}/api/location`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        // Map value and label
        const options = response.data.responseObject.map((location) => ({
          value: location.locationId,
          label: location.locationName,
        }));

        // Set the options
        setLocationOptions(options);
      })
      .catch(() => {
        // Locations not found, reset location options
        setLocationOptions([]);
      });
  };

  // Fetch all locations upon component mounting and the antenna information
  useEffect(() => {
    FetchAllLocationOptions();
  }, []);

  return <div>UpdateRFIDAntennaPage</div>;
}

export default UpdateRFIDAntennaPage;
