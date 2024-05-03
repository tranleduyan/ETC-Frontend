//#region Import Neccessary Dependencies
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API } from "../../Constants";
import { connect } from "react-redux";
import { resetUserData } from "../../storage";
//#endregion

//#region Import UI Components
import IconModal from "../../Components/Modals/IconModal/IconModal";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal/ConfirmationModal";
import IconButton from "../../Components/Buttons/IconButton/IconButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import Message from "../../Components/Message/Message";
//#endregion

//#region Import Stylings
import "./LocationDetailsPage.css";
//#endregion

//#region Import Icons
import {
  HiSwitchHorizontal,
  HiExclamationCircle,
  HiCheckCircle,
  HiChevronLeft,
  HiPencilAlt,
  HiTrash,
  HiOutlineStatusOnline,
} from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import LocationDetailsEquipmentList from "../../Components/Lists/LocationDetailsEquipmentList/LocationDetailsEquipmentList";
import LocationDetailsAntennaList from "../../Components/Lists/LocationDetailsAntennaList";
//#endregion

// Define LocationDetailsPage Component
function LocationDetailsPage(props) {
  // Extract revelevant information
  const { setDetailSection, setEditSection, locationDetailId, setIsUpdated } =
    props;

  const [locationInformation, setLocationInformation] = useState({
    locationName: "alo",
    attenas: [],
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
      attenas: [],
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
    console.log("delete location");
  };

  // ResponseIcon - Determine response icon based on processing state
  const ResponseIcon = () => {
    if (isProcessing) {
      return HiSwitchHorizontal;
    } else {
      return responseModal.error ? HiExclamationCircle : HiCheckCircle;
    }
  };

  // FetchLocationInformation - Fetch location information
  const FetchLocationInformation = () => {
    console.log("fetching locaiton informaiton");
  };

  // Fetch location information upon mounting
  useEffect(() => {
    FetchLocationInformation();
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
          <div className="LocationDetailsPage-InformationContainer">
            <div className="LocationDetailsPage-LocationEquipmentContainer">
              <p className="heading-5">Equipment</p>
              <LocationDetailsEquipmentList className="LocationDetailsPage-LocationDetailsEquipmentList" />
            </div>
            <div className="LocationDetailsPage-LocationScanHistoryContainer">
              <p className="heading-5">Scan History</p>
              <div className="LocationDetailsPage-LocationScanHistoryList">
                <div className="LocationDetailsPage-LocationScanHistoryCard">
                  <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-Date">
                    11/02/2024
                  </p>
                  <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-Time">
                    06:54 PM
                  </p>
                  <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-EquipmentSerialID">
                    AUSBH265
                  </p>
                  <p className="paragraph-1 LocationDetailsPage-LocationScanHistoryCard-Name">
                    Paul, Wilson
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="LocationDetailsPage-LocationAntennasContainer">
            <p className="heading-5">RFID Antennas</p>
            <LocationDetailsAntennaList />
          </div>
        </div>
        <div className="LocationDetailsPage-MobileBottomActionContainer">
          <StandardButton
            title="Edit"
            onClick={HandleEdit}
            className="LocationDetailsPage-MobileEditButton"
            icon={HiPencilAlt}
          />
        </div>
      </div>
    </>
  );
}

export default LocationDetailsPage;
