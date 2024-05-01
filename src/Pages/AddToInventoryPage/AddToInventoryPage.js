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
//#endregion

//#region Import Icons
import {
  HiSwitchHorizontal,
  HiCheckCircle,
  HiPlus,
  HiDocumentText,
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

  // Equipment form error state and error message
  const [equipmentIsError, setEquipmentIsError] = useState(false);
  const [equipmentErrorMessage, setEquipmentErrorMessage] = useState("");

  // Type form error state and error message
  const [typeIsError, setTypeIsError] = useState(false);
  const [typeErrorMessage, setTypeErrorMessage] = useState("");

  // Model form error state and error message
  const [modelIsError, setModelIsError] = useState(false);
  const [modelErrorMessage, setModelErrorMessage] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isTypeFetched, setIsTypeFetched] = useState(false);

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
      homeLocation: null,
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
            homeLocation: null,
            condition: "",
            purchaseCost: "",
            purchaseDate: null,
          });

          // Reset the model options
          setEquipmentModelOptions([]);
        })
        .catch((error) => {
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setEquipmentIsError(true);
          setEquipmentErrorMessage(error.response.data.message);
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
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setTypeIsError(true);
          setTypeErrorMessage(error.response.data.message);
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
          setIsLoading(false);
          setModalVisibility(false);
          setModalMessage("");
          setModelIsError(true);
          setModelErrorMessage(error.response.data.message);
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
  //#endregion

  //#region Helpers
  const FetchAllTypeOptions = () => {
    // HTTP get request to fetch all the type
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
        // Type not found, reset type options and models, model options as well as the model photo
        setEquipmentTypeOptions([]);
      });
  };
  //#endregion

  //#region Side Effects
  // Fetch all types upon component mounting
  useEffect(() => {
    FetchAllTypeOptions();
  }, []);

  // Conditionally fetched type if there is new type added but not fetched yet.
  useEffect(() => {
    if (isTypeFetched === false) {
      FetchAllTypeOptions();
      setIsTypeFetched(true);
    }
  }, [isTypeFetched]);

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
                      <StandardButton
                        title="Import"
                        onClick={ImportEquipment}
                        className="AddToInventoryPage-ImportEquipmentButton"
                        icon={HiDocumentText}
                      />
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
