//  Dependencies
// ===========================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuLink } from "#components/Elements";
import "./NavbarApp.css";

//  Constants
// ===========================================================

import logo from "#assets/logo.svg";
import logofooter from "#assets/logofooter.svg";
import test1 from "#assets/test1.svg";
import test2 from "#assets/test2.svg";
import test3 from "#assets/test3.svg";
import explorer from "#assets/globalsearch.svg";
import star from "#assets/ouai.svg";
import vector from "#assets/vector.svg";
import FooterLogo from "#assets/Footer.svg";
import notification from "#assets/notification.svg";
import multichart from "#assets/element3.svg";
import BTC from "#assets/BitcoinBTC.svg";
import LTC from "#assets/LitecoinLTC.svg";
import DRC from "#assets/DogecoinDRC.svg";

//  Components
// ===========================================================

function Wallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [uniSatAvailable, setUniSatAvailable] = useState(false);

  useEffect(() => {
    const checkUniSatAvailability = () => {
      if (typeof window.unisat !== "undefined") {
        setUniSatAvailable(true);
      } else {
        setUniSatAvailable(false);
      }
    };
    checkUniSatAvailability();
  }, []);

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
    <div className="w-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full h-1/2 flex justify-center items-center">
        <img src={logo} alt="Logo" className="w-[60%] h-full" />
      </div>
      <button
        onClick={requestAccounts}
        className="flex justify-center items-center gap-3 border py-1 px-3 text-[#fff]"
      >
        <img src={FooterLogo} alt="" />
        Wallet login
      </button>
    </div>
  );
}

function Profile() {
  // Hooks
  const navigate = useNavigate();

  // Constants
  const links = [
    {
      url: "",
      text: "Dashboard",
      img: vector,
    },
    {
      url: "watchlist",
      text: "Watchlist",
      img: star,
    },
    {
      url: "",
      text: "Alerts",
      img: notification,
    },
    {
      url: "",
      text: "Multicharts",
      img: multichart,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 px-5">
      <div className="w-full border-b border-[#5b5b5c]">
        <p className="text-[#6b6a6d] text-xs font-bold uppercase">
          Your profile
        </p>
      </div>
      <ul className="w-full flex flex-col justfy-center items-center gap-2">
        {links.map((item, index) => (
          <MenuLink url={item?.url}>
            <img src={item?.img} alt="" />
            {item?.text}
          </MenuLink>
        ))}
      </ul>
    </div>
  );
}

function Tokens() {
  // Constants
  const links = [
    {
      url: "explorer",
      text: "Explorer",
      img: explorer,
    },
    {
      url: "",
      text: "BRC-20",
      img: BTC,
    },
    {
      url: "",
      text: "LTC-20",
      img: LTC,
    },
    {
      url: "",
      text: "DRC-20",
      img: DRC,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 px-5">
      <div className="w-full border-b border-[#5b5b5c]">
        <p className="text-[#6b6a6d] text-xs font-bold uppercase">
          Tokens and chains
        </p>
      </div>
      <ul className="w-full flex flex-col justfy-center items-center gap-2">
        {links.map((item, index) => (
          <MenuLink url={item?.url}>
            <img src={item?.img} alt="" />
            {item?.text}
          </MenuLink>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  // Constants
  const links = [
    {
      url: "https://medium.com/@litebitmarket",
      img: test3,
    },
    {
      url: "https://medium.com/@litebitmarket",
      img: test2,
    },
    {
      url: "https://medium.com/@litebitmarket",
      img: test1,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 p-4">
      <div className="w-5/6 flex justify-center items-center gap-3 cursor-pointer ">
        <img src={logofooter} alt="" className="logofooter" />
        <p className="text-[#ffffffc0] text-lg font-semibold">Buy $LTSI</p>
      </div>
      <ul className="w-full flex justify-evenly items-center gap-2">
        {links.map((item, index) => (
          <li
            className={`
                            text-white
                            cursor-pointer
                            p-3
                            border
                            border-[#00000000]
                            hover:bg-[#563aff33]
                            hover:border-[#563aff]
                        `}
            onClick={() => navigate(item?.url)}
          >
            <a href={item?.url}>
              <img src={item?.img} alt="" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

//  Navbar
// ===========================================================

export function NavbarApp() {
  return (
    <div className="w-scree h-screen fixed bg-gradient-to-t from-[rgba(86,58,255,0.1)] to-[rgba(255,255,255,0.2)] border-2 border-solid border-indigo-600 rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-none">
      <div className="w-full h-full flex flex-col overflow-y-auto">
        <div className="w-full h-full flex flex-col justify-evenly">
          <Wallet />
          <Profile />
          <Tokens />
        </div>
        <Footer />
      </div>
    </div>
  );
}
