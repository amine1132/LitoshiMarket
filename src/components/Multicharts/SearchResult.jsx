import "./SearchResult.css";

export const SearchResult = ({ result, onSelect }) => {
  const handleClick = () => {
    // Assurez-vous que onSelect est une fonction avant de l'appeler
    if (typeof onSelect === "function") {
      onSelect(result);
    }
  };
  return (
    <div className="search-result" onClick={handleClick}>
      {result}
    </div>
  );
};
