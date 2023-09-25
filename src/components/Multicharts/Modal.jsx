import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Assurez-vous d'installer le package react-modal
import "../../dashboard/Multicharts/Multicharts.css";

function TokenSelector() {
  const [tokens, setTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Utilisez une API pour récupérer la liste des tokens disponibles
    // et mettez-les à jour dans l'état "tokens"
    // Exemple de requête avec fetch :
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = () => {
    // Effectuez la recherche parmi les tokens disponibles en utilisant "searchTerm"
    // Mettez les résultats dans un état "searchResults"
    const searchResults = tokens.filter((token) => token.includes(searchTerm));
    // Mettez à jour l'état "searchResults"
    setSearchResults(searchResults);
  };

  const handleAddToken = (token) => {
    // Ajoutez le token sélectionné à la liste des tokens sélectionnés
    setSelectedTokens([...selectedTokens, token]);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Ouvrir la boîte de dialogue</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={overlay}
        style=
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
      >
        <h2>Token</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="recherche-modal"
        />
        <button onClick={handleSearch}>Rechercher</button>
        <ul>
          {searchResults.map((token) => (
            <li key={token}>
              {token}
              <button onClick={() => handleAddToken(token)}>Ajouter</button>
            </li>
          ))}
        </ul>
        <button onClick={handleCloseModal}>Fermer</button>
      </Modal>
    </div>
  );
}

export default TokenSelector;
