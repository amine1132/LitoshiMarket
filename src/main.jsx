import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboardv2 from "./dashboard/Dashboardv2";
import "./styles/Global.css";

//  Middlewares
// ===========================================================

import { Provider } from "react-redux";
import { store } from "./stores/store";
//import './services/i18n'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback="...loading">
        <Dashboardv2 />
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
