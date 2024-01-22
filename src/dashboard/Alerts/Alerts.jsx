import React, { useEffect, useState } from "react";
import axios from "axios";
import arrowright from "#assets/arrowright2.svg";
import search from "#assets/search.svg";
import scroll from "#assets/scroll.svg";
import trash from "#assets/trushsquare.svg";
import edit from "#assets/edit.svg";
import notification from "#assets/notificationgreen.svg";
import "./Alerts.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useMatch,
} from "react-router-dom";
import { BsStar } from "react-icons/bs";
import Bitcoin from "#assets/BitcoinBTC.svg";
import litecoinltclogo from "#assets/LitecoinLTC.svg";
import dogecoindogelogo from "#assets/DogecoinDRC.svg";
import AlertsPage from "../../components/Explorer/AlertsPage";
import WelcomeBack from "../../components/Elements/WelcomeBack";

export default function Alerts({ wallet }) {
  const [isOver1000Px, setIsOver1000Px] = useState(true);

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

  return (
    <>
      <div className="max">
        <div className="colone">
          <div className="idk">
            <header>
              <div className="top">
                <div className="style">
                  <div className="stylev2">
                    <WelcomeBack/>
                  </div>
                </div>
                {/* <div className="style"></div>
                <div className="input">
                  <div className="loupe_">
                    <img src={search} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Token, pair, address..."
                    className="formulaire_2"
                  /> */}
                  {/* <button onClick={requestAccounts}>Connect your wallet</button> */}
                  {/* <div className="notif"></div>
                </div> */}
              </div>
            </header>
            <div className="scroll_contenu">
              <div className="watchlist-flexbutton">
                <div className="watchlist-buttontop">
                  <button type="">
                    {" "}
                    <img src={scroll} alt="" />
                    Recently created
                  </button>
                </div>
              </div>
              <div className="groupe2">
                <div className="alerts_content">
                  <div className="alerts_title">
                    <p>ORDI/BRC20</p>
                  </div>
                  <div className="flex justify-between items-center">
                    {/* <AlertsPage /> */}
                    <div className="alert_text">
                      <p className="text-green-500 text-xs font-normal font-semibold leading-normal tracking-tighter flex gap-2">
                        <img src={notification} alt="" />
                        ACTIVE
                      </p>
                      <p>
                        Alert me when price{" "}
                        <span className="text-green-500 text-16 font-normal font-extrabold leading-normal tracking-wider">
                          goes over $12.512
                        </span>
                      </p>
                      <p className="text-white text-opacity-50 text-sm font-normal font-semibold leading-normal tracking-tighter">
                        Created 6 minutes ago
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <img src={edit} alt="" className="cursor-pointer" />
                      <img src={trash} alt="" className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ellipse"></div>
        </div>
      </div>
    </>
  );
}
