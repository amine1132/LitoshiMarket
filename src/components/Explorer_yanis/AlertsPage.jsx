// AlertsPage.js
import React from "react";
import { useAlerts } from "./AlertContext";

const AlertsPage = () => {
  const { state } = useAlerts();

  return (
    <div>
      <h2>Alerts Page</h2>
      <ul>
        {state.alerts.map((alert, index) => (
          <li key={index}>
            Price: {alert.price}, Condition: {alert.condition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPage;
