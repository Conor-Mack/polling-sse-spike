import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App"; // Assuming you will create an App component

// Create the root and render the React app
const root = ReactDOM.createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
