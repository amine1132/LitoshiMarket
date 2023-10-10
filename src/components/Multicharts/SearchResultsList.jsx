import "./SearchResultsList.css";
import React, { useEffect, useState } from "react";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onSelect }) => {
  const [selectedResult, setSelectedResult] = useState("");

  const handleResultSelect = (result) => {
    setSelectedResult(result); // Met à jour le résultat sélectionné
  };

  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result.name}
            key={id}
            onSelect={onSelect} // Passez la fonction addSelectedResult ici
          />
        );
      })}
    </div>
  );
};
