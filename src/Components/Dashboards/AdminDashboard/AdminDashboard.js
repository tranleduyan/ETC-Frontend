//#region Import Necessary Dependencies
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API } from "../../../Constants";
import { useNavigate } from "react-router-dom";
import { resetUserData } from "../../../storage";
import { connect } from "react-redux";
import {
  InUseAmmeter,
  InUseBarometer,
  InUseHydrometer,
  InUseLuxmeter,
  InUseManometer,
  InUseMultimeter,
  InUseOscilloscope,
  InUseSpectrophotometer,
  InUseThermometer,
  InUseVoltmeter,
  UnderRepairAmmeter,
  UnderRepairBarometer,
  UnderRepairHydrometer,
  UnderRepairLuxmeter,
  UnderRepairManometer,
  UnderRepairMultimeter,
  UnderRepairOscilloscope,
  UnderRepairSpectrophotometer,
  UnderRepairThermometer,
  UnderRepairVoltmeter,
} from "../../../ResponseBody";
//#endregion

// Import Stylings
import "./AdminDashboard.css";

//#region Import UI Components
import GeneralPage from "../../../Pages/GeneralPage/GeneralPage";
import Logo from "../../Logo/Logo";
import IconButton from "../../Buttons/IconButton/IconButton";
import SearchBarInputField from "../../InputFields/SearchBarInputField/SearchBarInputField";
import InventorySummaryList from "../../Lists/InventorySummaryList/InventorySummaryList";
import FilterButton from "../../Buttons/FilterButton/FilterButton";
import ReservationList from "../../Lists/ReservationList/ReservationList";
import StandardButton from "../../Buttons/StandardButton";
import DetailSection from "../../Sections/DetailSection/DetailSection";
import IconModal from "../../Modals/IconModal/IconModal";
//#endregion

// Import Icons
import {
  HiCog,
  HiLogout,
  HiPlus,
  HiX,
  HiCheck,
  HiMinusCircle,
  HiExclamationCircle,
  HiRefresh,
  HiCreditCard,
} from "react-icons/hi";

// Define the AdminDashboard Component
function AdminDashboard(props) {
  const { resetUserData, schoolId } = props;

  const navigate = useNavigate();

  // Search Query Object
  const [searchQuery, setSearchQuery] = useState({
    equipmentType: "",
  });

  // Arrays for in-use equipment details
  // TODO: Implement APIs.
  const inUseEquipmentDetailsResponse = [
    InUseVoltmeter,
    InUseThermometer,
    InUseBarometer,
    InUseAmmeter,
    InUseMultimeter,
    InUseHydrometer,
    InUseOscilloscope,
    InUseSpectrophotometer,
    InUseManometer,
    InUseLuxmeter,
  ];

  // Arrays for under-repair equipment details
  // TODO: Implement APIs.
  const underRepairEquipmentDetailsResponse = [
    UnderRepairVoltmeter,
    UnderRepairThermometer,
    UnderRepairBarometer,
    UnderRepairAmmeter,
    UnderRepairMultimeter,
    UnderRepairHydrometer,
    UnderRepairOscilloscope,
    UnderRepairSpectrophotometer,
    UnderRepairManometer,
    UnderRepairLuxmeter,
  ];

  // State for selected inventory type and reservation
  const [selectedInventoryType, setSelectedInventoryType] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // State for reservations filter status
  const [reservations, setReservations] = useState([]);
  const [approvedReservations, setApprovedReservations] = useState([]);
  const [requestedReservations, setRequestedReservations] = useState([]);
  const [reservationsFilterStatus, setReservationsFilterStatus] =
    useState("Approved");

  // State for equipment details
  const [inUseEquipmentDetails, setInUseEquipmentDetails] = useState([]);
  const [underRepairEquipmentDetails, setUnderRepairEquipmentDetails] =
    useState([]);

  // State for reservation details
  const [selectedReservationDetails, setSelectedReservationDetails] = useState(
    []
  );

  // State for handle mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(
    window.innerWidth >= 480
  );

  // State to handle if is the user reservation selected (for user roles that have ability to view all reservations for approve and reject)
  const [isMyReservation, setIsMyReservation] = useState(false);

  // State variable for reservation list refresh
  const [isRefreshed, setIsRefreshed] = useState({
    approvedReservation: false,
    requestedReservation: false,
  });

  // State variable for icon modal
  const [iconModal, setIconModal] = useState({
    message: "",
    visibility: false,
    icon: HiExclamationCircle,
    isIconSpin: false,
  });

  // UpdateMobileView - To set the isMobileVIew if window.innerWidth is smaller than 480px.
  const UpdateMobileView = useCallback(() => {
    setIsMobileView(window.innerWidth <= 480);
  }, []);

  // Function to handle changes in search query
  const HandleSearchQueryChange = (propertyName, inputValue) => {
    setSearchQuery({ ...searchQuery, [propertyName]: inputValue });
  };

  // Function to triggered when equipment type summary card is clicked
  // TODO: These will be changed when there are APIs for this.
  const OnEquipmentTypeSummaryCardClick = async (selectedEquipmentType) => {
    // Set selected reservation to null
    setSelectedReservation(null);

    // Toggle the selected inventory type, await until finish setSelectedInventoryType then continue.
    await Promise.resolve(
      setSelectedInventoryType((prevSelectedEquipmentType) =>
        prevSelectedEquipmentType === selectedEquipmentType
          ? null
          : selectedEquipmentType
      )
    );

    // Set in-use and under-repair equipment details based on the selected type.
    setInUseEquipmentDetails(
      inUseEquipmentDetailsResponse[selectedEquipmentType - 1]
    );
    setUnderRepairEquipmentDetails(
      underRepairEquipmentDetailsResponse[selectedEquipmentType - 1]
    );
  };

  // FetchApproveReservation - get all the approve reservations
  const FetchApprovedReservations = () => {
    setIconModal({
      message: "Looking for approved reservations...",
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .get(`${API.domain}/api/user/${schoolId}/approved-reservation`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setIconModal({
            message: "",
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
          setApprovedReservations(response?.data?.responseObject);
        }, 1500);
      })
      .catch(() => {
        setIconModal({
          message: "There is an error occurred. Please try again.",
          icon: HiExclamationCircle,
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
          setApprovedReservations([]);
        }, 1500);
      });
  };

  // FetchRequestedReservations - get all the requested reservations
  const FetchRequestedReservations = () => {
    setIconModal({
      message: "Looking for requested reservations...",
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .get(`${API.domain}/api/user/${schoolId}/requested-reservation`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setIconModal({
            message: "",
            icon: HiExclamationCircle,
            visibility: false,
            isIconSpin: false,
          });
          setRequestedReservations(response?.data?.responseObject);
        }, 1500);
      })
      .catch(() => {
        setIconModal({
          message: "There is an error occurred. Please try again.",
          icon: HiExclamationCircle,
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
          setRequestedReservations([]);
        }, 1500);
      });
  };

  // Function triggered when reservation card is clicked
  // TODO: These will be changed when there are APIs for this.
  const OnReservationCardClick = async (selectedReservation) => {
    // Set selected inventory type to null
    setSelectedInventoryType(null);
    // Toggle the selected reservations, await until finish setSelectedReservation then continue.
    await Promise.resolve(
      setSelectedReservation((prevSelectedReservation) =>
        prevSelectedReservation === selectedReservation.reservationID
          ? null
          : selectedReservation.reservationID
      )
    );

    setSelectedReservationDetails(selectedReservation);
  };

  // Function triggered when reservation status filter button is clicked
  const OnReservationStatusFilterButtonClick = (status) => {
    setReservationsFilterStatus(status);
    setSelectedReservation(null);
  };

  // Function triggered when "Add Equipment" button is clicked - Go to Add Equipment Page
  const OnAddEquipmentClick = () => {
    navigate("/AddToInventory");
  };

  // Handle when "Reject" button is clicked for a reservation
  const OnRejectReservationClick = () => {
    // Show processing message
    setIconModal({
      message: "Processing your reservation rejection...",
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .put(
        `${API.domain}/api/user/${schoolId}/action?type=reject&id=${selectedReservation}`, {},
        {
          headers: {
            "X-API-KEY": API.key,
          },
        }
      )
      .then((response) => {
        // Show success message
        setIconModal({
          message: response?.data?.message,
          icon: HiCheck,
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
          // Filter reservations by status
          const approved = response?.data?.responseObject.filter(
            (reservation) => reservation.status === "Approved"
          );
          const requested = response?.data?.responseObject.filter(
            (reservation) => reservation.status === "Requested"
          );

          // Set filtered reservations to state variables
          setApprovedReservations(approved);
          setRequestedReservations(requested);

          setSelectedReservation(null);
          setSelectedReservationDetails([]);
        }, 1500);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
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
  };

  // Handle when "Approve" button is clicked for a reservation
  const OnApproveReservationClick = () => {
    // Show processing message
    setIconModal({
      message: "Processing your reservation approval...",
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .put(
        `${API.domain}/api/user/${schoolId}/action?type=approve&id=${selectedReservation}`, {},
        {
          headers: {
            "X-API-KEY": API.key,
          },
        }
      )
      .then((response) => {
        // Show success message
        setIconModal({
          message: response?.data?.message,
          icon: HiCheck,
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

          // Filter reservations by status
          const approved = response?.data.responseObject.filter(
            (reservation) => reservation.status === "Approved"
          );
          const requested = response?.data.responseObject.filter(
            (reservation) => reservation.status === "Requested"
          );

          // Set filtered reservations to state variables
          setApprovedReservations(approved);
          setRequestedReservations(requested);

          setSelectedReservation(null);
          setSelectedReservationDetails([]);
        }, 1500);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
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
  };

  // Handle when "Cancel" button is clicked for a reservation
  const OnCancelReservationClick = () => {
    // Show processing message
    setIconModal({
      message: "Processing your reservation cancellation...",
      icon: HiRefresh,
      visibility: true,
      isIconSpin: true,
    });

    axios
      .put(
        `${API.domain}/api/user/${schoolId}/action?type=cancel&id=${selectedReservation}`, {},
        {
          headers: {
            "X-API-KEY": API.key,
          },
        }
      )
      .then((response) => {
        // Show success message
        setIconModal({
          message: response?.data?.message,
          icon: HiCheck,
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

          // Filter reservations by status
          const approved = response?.data?.responseObject.filter(
            (reservation) => reservation.status === "Approved"
          );
          const requested = response?.data?.responseObject.filter(
            (reservation) => reservation.status === "Requested"
          );

          // Set filtered reservations to state variables
          setApprovedReservations(approved);
          setRequestedReservations(requested);

          setSelectedReservation(null);
          setSelectedReservationDetails([]);
        }, 1500);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
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
  };

  // TODO: Search APIs
  const Search = () => {
    console.log(searchQuery);
  };

  // Close detail section when clicked on the "X" icon
  const CloseDetailSection = () => {
    setSelectedInventoryType(null);
    setSelectedReservation(null);
  };

  //#region Navigations
  // Navigate to Notifications Page
  // const NavigateNotifications = () => {
  //  navigate("/Notifications");
  // };

  // Navigate to Settings Page
  const NavigateSettings = () => {
    navigate("/Settings");
  };
  // Navigate to Settings Page
  const NavigateRFIDTags = () => {
    navigate("/RFIDTags");
  };

  // Sign Out - Reset the data.
  const SignOut = () => {
    //Dispatch the resetUserData action
    resetUserData();
    navigate("/");
  };
  //#endregion

  //#region side effects
  useEffect(() => {
    // Add event listener for window resize to update mobile view
    window.addEventListener("resize", UpdateMobileView);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("resize", UpdateMobileView);
    };
  }, [UpdateMobileView]);

  useEffect(() => {
    // If in mobile view, hide right panel when no selection, show when there's a selection
    if (isMobileView) {
      if (!selectedInventoryType && !selectedReservation) {
        setIsRightPanelVisible(false);
      } else if (selectedInventoryType || selectedReservation) {
        setIsRightPanelVisible(true);
      }
    }
  }, [selectedInventoryType, selectedReservation, isMobileView]);

  // Effect to set isRefreshed to false every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshed({
        approvedReservation: false,
        requestedReservation: false,
      });
    }, 60000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Upon changing the reservationsFilterStatus, get different filter status reservations.
  useEffect(() => {
    if (reservationsFilterStatus === "Approved") {
      if (isRefreshed.approvedReservation === false) {
        FetchApprovedReservations();
        setIsRefreshed({ ...isRefreshed, approvedReservation: true });
      }
    } else if (reservationsFilterStatus === "Requested") {
      if (isRefreshed.requestedReservation === false) {
        FetchRequestedReservations();
        setIsRefreshed({ ...isRefreshed, requestedReservation: true });
      }
    }
    // eslint-disable-next-line
  }, [reservationsFilterStatus]);

  // Updating reservation list upon fetching
  useEffect(() => {
    if (reservationsFilterStatus === "Approved") {
      setReservations(approvedReservations);
    } else if (reservationsFilterStatus === "Requested") {
      setReservations(requestedReservations);
    }
  }, [approvedReservations, requestedReservations, reservationsFilterStatus]);

  // Checking if the selected reservation details is the user's
  useEffect(() => {
    if (selectedReservationDetails?.renterSchoolId === schoolId) {
      setIsMyReservation(true);
    } else {
      setIsMyReservation(false);
    }
    // eslint-disable-next-line
  }, [selectedReservationDetails]);
  //#endregion

  return (
    <GeneralPage>
      <IconModal
        className="AdminDashboard-IconModalContainer"
        icon={iconModal.icon}
        iconClassName="AdminDashboard-IconModalIcon"
        message={iconModal.message}
        isVisible={iconModal.visibility}
        isSpinning={iconModal.isIconSpin}
      />
      <div className="AdminDashboard-PageContentContainer">
        {/* Page Header - Dashboard */}
        <div className="AdminDashboard-PageHeaderContainer">
          <div className="AdminDashboard-PageHeader">
            <Logo className="AdminDashboard-LogoContainer" />
            <p className="heading-2">Dashboard</p>
          </div>
          <div className="AdminDashboard-ActionContainer">
            {/* TODO: Show Notifications Button when Implement Notification Feature */}
            {/* <IconButton
              icon={HiBell}
              className="AdminDashboard-ActionButton"
              onClick={NavigateNotifications}
            /> */}
            {/* RFID Tags Button */}
            <IconButton
              icon={HiCreditCard}
              className="AdminDashboard-ActionButton"
              onClick={NavigateRFIDTags}
            />
            {/* Settings Button */}
            <IconButton
              icon={HiCog}
              className="AdminDashboard-ActionButton"
              onClick={NavigateSettings}
            />
            {/* Sign Out Button */}
            <IconButton
              icon={HiLogout}
              className="FacultyDashboard-ActionButton"
              onClick={SignOut}
            />
          </div>
        </div>
        {/* Page Content */}
        <div className="AdminDashboard-ContentContainer">
          {/* Left Content Panel */}
          <div
            className={`AdminDashboard-LeftContentPanel ${
              isMobileView && isRightPanelVisible ? "AdminDashboard-Hide" : ""
            }`}
          >
            {/* Inventory Section */}
            <div className="AdminDashboard-InventorySection">
              {/* Section Header */}
              <div className="AdminDashboard-SectionHeader">
                {/* Title */}
                <p className="heading-5">Inventory</p>
                {/* Search Bar TODO: Implement Search Query*/}
                <SearchBarInputField
                  className="AdminDashboard-SearchBar AdminDashboard-Hide"
                  placeholder="Search type"
                  name="equipmentType"
                  value={searchQuery.equipmentType}
                  onChange={HandleSearchQueryChange}
                  onKeyDown={(e) => e.key === "Enter" && Search()}
                />
              </div>
              {/* Inventory Summary List */}
              <InventorySummaryList
                className="AdminDashboard-InventorySummaryList"
                selectedInventoryType={selectedInventoryType}
                OnEquipmentTypeSummaryCardClick={
                  OnEquipmentTypeSummaryCardClick
                }
              />
            </div>
            {/* Reservation Section */}
            <div className="AdminDashboard-ReservationSection">
              {/* Section Header */}
              <div className="AdminDashboard-SectionHeader">
                {/* Title */}
                <p className="heading-5">Reservations</p>
                {/* Filters */}
                <div className="AdminDashboard-ReservationFilterContainer">
                  <FilterButton
                    title="Approved"
                    isActive={reservationsFilterStatus === "Approved"}
                    onClick={() =>
                      OnReservationStatusFilterButtonClick("Approved")
                    }
                  />
                  <FilterButton
                    title="Requested"
                    isActive={reservationsFilterStatus === "Requested"}
                    onClick={() =>
                      OnReservationStatusFilterButtonClick("Requested")
                    }
                  />
                </div>
              </div>
              {/* Reservation List */}
              <ReservationList
                className="AdminDashboard-ReservationList"
                filterMode="upcoming"
                filterStatus={reservationsFilterStatus}
                selectedReservation={selectedReservation}
                reservations={reservations}
                OnReservationCardClick={OnReservationCardClick}
              />
            </div>
          </div>
          {/* Right Content Panel */}
          <div
            className={`AdminDashboard-RightContentPanel${
              isMobileView && isRightPanelVisible ? "Active" : ""
            }`}
          >
            <div className="AdminDashboard-RightContent">
              {!isMobileView &&
                selectedInventoryType === null &&
                selectedReservation === null && (
                  <StandardButton
                    title="Add Equipment"
                    onClick={OnAddEquipmentClick}
                    className="AdminDashboard-AddEquipmentButton"
                    icon={HiPlus}
                  />
                )}
              {selectedInventoryType && (
                <>
                  <DetailSection
                    className="AdminDashboard-InUseSection"
                    title="In Use"
                    equipmentDetails={inUseEquipmentDetails}
                    actionIcon={isMobileView ? HiX : null}
                    action={CloseDetailSection}
                  />
                  <DetailSection
                    className="AdminDashboard-UnderRepairSection"
                    title="Under Repair"
                    equipmentDetails={underRepairEquipmentDetails}
                    isMargin={true}
                  />
                </>
              )}
              {selectedReservation && (
                <>
                  <DetailSection
                    className="AdminDashboard-ReservationDetailSection"
                    title="Reservation Details"
                    additionalInformation={`${selectedReservationDetails?.formattedStartDate} - ${selectedReservationDetails?.formattedEndDate}`}
                    equipmentDetails={selectedReservationDetails?.details}
                    actionIcon={isMobileView ? HiX : null}
                    action={CloseDetailSection}
                    detailsType="reservation"
                  />
                  {reservationsFilterStatus === "Requested" && (
                    <div className="AdminDashboard-ReservationActionContainer">
                      <StandardButton
                        title={"Approve"}
                        onClick={OnApproveReservationClick}
                        className="AdminDashboard-ReservationActionButton"
                        icon={HiCheck}
                      />
                      <StandardButton
                        title={"Reject"}
                        onClick={OnRejectReservationClick}
                        className="AdminDashboard-ReservationActionButton"
                        icon={HiX}
                      />
                    </div>
                  )}
                  {reservationsFilterStatus === "Approved" &&
                    isMyReservation && (
                      <div className="AdminDashboard-ReservationActionContainer">
                        <StandardButton
                          title={"Cancel"}
                          onClick={OnCancelReservationClick}
                          className="FacultyDashboard-ReservationActionButton"
                          icon={HiMinusCircle}
                        />
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </GeneralPage>
  );
}

// Define the prop types of the component
AdminDashboard.propTypes = {
  resetUserData: PropTypes.func.isRequired,
  schoolId: PropTypes.string,
};

// Define defaultProps for the component
AdminDashboard.defaultProps = {
  schoolId: "",
};

// Map the userRole and schoolId from Redux store to props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Define the actions to be mapped to props
const mapDispatchToProps = {
  resetUserData,
};

// Exports the AdminDashboard component as the default export for the AdminDashboard module.
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
