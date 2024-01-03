import React, { useEffect, useState } from "react";
import Bitcoin from "#assets/Navbar/BitcoinBTC.svg";
import litoshi from "#assets/Navbar/litoshi.svg";
import dogecoindogelogo from "#assets/Navbar/DogecoinDRC.svg";
import ouai from "#assets/Navbar/ouai.svg";
import Vector from "#assets/Navbar/Vector.svg";
import globalsearch from "#assets/Navbar/globalsearch.svg";
import element3 from "#assets/Navbar/element3.svg";
import notification from "#assets/Navbar/notification.svg";
import Footer from "#assets/Navbar/Footer.svg";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { SiTwitter } from "react-icons/si";
import { BsDiscord } from "react-icons/bs";
import { SiMedium } from "react-icons/si";
import explorer from "#assets/Navbar/globalsearch.svg";
import logofooter from "#assets/Navbar/logofooter.svg";
import test1 from "#assets/Navbar/test1.svg";
import test2 from "#assets/Navbar/test2.svg";
import test3 from "#assets/Navbar/test3.svg";

export default function navgauche() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const requestAccounts = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      console.log("connect success", accounts);
      setIsConnected(true);
    } catch (e) {
      console.log("connect failed");
      setIsLoggedOut(true);
    }
  };

  return (
    <div className="gauche">
      <div className="chain">
        <img src={litoshi} alt="" />
      </div>
      <div className="menu">
        <div className="menutop">
          <button className="connect" onClick={requestAccounts}>
            {" "}
            <img src={Footer} alt="" />
            Wallet login
          </button>
          <p className="section">Your profile</p>
          {isConnected && (
            <div className="menu2">
              <Link to="/dashboard">
                <button className="dashboard">
                  <img src={Vector} alt="" />
                  Dashboard
                </button>
              </Link>
              <Link to="/explorer">
                <button className="explorer">
                  <img src={globalsearch} alt="" />
                  Explorer
                </button>
              </Link>
              <Link to="/watchlist">
                <button className="watchlist">
                  <img src={ouai} alt="" />
                  Watchlist
                </button>
              </Link>
              <button className="alerts">
                <img src={notification} alt="" />
                Alerts
              </button>
              <button className="multicharts">
                <img src={element3} alt="" />
                Multicharts
              </button>
            </div>
          )}
          <p className="section">Tokens and chains</p>
          <div className="menuv1">
            <button className="BRC">
              <img src={explorer} alt="" />
              Overview
            </button>
            <button className="BRC2">
              <img src={Bitcoin} alt="" />
              BRC-20
            </button>
            <button className="LTC">
              <img src={litecoinltclogo} alt="" />
              LTC-20
            </button>
            <button className="DRC">
              <img src={dogecoindogelogo} alt="" />
              DRC-20
            </button>
          </div>
        </div>
        <div className="menufooter">
          <div className="ltsi">
            <a href="https://mint.litoshi.app">
              <img src={logofooter} alt="" />
              <p>Buy $LTSI</p>
            </a>
          </div>
          <div className="Logoicon">
            <a href="https://twitter.com/Litoshimarket">
              <img src={test3} alt="" />
            </a>
            <a href="https://discord.gg/cJ6aGnPM">
              <img src={test2} alt="" />
            </a>
            <a href="https://medium.com/@litebitmarket">
              <img src={test1} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
