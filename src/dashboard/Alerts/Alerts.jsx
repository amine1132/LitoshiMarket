import React, { useEffect, useState } from "react";
import trash from "#assets/trushsquare.svg";
import trashred from "#assets/trashred.svg";
import edit from "#assets/edit.svg";
import pencil from "#assets/pencil.svg";
import notification from "#assets/notificationgreen.svg";
import notifgreen from "#assets/notifgreen.svg";
import "./Alerts.css";
import NavButtons from "../../components/Navbars/NavButtons";
import CaseAlert from "./CaseAlert";
import AddCaseAlert from "./AddCaseAlert";
import SearchPopUp from "../../components/SearchPopUp/SearchPopUp";
import AddAlertModal from "./AddAlertModal"; // Importez votre composant modal

export default function Alerts({ wallet, blurState, searchState, setBlurState, setSearchState, addNewAlert }) {
    const [isOver1000Px, setIsOver1000Px] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    //choose the screen size
    const handleResize = () => {
        if (window.innerWidth > 1000) {
            setIsOver1000Px(true);
        } else {
            setIsOver1000Px(false);
        }
    };

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const SecondColor = "#1E1E1F";
    const BackGroundColor = "#151516";

    const handleSearchPopUp = () => {
        setSearchState(false);
        setBlurState(false);
    };
    const [alerts, setAlerts] = useState([]);

    return (
        <>
            {searchState && <SearchPopUp handleSearchPopUp={handleSearchPopUp} />}
            <div className={`max_1 duration-300 ${blurState && "blur"}`}>
                <div className="px-[30px]">
                    <div className="idk_1">
                        <header>
                            <div className="top">
                                <div className="style">
                                    <div className="stylev2">
                                        <NavButtons SecondColor={SecondColor} />
                                    </div>
                                </div>
                            </div>
                        </header>
                        <CaseAlert SecondColor={SecondColor} notification={notifgreen} edit={pencil} trash={trashred} />

                        {isModalOpen && <AddAlertModal onClose={toggleModal} addNewAlert={addNewAlert} />}
                        {!isModalOpen && <AddCaseAlert SecondColor={SecondColor} onOpenModal={toggleModal} />}
                        {alerts.map((alert, index) => (
                            <CaseAlert SecondColor={SecondColor} notification={notifgreen} edit={pencil} trash={trashred} />
                        ))}
                    </div>
                    <div className="ellipse"></div>
                </div>
            </div>
        </>
    );
}
