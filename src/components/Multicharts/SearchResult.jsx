import "./SearchResult.css";
import React from "react";

export const SearchResult = ({ result, onSelect }) => {
  const handleClick = () => {
    // Assurez-vous que onSelect est une fonction avant de l'appeler
    if (typeof onSelect === "function") {
      onSelect(result); // Ici, passez l'objet utilisateur complet
    }
  };

  return (
    <div className="search-result" onClick={handleClick}>
      {result} {/* Affichez le nom de l'utilisateur */}
    </div>
  );
};
