import React, { useState } from "react";
import AddAlertModal from "./AddAlertModal";

// Composant pour ajouter une alerte
export default function AddCaseAlert({ SecondColor, onOpenModal }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture de la modal

    // Fonction pour ouvrir la modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <AddAlertModal onClose={() => setIsModalOpen(false)} />}
            {/* Afficher la modal si isModalOpen est true */}
            <div className="flex mt-3 mb-5 justify-center">
                <div className={`flex flex-col justify-center bg-[${SecondColor}] rounded-2xl w-[92%] h-[150px] `}>
                    <button onClick={openModal}>
                        <h1 className="text-6xl text-gray-600 text-center">+</h1>
                        <p className="text-gray-600 text-center">Add an alert</p>
                    </button>
                </div>
            </div>
        </>
    );
}
