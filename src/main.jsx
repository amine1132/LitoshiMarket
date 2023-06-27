import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboard from "./dashboard/Dashboard.jsx";
import Routerv2 from "./Route";
import Explorer from "./dashboard/Explorer/Explorer";
import Inscription from "./Inscription/Inscription";
import Inscription2 from "./inscription2/Inscription2";
import Inscription3 from "./inscription3/Inscription3";
import Inscription4 from "./inscription4/Inscription4";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routerv2 />
  </React.StrictMode>
);
