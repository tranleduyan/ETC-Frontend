//#region Import Neccessary Dependencies
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API } from "../../Constants";
import { connect } from "react-redux";
//#endregion

//#region Import UI Components
import IconModal from "../../Components/Modals/IconModal/IconModal";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal/ConfirmationModal";
import IconButton from "../../Components/Buttons/IconButton/IconButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import Message from "../../Components/Message/Message";
import LocationDetailsEquipmentList from "../../Components/Lists/LocationDetailsEquipmentList/LocationDetailsEquipmentList";
import LocationDetailsAntennaList from "../../Components/Lists/LocationDetailsAntennaList";
//#endregion

//#region Import Stylings
import "./LocationDetailsPage.css";
//#endregion

//#region Import Icons
import {
  HiExclamationCircle,
  HiCheckCircle,
  HiChevronLeft,
  HiPencilAlt,
  HiTrash,
  HiRefresh,
} from "react-icons/hi";
//#endregion

// Define LocationDetailsPage Component
function LocationDetailsPage(props) {
  // Extract revelevant information
  const {
    setDetailSection,
    setEditSection,
    locationId,
    setIsUpdated,
    schoolId,
  } = props;

  const [locationInformation, setLocationInformation] = useState({
    locationName: "",
    antennas: [],
    scanHistory: [],
    equipment: [],
  });

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

  // OnBack - Handle back action
  const OnBack = () => {
    setDetailSection("");
    setEditSection("");
    setLocationInformation({
      antennas: [],
      scanHistory: [],
      equipment: [],
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

  // HandleEdit - Handle Edit Action
  const HandleEdit = () => {
    setEditSection("Location");
  };

  // DeleteLocation - Delete the location upon yes selection, else close the confirmation modal if no.
  const DeleteLocation = () => {
    setConfirmationModal({
      title: `Remove Location`,
      content: `Are you sure you want to remove this location?`,
      warning: `This will also permanently delete this location and the action cannot be undone.`,
      onYes: () => {
        CloseConfirmationModal();
        setResponseModal({
          message: `Deleting this location...`,
          isVisible: true,
        });
        setIsProcessing(true);

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
            setIsProcessing(false);
            setResponseModal({
              message: `The location has been successfully removed from the inventory.`,
              error: false,
              isVisible: true,
            });
            setTimeout(() => {
              setResponseModal({
                message: "",
                error: false,
                isVisible: false,
              });
              OnBack();
            }, 1500);
            setIsUpdated(true);
          })
          .catch(() => {
            setIsProcessing(false);
            setResponseModal({
              message: `Something went wrong while deleting this location.`,
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

  // ResponseIcon - Determine response icon based on processing state
  const ResponseIcon = () => {
    if (isProcessing) {
      return HiRefresh;
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
        const responseObject = response?.data?.responseObject;

        const adjustedScanHistory = responseObject?.scanHistory.map(
          (entry) => ({
            ...entry,
            scanTime: new Date(
              new Date(entry.scanTime).getTime() - 7 * 60 * 60 * 1000
            ),
          })
        );

        setLocationInformation({
          locationName: responseObject?.locationName,
          antennas: responseObject?.locationAntennas,
          scanHistory: adjustedScanHistory,
          equipment: responseObject?.locationEquipment,
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
        className="LocationDetailsPage-ResponseModalContainer"
        icon={ResponseIcon()}
        iconClassName="LocationDetailsPage-ReponseModalIcon"
        message={responseModal.message}
        isVisible={responseModal.isVisible || isProcessing}
      />
      {/* Confirmation Modal for warnings and Confirmation actions */}
      <ConfirmationModal
        className="LocationDetailsPage-ConfirmationModalContainer"
        title={confirmationModal.title}
        content={confirmationModal.content}
        warning={confirmationModal.warning}
        onYes={confirmationModal.onYes}
        onNo={confirmationModal.onNo}
        isVisible={confirmationModal.isVisible}
      />
      <div className="LocationDetailsPage-ContentContainer">
        {/* Content Header Container */}
        <div className="LocationDetailsPage-ContentHeaderContainer">
          {/* Header Container */}
          <div className="LocationDetailsPage-HeaderContainer">
            {/* Back Button */}
            <IconButton
              icon={HiChevronLeft}
              className="LocationDetailsPage-BackButton"
              onClick={OnBack}
            />
            {/* Header */}
            <p className="heading-5">{locationInformation.locationName}</p>
          </div>
          {/* Action Container */}
          <div className="LocationDetailsPage-ActionContainer">
            <StandardButton
              title=""
              onClick={FetchLocationInformation}
              className="LocationDetailsPage-RefreshButton"
              icon={HiRefresh}
            />
            <StandardButton
              title="Edit"
              onClick={HandleEdit}
              className="LocationDetailsPage-EditButton"
              icon={HiPencilAlt}
            />
            <StandardButton
              title=""
              onClick={DeleteLocation}
              className="LocationDetailsPage-DeleteButton"
              icon={HiTrash}
            />
          </div>
        </div>
        <div className="LocationDetailsPage-Content">
          <div className="LocationDetailsPage-LocationScanHistoryContainer">
            <p className="heading-5">Recent Scan History</p>
            {locationInformation.scanHistory?.length > 0 && (
              <div className="LocationDetailsPage-LocationScanHistoryList">
                {locationInformation.scanHistory.map((historyEntry) => (
                  <div
                    className="LocationDetailsPage-LocationScanHistoryCard"
                    key={historyEntry?.scanHistoryId}
                  >
                    <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-Date">
                      {new Date(historyEntry?.scanTime).toLocaleDateString()}
                    </p>
                    <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-Time">
                      {new Date(historyEntry?.scanTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-EquipmentSerialID">
                      {historyEntry?.serialId
                        ? historyEntry.serialId
                        : "[Serial ID]"}
                    </p>
                    <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-Name">
                      {historyEntry?.fullName ? historyEntry.fullName : "----"}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {locationInformation.scanHistory?.length === 0 && (
              <Message
                message={"The location has not been visited by anyone."}
                className="LocationDetailsPage-EmptyUsageHistoryMessage"
              />
            )}
          </div>
          <div className="LocationDetailsPage-InformationContainer">
            <div className="LocationDetailsPage-LocationEquipmentContainer">
              <p className="heading-5">Equipment</p>
              <LocationDetailsEquipmentList
                locationEquipment={locationInformation.equipment}
              />
            </div>
            <div className="LocationDetailsPage-LocationAntennasContainer">
              <p className="heading-5">RFID Antennas</p>
              <LocationDetailsAntennaList
                locationAntennas={locationInformation.antennas}
                locationName={locationInformation.locationName}
              />
            </div>
          </div>
        </div>
        <div className="LocationDetailsPage-MobileBottomActionContainer">
          <StandardButton
            title="Edit"
            onClick={HandleEdit}
            className="LocationDetailsPage-MobileEditButton"
            icon={HiPencilAlt}
          />
          <StandardButton
            title=""
            onClick={DeleteLocation}
            className="LocationDetailsPage-MobileDeleteButton"
            icon={HiTrash}
          />
        </div>
      </div>
    </>
  );
}

// Define propTypes for LocationDetailsPage
LocationDetailsPage.propTypes = {
  setDetailSection: PropTypes.func.isRequired,
  setEditSection: PropTypes.func.isRequired,
  schoolId: PropTypes.string,
  locationId: PropTypes.number.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};

// Define defaultProps for LocationDetailsPage
LocationDetailsPage.defaultProps = {
  schoolId: "",
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  schoolId: state.user.userData?.schoolId,
});

// Connect the component to Redux, mapping state and actions to props
export default connect(mapStateToProps)(LocationDetailsPage);
