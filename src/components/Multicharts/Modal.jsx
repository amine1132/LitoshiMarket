import React, { useState, useEffect } from "react";
import ModalSearchBar from "./SearchBar";
import Modal from "react-modal";
import Croix from "#assets/Croix.svg";

Modal.setAppElement("#root");

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [addedUsers, setAddedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Utilisez l'API JSONPlaceholder pour récupérer la liste des utilisateurs
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données : ", error)
      );
  }, []);

  const handleUserSelect = (user) => {
    if (addedUsers.some((addedUser) => addedUser.id === user.id)) {
      // Si l'utilisateur est déjà ajouté, supprimez-le
      const updatedUsers = addedUsers.filter(
        (addedUser) => addedUser.id !== user.id
      );
      setAddedUsers(updatedUsers);
    } else {
      // Sinon, ajoutez-le
      setAddedUsers([...addedUsers, user]);
    }

    // Fermez le modal après la sélection
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    if (selectedUser) {
      setAddedUsers([...addedUsers, selectedUser]);
    }
  };

  const handleRemoveUser = (userToRemove) => {
    const updatedUsers = addedUsers.filter(
      (user) => user.id !== userToRemove.id
    );
    setAddedUsers(updatedUsers);
  };

  return (
    <div className="w-full h-full">
      <button onClick={() => setIsModalOpen(true)} className="w-full h-full">
        <p>Add a new chart</p>
        <img src={Croix} alt="" className="m-auto" />
      </button>
      <Modal
        className="modal_searchbar"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Rechercher un utilisateur"
      >
        <ModalSearchBar
          searchTerm={searchTerm}
          onSearch={(term) => setSearchTerm(term)}
          onSelectUser={handleUserSelect}
          addedUsers={addedUsers}
          isModalOpen={isModalOpen} // Passer l'état du modal
        />
        <ul>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <li
                className="filter_searchbar"
                onClick={() => handleUserSelect(user)}
                key={user.id}
              >
                {user.name}
              </li>
            ))}
        </ul>
      </Modal>

      {selectedUser && (
        <div>
          <h2>Détails de l'utilisateur</h2>
          <p>Nom : {selectedUser.name}</p>
          <p>Email : {selectedUser.email}</p>
          <p>Téléphone : {selectedUser.phone}</p>
          <button onClick={handleAddUser}>Ajouter l'utilisateur</button>
        </div>
      )}
      <div>
        {addedUsers.map((user) => (
          <div>
            <li key={user.id}>
              {user.name}{" "}
              <button onClick={() => handleRemoveUser(user)}>Supprimer</button>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
