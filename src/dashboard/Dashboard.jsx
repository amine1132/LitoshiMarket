import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaRegCopy } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import "./Mont/Mont-Bold.otf";
import "./Mont/Mont-Regular.otf";
import "./Mont/Mont-SemiBold.otf";
import WalletSection from "./Wallet-Dashboard/Wallet-Dashboard";
import NavButtons from "../components/Navbars/NavButtons";
import ProfileDashBoard from "./ProfileDashboard";
import SearchPopUp from "../components/SearchPopUp/SearchPopUp";
import valid from "../assets/dashboard/valid.svg";

function Dashboard({ wallet, blurState, searchState, setBlurState, setSearchState }) {
    const [uniSatAvailable, setUniSatAvailable] = useState(false);
    const [filteredBlockchain, setFilteredBlockchain] = useState();
    const [isOver1000Px, setIsOver1000Px] = useState(true);

    const [address, setAddress] = useState(null);
    const [dataFetched, setDataFetched] = useState();

    useEffect(() => {
        setFilteredBlockchain(dataFetched);
    }, [dataFetched]);

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
    });

    useEffect(() => {
        const checkUniSatAvailability = () => {
            if (typeof window.unisat !== "undefined") {
                setUniSatAvailable(true);
            } else {
                setUniSatAvailable(false);
            }
        };
        checkUniSatAvailability();

        const checklitescribeAvailability = () => {
            if (typeof window.litescribe !== "undefined") {
                setUniSatAvailable(true);
            } else {
                setUniSatAvailable(false);
            }
        };
        checklitescribeAvailability();

        const handleCopyAddress = () => {
            const MySwal = withReactContent(Swal);

            const copyAddress = () => {
                navigator.clipboard
                    .writeText(address)
                    .then(() => {
                        MySwal.fire({
                            width: 200,
                            toast: true,
                            position: "top",
                            showConfirmButton: false,
                            timer: 1500,
                            icon: "success",
                            title: "Copied",
                        });
                    })
                    .catch((error) => {
                        // Managing copy errors
                        console.error("Copy failed:", error);
                    });
            };

            const copyButtonElement = document.getElementById("copyAddress");
            copyButtonElement.addEventListener("click", copyAddress);
        };

        handleCopyAddress();

        //fetchData();
    }, []);

    // const SecondColor = "#1E1E1F";
    // const BackGroundColor = "#151516";
    const [isBiggerButtonClicked, setIsBiggerButtonClicked] = React.useState(false);

    const handleSearchPopUp = () => {
        setSearchState(false);
        setBlurState(false);
    };

    return (
        <>
            {searchState && <SearchPopUp handleSearchPopUp={handleSearchPopUp} />}
            <div className={`max_1 duration-300 ${blurState && "blur"}`}>
                <div className="colone">
                    <div className="idk_1">
                        <header>
                            <div className="top">
                                <div className="style">
                                    <div className="custom-alert">
                                        <div className="alert-content">
                                            <img src={valid} alt="" />
                                            Copied
                                        </div>
                                    </div>

                                    <div className="stylev2">
                                        <div className="filtre-dashboard">
                                            <Tooltip title="Copy address">
                                                <div className="copy" id="copyAddress">
                                                    <FaRegCopy />
                                                </div>
                                            </Tooltip>
                                        </div>
                                        {/* BOUTON EN HAUT */}
                                        <NavButtons />
                                        {/* FIN BOUTON EN HAUT */}
                                    </div>

                                    <div className="flex justify-center mt-10">
                                        {/* PROFIL SECTION */}

                                        <ProfileDashBoard isBiggerButtonClicked={isBiggerButtonClicked} />

                                        {/* END PROFIL SECTION */}
                                        {/* CHART SECTION */}
                                        <div
                                            className={`overflow-auto p-10 w-[45%] justify-center rounded-3xl bg-[#1E1E1F] ${
                                                isBiggerButtonClicked ? "hidden" : ""
                                            }`}
                                        ></div>
                                        {/* END CHART SECTION */}
                                    </div>

                                    {/* WALLET SECTION */}
                                    <WalletSection
                                        isBiggerButtonClicked={isBiggerButtonClicked}
                                        setIsBiggerButtonClicked={setIsBiggerButtonClicked}
                                    />
                                    {/* END WALLET SECTION */}
                                </div>
                            </div>
                        </header>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
