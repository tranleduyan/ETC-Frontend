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
  const { userRole, schoolId } = props;

  // State for current section of the page
  const [currentSection, setCurrentSection] = useState("Equipment");

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
                {/* Suggested Available Tag ID */}
                <p className="paragraph-1">
                  <span className="heading-5">Suggested Available Tag ID:</span>{" "}
                  0015
                </p>
                {currentSection === "Equipment" && (
                  <EquipmentRFIDTagsList
                    rfidTags={[
                      {
                        serialId: "AIGFB@76",
                        tagId: "0010",
                        type: "Barometer",
                        model: "JINYISI",
                      },
                    ]}
                    className="RFIDTagsPage-RFIDTagsList"
                  />
                )}
                {currentSection === "Users" && (
                  <UserRFIDTagsList
                    rfidTags={[
                      {
                        schoolId: "800187222",
                        tagId: "1012",
                        firstName: "James",
                        lastName: "Smith",
                        middleName: "",
                      },
                    ]}
                    className="RFIDTagsPage-RFIDTagsList"
                  />
                )}
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
  schoolId: PropTypes.string,
};

// Define defaultProps for RFIDTagsPage
RFIDTagsPage.defaultProps = {
  userRole: "",
  schoolId: "",
};

// Map from Redux state to component props
const mapStateToProps = (state) => ({
  userRole: state.user.userData?.userRole,
  schoolId: state.user.userData?.schoolId,
});

// Exports the RFIDTagsPage component as the default export for the RFIDTagsPage module.
export default connect(mapStateToProps)(RFIDTagsPage);
