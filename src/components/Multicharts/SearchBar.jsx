import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const ModalSearchBar = ({ searchTerm, onSearch, onSelectUser, onAddUser }) => {
  const [modalUsers, setModalUsers] = useState([]);

  // ...
  const handleUserClick = (user) => {
    onSelectUser(user); // Appeler la fonction onSelectUser pour gérer la sélection
    if (isModalOpen) {
      onRequestClose(); // Fermer le modal
    }
  };

  const handleUserSelect = (user) => {
    onSelectUser(user); // Appeler la fonction de la page principale pour ajouter l'utilisateur à la liste principale
    onAddUser(user); // Appeler la fonction pour ajouter l'utilisateur à la liste des utilisateurs ajoutés dans le modal
  };

  return (
    <div>
      <div className="input_style">
        <FaSearch />
        <input
          type="text"
          placeholder="Token, pair or adress"
          value={searchTerm}
          className="input_searchbar"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <ul>
        {modalUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)} // Appeler handleUserClick au lieu de onSelectUser
            className={
              addedUsers.some((addedUser) => addedUser.id === user.id)
                ? "added"
                : ""
            }
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalSearchBar;
