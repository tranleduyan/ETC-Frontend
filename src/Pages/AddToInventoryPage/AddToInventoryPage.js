//#region Import Necessary Dependencies
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { API, MESSAGE, OPTIONS } from "../../Constants";
import { resetUserData } from "../../storage";
//#endregion

// Import Stylings
import "./AddToInventoryPage.css";

//#region Import UI Components
import GeneralPage from "../GeneralPage/GeneralPage";
import IconModal from "../../Components/Modals/IconModal/IconModal";
import Logo from "../../Components/Logo/Logo";
import HeaderButton from "../../Components/Buttons/HeaderButton/HeaderButton";
import StandardButton from "../../Components/Buttons/StandardButton/StandardButton";
import EquipmentForm from "../../Components/Forms/EquipmentForm/EquipmentForm";
import TypeForm from "../../Components/Forms/TypeForm/TypeForm";
import ModelForm from "../../Components/Forms/ModelForm";
import UnauthorizedPanel from "../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel";
import LocationForm from "../../Components/Forms/LocationForm";
import RFIDAntennaForm from "../../Components/Forms/RFIDAntennaForm/RFIDAntennaForm";
//#endregion

//#region Import Icons
import {
  HiSwitchHorizontal,
  HiCheckCircle,
  HiPlus,
  HiDocumentText,
  HiStatusOnline,
  HiLocationMarker,
} from "react-icons/hi";
//#endregion

// Define AddEquipmentPage Component
function AddToInventoryPage(props) {
  // Extract relevant information
  const { userRole, schoolId } = props;

  const { state } = useLocation();
  const { section } = state || {};

  // Section State of the page - Equipment, Type, Model tabs
  const [currentSection, setCurrentSection] = useState(
    !section ? "Equipment" : section
  );

  // Contains all the equipment models information
  const [equipmentModels, setEquipmentModels] = useState([]);

  // Options for equipment models dropdowns
  const [equipmentModelOptions, setEquipmentModelOptions] = useState([]);

  // Options for equipment types dropdowns
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState([]);

  // Options for locations dropdowns
  const [locationOptions, setLocationOptions] = useState([]);

  // Equipment form error state and error message
  const [equipmentIsError, setEquipmentIsError] = useState(false);
  const [equipmentErrorMessage, setEquipmentErrorMessage] = useState("");

  // Type form error state and error message
  const [typeIsError, setTypeIsError] = useState(false);
  const [typeErrorMessage, setTypeErrorMessage] = useState("");

  // Model form error state and error message
  const [modelIsError, setModelIsError] = useState(false);
  const [modelErrorMessage, setModelErrorMessage] = useState("");

  // RFID Antenna form error state and error message
  const [rfidAntennaIsError, setRFIDAntennaIsError] = useState(false);
  const [rfidAntennaErrorMessage, setRFIDAntennaErrorMessage] = useState("");

  // Location form error state and error message
  const [locationIsError, setLocationIsError] = useState(false);
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isTypeFetched, setIsTypeFetched] = useState(false);
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  // #region Addition Information
  // Information for adding equipment
  const [equipmentAdditionInformation, setEquipmentAdditionInformation] =
    useState({
      serialNumber: "",
      type: null,
      model: null,
      maintenanceStatus: "",
      reservationStatus: OPTIONS.equipment.reservationStatus.find(
        (status) => status.value === "Available"
      ),
      rfidTag: "",
      homeLocations: [],
      condition: "",
      purchaseCost: "",
      purchaseDate: null,
    });

  // Information for adding type
  const [typeAdditionInformation, setTypeAdditionInformation] = useState({
    name: "",
  });

  // Information for adding model
  const [modelAdditionInformation, setModelAdditionInformation] = useState({
    name: "",
    type: null,
    photo: null,
  });

  // Information for adding RFID antenna
  const [rfidAntennaAdditionInformation, setRFIDAntennaAdditionInformation] =
    useState({
      id: "",
      location: null,
    });

  // Information for adding location
  const [locationAdditionInformation, setLocationAdditionInformation] =
    useState({
      name: "",
    });

  // #endregion

  // Add Equipment - Add the equipment to the database.
  const AddEquipment = () => {
    if (IsEquipmentFormValid()) {
      setModalMessage("Adding to inventory...");
      setIsLoading(true);

      const requestBody = {
        schoolId: schoolId,
        serialId: equipmentAdditionInformation.serialNumber,
        typeId: equipmentAdditionInformation.type.value,
        modelId: equipmentAdditionInformation.model.value,
        maintenanceStatus: equipmentAdditionInformation.maintenanceStatus.value,
        reservationStatus: equipmentAdditionInformation.reservationStatus.value,
        usageCondition: equipmentAdditionInformation.condition.value,
        purchaseCost: parseFloat(equipmentAdditionInformation.purchaseCost),
        purchaseDate: equipmentAdditionInformation.purchaseDate
          ? new Date(equipmentAdditionInformation.purchaseDate)
              .toISOString()
              .split("T")[0]
          : null,
        homeLocations: equipmentAdditionInformation.homeLocations.map(
          (location) => location.value
        ),
      };

      axios
        .post(`${API.domain}/api/inventory/equipment`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then(() => {
          setIsLoading(false);

          setModalMessage(MESSAGE.successEquipmentAddition);
          setModalVisibility(true);

          // Automatically hide the modal after 3 seconds
          setTimeout(() => {
            setModalVisibility(false);
            setModalMessage("");
          }, 1500);

          // Reset the information
          setEquipmentAdditionInformation({
            serialNumber: "",
            type: null,
            model: null,
            maintenanceStatus: "",
            reservationStatus: OPTIONS.equipment.reservationStatus.find(
              (status) => status.value === "Available"
            ),
            rfidTag: "",
            homeLocations: [],
            condition: "",
            purchaseCost: "",
            purchaseDate: null,
          });

          // Reset the model options
          setEquipmentModelOptions([]);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again.";
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setEquipmentIsError(true);
          setEquipmentErrorMessage(errorMessage);
        });
    }
  };

  // TODO: Import Equipment - Import CSV and add the content to the database
  const ImportEquipment = () => {
    console.log("Import Equipment");
  };

  // Add Type - Add the type to the database
  const AddType = () => {
    if (IsTypeFormValid()) {
      setModalMessage("Adding to inventory...");
      setIsLoading(true);

      const requestBody = {
        schoolId: schoolId,
        equipmentTypeName: typeAdditionInformation.name,
      };

      // HTTP post request to post the request body
      axios
        .post(`${API.domain}/api/inventory/types`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then(() => {
          setIsLoading(false);

          setModalMessage(MESSAGE.successTypeAddition);
          setModalVisibility(true);

          // Automatically hide the modal after 3 seconds
          setTimeout(() => {
            setModalVisibility(false);
            setModalMessage("");
          }, 1500);

          // Reset the field.
          setTypeAdditionInformation({
            name: "",
          });

          setIsTypeFetched(false);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again.";
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setTypeIsError(true);
          setTypeErrorMessage(errorMessage);
        });
    }
  };

  // Add Model - Add the model to the database
  const AddModel = () => {
    if (IsModelFormValid()) {
      setModalMessage("Adding to inventory...");
      setIsLoading(true);

      // Form data to submit the image
      const formData = new FormData();

      // Append necessary information to the form data
      formData.append("modelName", modelAdditionInformation.name);
      formData.append("typeId", modelAdditionInformation.type.value);
      formData.append("image", modelAdditionInformation.photo);
      formData.append("schoolId", schoolId);

      // HTTP post request to post the form data
      axios
        .post(`${API.domain}/api/inventory/models`, formData, {
          headers: {
            "X-API-KEY": API.key,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setIsLoading(false);

          setModalMessage(MESSAGE.successModelAddition);
          setModalVisibility(true);

          // Automatically hide the modal after 3 seconds
          setTimeout(() => {
            setModalVisibility(false);
            setModalMessage("");
          }, 1500);
          // Reset the information
          setModelAdditionInformation({
            name: "",
            type: null,
            photo: null,
          });
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again.";
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setModelIsError(true);
          setModelErrorMessage(errorMessage);
        });
    }
  };

  // AddLocation - Add the location name to the database
  const AddLocation = () => {
    if (IsLocationFormValid()) {
      setModalMessage("Adding the location...");
      setIsLoading(true);

      const requestBody = {
        schoolId: schoolId,
        locationName: locationAdditionInformation.name,
      };

      // HTTP post request to post the request body
      axios
        .post(`${API.domain}/api/location/create`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then(() => {
          setIsLoading(false);

          setModalMessage(MESSAGE.successLocationAddition);
          setModalVisibility(true);

          // Automatically hide the modal after 3 seconds
          setTimeout(() => {
            setModalVisibility(false);
            setModalMessage("");
          }, 1500);

          // Reset the field.
          setLocationAdditionInformation({
            name: "",
          });

          setIsLocationFetched(false);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again.";
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setLocationIsError(true);
          setLocationErrorMessage(errorMessage);
        });
    }
  };

  // AddRFIDAntenna - Add the rfid antenna id to the database with the location
  const AddRFIDAntenna = () => {
    if (IsRFIDAntennaFormValid()) {
      setModalMessage("Adding to inventory...");
      setIsLoading(true);

      const requestBody = {
        schoolId: schoolId,
        antennaId: rfidAntennaAdditionInformation.id,
        locationId: rfidAntennaAdditionInformation.location?.value,
      };

      axios
        .post(`${API.domain}/api/inventory/antenna/create`, requestBody, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then(() => {
          setIsLoading(false);

          setModalMessage(MESSAGE.successRFIDAntennaAddition);
          setModalVisibility(true);

          // Automatically hide the modal after 3 seconds
          setTimeout(() => {
            setModalVisibility(false);
            setModalMessage("");
          }, 1500);

          // Reset the field
          setRFIDAntennaAdditionInformation({
            id: "",
            location: null,
          });
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again.";
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setRFIDAntennaIsError(true);
          setRFIDAntennaErrorMessage(errorMessage);
        });
    }
  };

  //#region  Form Validation
  // IsEquipmentFormValid - Check for form validation
  const IsEquipmentFormValid = () => {
    if (!equipmentAdditionInformation.serialNumber) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage("Please enter the equipment serial number.");
      return false;
    }

    if (!equipmentAdditionInformation.type) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage("Please enter the equipment type.");
      return false;
    }

    if (!equipmentAdditionInformation.model) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage("Please enter the equipment model.");
      return false;
    }

    if (!equipmentAdditionInformation.maintenanceStatus) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage("Please select the maintenance status.");
      return false;
    }

    if (!equipmentAdditionInformation.reservationStatus) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage("Please select the reservation status.");
      return false;
    }

    if (!equipmentAdditionInformation.condition) {
      setEquipmentIsError(true);
      setEquipmentErrorMessage("Please select the equipment condition.");
      return false;
    }

    if (equipmentIsError) {
      setEquipmentIsError(false);
      setEquipmentErrorMessage("");
    }

    return true;
  };

  // IsTypeFormValid - Check for form validation
  const IsTypeFormValid = () => {
    if (!typeAdditionInformation.name) {
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

  // IsModelFormValid - Check for form validation
  const IsModelFormValid = () => {
    if (!modelAdditionInformation.name) {
      setModelIsError(true);
      setModelErrorMessage("Please enter the model name.");
      return false;
    }

    if (!modelAdditionInformation.type) {
      setModelIsError(true);
      setModelErrorMessage("Please select the model type.");
      return false;
    }

    if (!modelAdditionInformation.photo) {
      setModelIsError(true);
      setModelErrorMessage("Please upload the model photo.");
      return false;
    }

    if (modelIsError) {
      setModelIsError(false);
      setModelErrorMessage("");
    }

    return true;
  };

  // IsLocationFormValid - Check for form validation
  const IsLocationFormValid = () => {
    if (!locationAdditionInformation.name) {
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

  // IsRFIDAntennaFormValid - Check for form validation
  const IsRFIDAntennaFormValid = () => {
    if (!rfidAntennaAdditionInformation.id) {
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
  //#endregion

  //#region Helpers
  const FetchAllTypeOptions = () => {
    // HTTP get request to fetch all the type options
    axios
      .get(`${API.domain}/api/inventory/types`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        // Map value and label
        const options = response.data.responseObject.map((type) => ({
          value: type.typeId,
          label: type.typeName,
        }));

        // Set the options
        setEquipmentTypeOptions(options);
      })
      .catch(() => {
        // Type not found, reset type options
        setEquipmentTypeOptions([]);
      });
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
  //#endregion

  //#region Side Effects
  // Fetch all types upon component mounting
  useEffect(() => {
    FetchAllTypeOptions();
    FetchAllLocationOptions();
  }, []);

  // Conditionally fetched type if there is new type added but not fetched yet.
  useEffect(() => {
    if (isTypeFetched === false) {
      FetchAllTypeOptions();
      setIsTypeFetched(true);
    }
  }, [isTypeFetched]);

  // Conditionally fetched location options if there is new location added but not fetched yet.
  useEffect(() => {
    if (isLocationFetched === false) {
      FetchAllLocationOptions();
      setIsLocationFetched(true);
    }
  }, [isLocationFetched]);

  // Fetch all the equipment models of a selected type.
  useEffect(() => {
    // If the equipment type is selected, fetch all the equipment models of a selected type
    if (equipmentAdditionInformation.type != null) {
      // HTTP get request to fetch all the models of a selected type.
      axios
        .get(
          `${API.domain}/api/inventory/types/${equipmentAdditionInformation.type.value}/models`,
          {
            headers: {
              "X-API-KEY": API.key,
            },
          }
        )
        .then((response) => {
          // Map value and label
          const options = response.data.responseObject?.map((model) => ({
            value: model.modelId,
            label: model.modelName,
          }));

          // Set the equipmentModels to the response object - Array of all models of a type
          setEquipmentModels(response.data.responseObject);

          // Set the equipmentModelOptions to options
          setEquipmentModelOptions(options);
        })
        .catch((error) => {
          // If not found, reset to empty equipment models and options
          if (error.response.status === 404) {
            setEquipmentModels([]);
            setEquipmentModelOptions([]);
          }
        });
    }

    // Reset the model information and model photo whenever the type is changed/updated
    setEquipmentAdditionInformation({
      ...equipmentAdditionInformation,
      model: null,
    });
    // eslint-disable-next-line
  }, [equipmentAdditionInformation.type]);
  //#endregion

  return (
    <>
      {userRole === "Admin" ? (
        <GeneralPage>
          <IconModal
            className="AddToInventoryPage-ModalContainer"
            icon={isLoading ? HiSwitchHorizontal : HiCheckCircle}
            iconClassName="AddToInventoryPage-ModalIcon"
            message={modalMessage}
            isVisible={modalVisibility || isLoading}
          />
          <div className="AddToInventoryPage-PageContentContainer">
            {/* Page Header - Add to Inventory */}
            <div className="AddToInventoryPage-PageHeaderContainer">
              <Logo className="AddToInventoryPage-LogoContainer" />
              <p className="heading-2">Add to Inventory</p>
            </div>
            {/* Page Content */}
            <div className="AddToInventoryPage-ContentContainer">
              {/* Content Header Container */}
              <div className="AddToInventoryPage-ContentHeaderContainer">
                {/* Header Container */}
                <div className="AddToInventoryPage-HeaderContainer">
                  {/* Equipment Tab Button */}
                  <HeaderButton
                    title="Equipment"
                    isSelected={currentSection === "Equipment"}
                    onClick={() => setCurrentSection("Equipment")}
                  />
                  {/* Type Tab Button */}
                  <HeaderButton
                    title="Type"
                    isSelected={currentSection === "Type"}
                    onClick={() => setCurrentSection("Type")}
                  />
                  {/* Model Tab Button */}
                  <HeaderButton
                    title="Model"
                    isSelected={currentSection === "Model"}
                    onClick={() => setCurrentSection("Model")}
                  />
                  {/* RFID Antenna Tab Button */}
                  <HeaderButton
                    className="AddToInventoryPage-MiscHeaderButton"
                    title="RFID Antenna"
                    isSelected={currentSection === "RFID Antenna"}
                    onClick={() => setCurrentSection("RFID Antenna")}
                  />
                  {/* Mobile RFID Antenna Tab Button */}
                  <HeaderButton
                    className="AddToInventoryPage-MobileMiscHeaderButton"
                    title=""
                    isSelected={currentSection === "RFID Antenna"}
                    onClick={() => setCurrentSection("RFID Antenna")}
                    icon={HiStatusOnline}
                  />
                  {/* Location Tab Button */}
                  <HeaderButton
                    title="Location"
                    className="AddToInventoryPage-MiscHeaderButton"
                    isSelected={currentSection === "Location"}
                    onClick={() => setCurrentSection("Location")}
                  />
                  {/* Mobile Location Tab Button */}
                  <HeaderButton
                    title=""
                    className="AddToInventoryPage-MobileMiscHeaderButton"
                    isSelected={currentSection === "Location"}
                    onClick={() => setCurrentSection("Location")}
                    icon={HiLocationMarker}
                  />
                </div>
                {/* Action Container */}
                <div className="AddToInventoryPage-ActionContainer">
                  {/* If equipment tab, display Add Equipment and Import buttons */}
                  {currentSection === "Equipment" && (
                    <>
                      <StandardButton
                        title="Add Equipment"
                        onClick={AddEquipment}
                        className="AddToInventoryPage-AddButton"
                        icon={HiPlus}
                      />
                      {/* Import Equipment can be displayed when the feature import is ready */}
                      {/* <StandardButton
                        title="Import"
                        onClick={ImportEquipment}
                        className="AddToInventoryPage-ImportEquipmentButton"
                        icon={HiDocumentText}
                  /> */}
                    </>
                  )}
                  {/* If type tab, display Add Type Button */}
                  {currentSection === "Type" && (
                    <StandardButton
                      title="Add Type"
                      onClick={AddType}
                      className="AddToInventoryPage-AddButton"
                      icon={HiPlus}
                    />
                  )}
                  {/* If model tab, display Add Model button */}
                  {currentSection === "Model" && (
                    <StandardButton
                      title="Add Model"
                      onClick={AddModel}
                      className="AddToInventoryPage-AddButton"
                      icon={HiPlus}
                    />
                  )}
                  {/* If RFID Antenna tab, display Add Antenna Button */}
                  {currentSection === "RFID Antenna" && (
                    <StandardButton
                      title="Add Antenna"
                      onClick={AddRFIDAntenna}
                      className="AddToInventoryPage-AddButton"
                      icon={HiPlus}
                    />
                  )}
                  {/* If location tab, display Add Location Button */}
                  {currentSection === "Location" && (
                    <StandardButton
                      title="Add Location"
                      onClick={AddLocation}
                      className="AddToInventoryPage-AddButton"
                      icon={HiPlus}
                    />
                  )}
                </div>
              </div>
              {/* Equipment Tab */}
              {currentSection === "Equipment" && (
                <>
                  {/* Equipment Form */}
                  <EquipmentForm
                    equipmentInformation={equipmentAdditionInformation}
                    setEquipmentInformation={setEquipmentAdditionInformation}
                    isError={equipmentIsError}
                    errorMessage={equipmentErrorMessage}
                    equipmentModels={equipmentModels}
                    equipmentModelOptions={equipmentModelOptions}
                    equipmentTypeOptions={equipmentTypeOptions}
                    disableReservationStatus={true}
                    equipmentHomeLocationOptions={locationOptions}
                  />
                  {/* Mobile Add Equipment Button */}
                  <StandardButton
                    title="Add Equipment"
                    onClick={AddEquipment}
                    className="AddToInventoryPage-MobileAddButton"
                    icon={HiPlus}
                  />
                </>
              )}
              {/* Type Tab */}
              {currentSection === "Type" && (
                <>
                  {/* Type Addition Form */}
                  <TypeForm
                    typeInformation={typeAdditionInformation}
                    setTypeInformation={setTypeAdditionInformation}
                    isError={typeIsError}
                    errorMessage={typeErrorMessage}
                  />
                  {/* Mobile Add Type Button */}
                  <StandardButton
                    title="Add Type"
                    onClick={AddType}
                    className="AddToInventoryPage-MobileAddButton"
                    icon={HiPlus}
                  />
                </>
              )}
              {/* Model Tab */}
              {currentSection === "Model" && (
                <>
                  {/* Model Addition Form */}
                  <ModelForm
                    modelInformation={modelAdditionInformation}
                    setModelInformation={setModelAdditionInformation}
                    isError={modelIsError}
                    errorMessage={modelErrorMessage}
                    equipmentTypeOptions={equipmentTypeOptions}
                  />
                  {/* Mobile Add Model Button */}
                  <StandardButton
                    title="Add Model"
                    onClick={AddModel}
                    className="AddToInventoryPage-MobileAddButton"
                    icon={HiPlus}
                  />
                </>
              )}
              {/* RFID Antenna Tab */}
              {currentSection === "RFID Antenna" && (
                <>
                  {/* Location Addition Form */}
                  <RFIDAntennaForm
                    rfidAntennaInformation={rfidAntennaAdditionInformation}
                    setRFIDAntennaInformation={
                      setRFIDAntennaAdditionInformation
                    }
                    isError={rfidAntennaIsError}
                    errorMessage={rfidAntennaErrorMessage}
                    locationOptions={locationOptions}
                  />
                  {/* Mobile Add Model Button */}
                  <StandardButton
                    title="Add Antenna"
                    onClick={AddRFIDAntenna}
                    className="AddToInventoryPage-MobileAddButton"
                    icon={HiPlus}
                  />
                </>
              )}
              {/* Location Tab */}
              {currentSection === "Location" && (
                <>
                  {/* Location Addition Form */}
                  <LocationForm
                    locationInformation={locationAdditionInformation}
                    setLocationInformation={setLocationAdditionInformation}
                    isError={locationIsError}
                    errorMessage={locationErrorMessage}
                  />
                  {/* Mobile Add Model Button */}
                  <StandardButton
                    title="Add Location"
                    onClick={AddLocation}
                    className="AddToInventoryPage-MobileAddButton"
                    icon={HiPlus}
                  />
                </>
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

// Define PropTypes of the component
AddToInventoryPage.propTypes = {
  userRole: PropTypes.string,
  schoolId: PropTypes.string,
};

// Define defaultProps of the component
AddToInventoryPage.defaultProps = {
  userRole: "",
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

// Exports the AddToInventoryPage component as the default export for the AddToInventoryPage module.
export default connect(mapStateToProps, mapDispatchToProps)(AddToInventoryPage);
