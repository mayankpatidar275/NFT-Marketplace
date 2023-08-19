import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { BlockchainProvider } from './context/BlockchainContext';

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

ReactDOM.render(
  <React.StrictMode>
    <BlockchainProvider>
      <Router>
        <App />
      </Router>
    </BlockchainProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
