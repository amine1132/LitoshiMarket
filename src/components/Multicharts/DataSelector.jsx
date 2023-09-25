// DataSelector.js
import React, { useState } from "react";

const DataSelector = ({ onTypeChange }) => {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    onTypeChange(newType);
  };

  return (
    <div>
      <label htmlFor="dataType">Token :</label>
      <select id="dataType" value={selectedType} onChange={handleTypeChange}>
        <option value="">Tous</option>
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
        {/* Ajoutez d'autres options en fonction de vos types de données */}
      </select>
    </div>
  );
};

export default DataSelector;
