//#region Import Necessary Dependencies
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { API } from "../../Constants";
//#endregion

//#region Import Stylings
import "./RFIDTagsPage.css";
//#endregion

//#region Import UI Components
import GeneralPage from "../GeneralPage/GeneralPage";
import UnauthorizedPanel from "../../Components/Panels/UnauthorizedPanel/UnauthorizedPanel";
import Logo from "../../Components/Logo/Logo";
import HeaderButton from "../../Components/Buttons/HeaderButton/HeaderButton";
import EquipmentRFIDTagsList from "../../Components/Lists/EquipmentRFIDTagsList";
import UserRFIDTagsList from "../../Components/Lists/UserRFIDTagsList/UserRFIDTagsList";
//#endregion

// Define RFIDTagsPage Component
function RFIDTagsPage(props) {
  // Extract necessary props
  const { userRole } = props;

  // State for current section of the page
  const [currentSection, setCurrentSection] = useState("Equipment");

  const [equipmentTags, setEquipmentTags] = useState([]);
  const [userTags, setUserTags] = useState([]);

  const [availableTagID, setAvailableTagID] = useState({
    equipment: "",
    user: "",
  });

  // State variable for refresh
  const [isRefreshed, setIsRefreshed] = useState(false);

  // FetchAllTags - Fetch all equipment and user tags
  const FetchAllTags = () => {
    axios
      .get(`${API.domain}/api/inventory/rfid-tags`, {
        headers: {
          "X-API-KEY": API.key,
        },
      })
      .then((response) => {
        const responseObject = response?.data?.responseObject;
        setIsRefreshed(true);
        setEquipmentTags(responseObject?.equipment);
        setUserTags(responseObject.users);
        setAvailableTagID({
          equipment: responseObject?.availableEquipmentTagId,
          user: responseObject?.availableUserTagId,
        });
        console.log(responseObject?.availableEquipmentTagId);
        console.log(responseObject);
      })
      .catch(() => {
        setIsRefreshed(true);
        setEquipmentTags([]);
        setUserTags([]);
        setAvailableTagID({
          equipment: "",
          user: "",
        });
      });
  };

  // Effect to set isRefreshed to false every 5 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshed(false);
    }, 300000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isRefreshed) {
      FetchAllTags();
      setIsRefreshed(true);
    }
  }, [isRefreshed]);

  return (
    <>
      {userRole === "Admin" ? (
        <GeneralPage>
          <div className="RFIDTagsPage-PageContentContainer">
            {/* Page Header - RFID Tags */}
            <div className="RFIDTagsPage-PageHeaderContainer">
              <Logo className="RFIDTagsPage-LogoContainer" />
              <p className="heading-2">RFID Tags</p>
            </div>
            {/* Page Content */}
            <div className="RFIDTagsPage-ContentContainer">
              {/* Content Header Container */}
              <div className="RFIDTagsPage-ContentHeaderContainer">
                {/* Header Container */}
                <div className="RFIDTagsPage-HeaderContainer">
                  {/* Equipment Tab */}
                  <HeaderButton
                    title="Equipment"
                    isSelected={currentSection === "Equipment"}
                    onClick={() => setCurrentSection("Equipment")}
                  />
                  {/* Users Tab */}
                  <HeaderButton
                    title="Users"
                    isSelected={currentSection === "Users"}
                    onClick={() => setCurrentSection("Users")}
                  />
                </div>
              </div>
              <div className="RFIDTagsPage-Content">
                {(currentSection === "Equipment" ||
                  currentSection === "Users") && (
                  <>
                    <p className="paragraph-1">
                      <span className="heading-5">
                        Suggested Available Tag ID:
                      </span>{" "}
                      {currentSection === "Equipment"
                        ? (availableTagID?.equipment ? availableTagID?.equipment : "N/A")
                        : (availableTagID?.user ? availableTagID?.user : "N/A")}
                    </p>
                    {currentSection === "Equipment" && (
                      <EquipmentRFIDTagsList
                        rfidTags={equipmentTags}
                        className="RFIDTagsPage-RFIDTagsList"
                      />
                    )}
                    {currentSection === "Users" && (
                      <UserRFIDTagsList
                        rfidTags={userTags}
                        className="RFIDTagsPage-RFIDTagsList"
                      />
                    )}
                  </>
                )}
                {/* Suggested Available Tag ID */}
              </div>
            </div>
          </div>
        </GeneralPage>
      ) : (
        <UnauthorizedPanel />
      )}
    </>
  );
}

// Define propTypes for RFIDTagsPage
RFIDTagsPage.propTypes = {
  userRole: PropTypes.string,
};

// Define defaultProps for RFIDTagsPage
RFIDTagsPage.defaultProps = {
  userRole: "",
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Exports the RFIDTagsPage component as the default export for the RFIDTagsPage module.
export default connect(mapStateToProps)(RFIDTagsPage);
