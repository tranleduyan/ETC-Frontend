// Import Components
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./storage";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";

// Create a root to use ReactDOM.createRoot to render the application into the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main application wrapped with Redux Provider and PersistGate for state management
root.render(
  <Provider store={store}>
    {/* PersistGate delays the rendering until the persisted state is retrieved */}
    <PersistGate loading={null} persistor={persistor}>
      {/* StrictMode helps catch common mistakes and bad practices */}
      <React.StrictMode>
        {/* App is the main component of the application */}
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
