//  Dependencies
// ===========================================================

import React, { useEffect, useState } from "react";
import { MenuLink } from "#components/Elements";
import { Wallet } from "./Wallet/Wallet";
import { Profile } from "./Profile/Profile";
import { Tokens } from "./Tokens/Tokens";
import { Footer } from "./Footer/Footer";

import "./NavbarApp.css";

//  Constants
// ===========================================================

//  Components
// ===========================================================

//  Navbar
// ===========================================================

export function NavbarApp({ wallet, setWallet }) {
  // useEffect(() => {
  //   console.log("wallet");
  //   console.log(wallet);
  // }, [wallet]);

  {/* BUTTON CHANGE SIZE */}
  const [isCollapsed, setCollapsed] = useState(false);
  const buttonText = isCollapsed ? ">>" : "<<";

  const toggleWidth = () => {
      setCollapsed(!isCollapsed);
  };
  {/* END BUTTON CHANGE SIZE */}

  return (
    /* BUTTON CHANGE SIZE */
    <div className={`${isCollapsed ? 'collapsed w-[50px] transition-width duration-300 ease-in-out' : 'w-[240px] transition-width duration-300 ease-in-out'}
    h-full bg-gradient-to-t from-[rgba(86,58,255,0.1)] to-[rgba(255,255,255,0.2)] border[0.5px-solid-blue] rounded-r-lg`}>
    <div className={`${isCollapsed ? 'collapsed w-[50px] transition-width duration-300 ease-in-out' : 'w-[200px] transition-width duration-300 ease-in-out'} 
    h-screen fixed bg-gradient-to-t from-[rgba(86,58,255,0.1)] to-[rgba(255,255,255,0.2)] border-2 border-solid border-indigo-600 rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-none`}>
    <button onClick={toggleWidth} className="absolute top-4 right-4 m-2">{buttonText}</button>
    {/* END BUTTON CHANGE SIZE */}
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="h-full flex flex-col gap-10 mt-20">
            <Wallet wallet={wallet} setWallet={setWallet} />
            <Profile wallet={wallet} />
            <Tokens wallet={wallet} />
          </div>
          <Footer isButtonActivated={isCollapsed}/>
        </div>
      </div>
    </div>
  );
}
