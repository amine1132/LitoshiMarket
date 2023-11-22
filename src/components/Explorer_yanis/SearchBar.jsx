// AlertModal.js
import React, { useState } from "react";
import { useAlerts } from "./AlertContext";

const AlertModal = () => {
  const { dispatch } = useAlerts();
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("increase");

  const handleAlertCreation = () => {
    const alert = { price, condition };
    dispatch({ type: "ADD_ALERT", alert }); // Assurez-vous d'ajouter l'alerte via le contexte
    setPrice("");
    setCondition("increase");
  };

  return (
    <div>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
      />
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option value="increase">Increase</option>
        <option value="decrease">Decrease</option>
      </select>
      <button onClick={handleAlertCreation}>Create Alert</button>
    </div>
  );
};
export default AlertModal;
