// Import Components
import React from "react";
import GeneralPage from "../GeneralPage/GeneralPage";

// Import Stylings
import "./NotificationsPage.css";

// Import Icons
import { HiExclamation } from "react-icons/hi";

// Define NotificationPage Component
function NotificationsPage() {
  return (
    <GeneralPage>
      <div className="NotificationsPage-UnavailableFeature">
        <HiExclamation className="NotificationsPage-UnavailableFeatureIcon" />
        <p className="paragraph-1">The feature is currently unavailable.</p>
      </div>
    </GeneralPage>
  );
}

// Exports the NotificationsPage component as the default export for the NotificationsPage module.
export default NotificationsPage;
