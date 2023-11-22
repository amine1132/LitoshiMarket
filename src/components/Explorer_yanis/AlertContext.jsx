// AlertContext.js
import React, { createContext, useContext, useReducer } from "react";

const AlertContext = createContext();

const initialState = {
  alerts: [],
};

const alertReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ALERT":
      return {
        ...state,
        alerts: [...state.alerts, action.alert],
      };
    default:
      return state;
  }
};

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
};

export { AlertProvider, useAlerts };
