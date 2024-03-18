import React, { useState } from "react";

function TopButtons({
    BackGroundColor,
    SecondColor,
    additem,
    addwatch,
    arrowright,
    notification,
    Share,
    toggleSetShowShareWatchList,
    toggleSetShowManageList,
    toggleSetShowShareWatchListSM,
}) {
    // État local pour suivre l'état du menu déroulant
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`w-full rounded-lg bg-[${SecondColor}] mb-8`}>
            <div className={`flex justify-between`}>
                {/* Bouton "My BRC" avec menu déroulant */}
                <div className="relative flex self-center justify-between rounded-lg w-full ">
                    <button
                        type=""
                        className={`m-1.5 flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}
                        onClick={() => setMenuOpen(!menuOpen)} // Inverser l'état du menu ouvert/fermé
                    >
                        <p className="ml-2 my-2">My BRC</p>
                        <img className="mr-2 my-2" src={arrowright} alt="" />
                    </button>
                    {menuOpen && (
                        <div
                            className={`absolute top-10 left-0 mt-1.5 w-full rounded-lg shadow-lg bg-[${BackGroundColor}]`}
                        >
                            <p className="p-2">Option 1</p>
                            <p className="p-2">Option 2</p>
                            <p className="p-2">Option 3</p>
                            <p className="p-2">Option 4</p>
                        </div>
                    )}
                </div>
                <button
                    type=""
                    className={`flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}
                >
                    <p className="ml-2 my-2">New Watchlist</p>
                    <img className="mr-2 my-2" src={addwatch} alt="" />
                </button>
                <button
                    type=""
                    className={`m-1.5 flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}
                >
                    <p className="ml-2 my-2">Add pair</p>
                    <img className="mr-2 my-2" src={additem} alt="" />
                </button>
                <button
                    type=""
                    onClick={toggleSetShowManageList}
                    className={`flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}
                >
                    <p className="ml-2 my-2">Add an alert</p>
                    <img className="mr-2 my-2" src={notification} alt="" />
                </button>
                <button
                    type=""
                    onClick={toggleSetShowShareWatchList}
                    className={`m-1.5 flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}
                >
                    <p className="ml-2 my-2">Share this watchlist</p>
                    <img className="mr-2 my-2" src={Share} alt="" />
                </button>
            </div>
        </div>
    );
}

export default TopButtons;
