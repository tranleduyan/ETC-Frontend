// Import Components
import React from "react";
import GeneralPage from "../GeneralPage/GeneralPage";

// Import Stylings
import "./SettingsPage.css";

// Import Icons
import { HiExclamation } from "react-icons/hi";

// Define SettingsPage Component
function SettingsPage() {
  return (
    <GeneralPage>
      <div className="SettingsPage-UnavailableFeature">
        <HiExclamation className="SettingsPage-UnavailableFeatureIcon" />
        <p className="paragraph-1">The feature is currently unavailable.</p>
      </div>
    </GeneralPage>
  );
}

// Exports the SettingsPage component as the default export for the SettingsPage module.
export default SettingsPage;
