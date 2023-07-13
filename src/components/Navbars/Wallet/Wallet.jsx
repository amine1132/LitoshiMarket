import React, { useEffect, useState } from "react";

import logo from "#assets/Calque_1.svg";
import FooterLogo from "#assets/Footer.svg";

export function Wallet({ wallet, setWallet }) {
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
      setWallet(accounts[0]);
      setIsConnected(true);
    } catch (e) {
      console.log("connect failed");
      console.log(e);
      setIsLoggedOut(true);
    }
  };

  function formatAddress(address) {
    return address.substr(0, 5) + "..." + address.substr(address.length - 3);
  }
  return (
    <div className="w-full flex flex-col gap-8 justify-center items-center">
      <div className="w-full h-1/2 flex justify-center items-center mb-10">
        <img src={logo} alt="Logo" className="w-[80%] absolute" />
      </div>
      <button
        onClick={requestAccounts}
        className="flex justify-center items-center gap-3 border py-3 px-4 text-[#fff]"
      >
        <img src={FooterLogo} alt="" />
        {wallet ? formatAddress(wallet) : <div>Wallet login</div>}
      </button>
    </div>
  );
}
