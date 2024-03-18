import React from "react";
import past from "../../assets/explorer/past.svg";
import fusée from "../../assets/explorer/fusée.svg";

export default function SearchPopUp({ handleSearchPopUp }) {
    const handleClosePopUp = (e) => {
        // Vérifie si l'élément cliqué est l'arrière-plan de la fenêtre pop-up
        if (e.target.classList.contains("bg-black")) {
            handleSearchPopUp(); // Ferme la fenêtre pop-up
        }
    };

    return (
        <div className="bg-black bg-opacity-50 fixed inset-0 justify-center flex z-10 " onClick={handleClosePopUp}>
            <div className={`h-[520px] w-[750px] self-center p-4 rounded-3xl bg-[#1E1E1F]`}>
                <div className="bg-[#151516] p-2 flex rounded-lg border border-white border-opacity-10">
                    <img src="/src/assets/search.svg" className="opacity-50" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-left placeholder:text-white placeholder:opacity-50 ml-2"
                    />
                    <button onClick={handleSearchPopUp} className={`rounded-lg w-full flex justify-end`}>
                        <img
                            src="/src/assets/cross.png"
                            alt=""
                            className="opacity-50 w-[12px] h-[12px] self-center mr-2"
                        />
                    </button>
                </div>

                <div className="bg-[#151516] flex justify-left p-3 rounded-lg mt-4">
                    <img src="/src/assets/default-avatar.png" className="rounded-full h-[50px]" alt="" />
                    <div className="flex w-full justify-between">
                        <div className="self-center ml-3">
                            <p className="text-xs">MCPEPE</p>
                            <p className="text-xs">
                                Traders Invest $7 Million in Bitcoin Minetrix, Buy This Stake To Earn Coin Before Price
                                Increase
                            </p>
                            <p className="text-xs text-[#FD5A00]">Buy $BTCMTX Now!</p>
                        </div>
                        <div className="items-right">
                            <p className="text-xs opacity-50">Ad x</p>
                        </div>
                    </div>
                </div>

                <div className="flex mt-5 text-xl">
                    <p className="flex text-[#FD5A00] mr-1 gap-2">
                        {" "}
                        <img src={fusée} alt="" />
                        Trending
                    </p>
                    <p>on Litoshi</p>
                </div>

                <div className="flex mt-4 mx-5 justify-between flex-wrap">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div className="">
                            <div key={index} className={`rounded-lg h-[100px] w-[150px] bg-[#151516]`}>
                                <img src="/src/assets/default-avatar.png" className="h-[100px] w-[150px] rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex mt-5 text-xl">
                    <p className="flex gap-2">
                        {" "}
                        <img src={past} alt="" /> Past Search
                    </p>
                </div>

                <div className="flex mt-4 mx-5 justify-between flex-wrap">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div className="">
                            <div key={index} className={`rounded-lg h-[100px] w-[150px] bg-[#151516]`}>
                                <img src="/src/assets/default-avatar.png" className="h-[100px] w-[150px] rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
