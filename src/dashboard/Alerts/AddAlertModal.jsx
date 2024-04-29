import React, { useState, useEffect } from "react";
import walletData from "../../Data/WalletData.json"; // Importez les données du fichier walletData.json
import Alert from "./Alerts";

export default function AddAlertModal({ onClose }) {
    const [selectedItem, setSelectedItem] = useState(""); // État pour stocker l'élément sélectionné
    const [price, setPrice] = useState(""); // État pour stocker le prix saisi
    const [tickerOptions, setTickerOptions] = useState([]); // État pour stocker les options du menu déroulant
    const [alerts, setAlerts] = useState([]); // État pour stocker les alertes ajoutées

    // Fonction pour ajouter une nouvelle alerte
    const addNewAlert = (ticker, price) => {
        const newAlert = {
            ticker: ticker,
            price: price,
        };

        setAlerts([...alerts, newAlert]); // Ajouter la nouvelle alerte à la liste des alertes
        onClose(); // Fermer la modal après avoir ajouté l'alerte
        console.log("Nouvelle alerte ajoutée :", newAlert);
    };

    // Fonction pour gérer le changement de sélection dans le menu déroulant
    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };

    // Fonction pour gérer le changement de saisie de prix
    const handlePriceChange = (event) => {
        // Vérifier si la valeur saisie est négative
        const newPrice = parseInt(event.target.value);
        if (newPrice >= 0 || event.target.value === "") {
            // Si la valeur est positive ou si le champ est vide
            setPrice(newPrice.toString()); // Mettre à jour le prix saisi
        }
    };

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose(); // Appeler onClose uniquement si l'utilisateur clique sur l'arrière-plan gris foncé
        }
    };

    useEffect(() => {
        // Récupérer les tickers à partir des données walletData.json
        const tickers = walletData.map((item) => item.ticker);
        setTickerOptions(tickers);
    }, []);

    const handleSave = () => {
        addNewAlert();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black opacity-25" onClick={handleBackgroundClick}></div> {/* Fond gris foncé */}
            <div className="modal bg-[#1E1E1F] p-8 rounded-lg z-50 w-96 h-72 rounded-[25px]">
                {" "}
                {/* Taille de la modal 400px par 300px */}
                <span className="close absolute top-0 right-0 mt-4 mr-4 text-gray-600 cursor-pointer" onClick={onClose}>
                    &times;
                </span>{" "}
                {/* Bouton de fermeture de la modal */}
                <h2 className="text-2xl font-bold mb-2">Add Alert</h2>
                <p>Manage price alert</p>
                <div className="mb-4">
                    {/* Menu déroulant pour sélectionner l'élément */}
                    <select className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-white bg-[#1E1E1F]" value={selectedItem} onChange={handleSelectChange}>
                        <option value="">Select a ticker</option>
                        {tickerOptions.map((ticker, index) => (
                            <option key={index} value={ticker}>
                                {ticker}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    {/* Zone de saisie pour entrer le prix */}
                    <input
                        className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#1E1E1F]"
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Enter price"
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSave}>
                    Save
                </button>{" "}
            </div>
        </div>
    );
}
