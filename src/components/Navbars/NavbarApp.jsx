//  Dependencies
// ===========================================================

import React, { useEffect, useState } from "react";
import { MenuLink } from "#components/Elements";
import { Wallet } from "./Wallet/Wallet";
import { Profile } from "./Profile/Profile";
import { Tokens } from "./Tokens/Tokens";
import { Footer } from "./Footer/Footer";
import { Logo } from "../Elements/Logo";
import { SearchBar } from "../Elements/SearchBar";

import "./NavbarApp.css";

//  Constants
// ===========================================================

//  Components
// ===========================================================

//  Navbar
// ===========================================================

export function NavbarApp({ wallet, setWallet }) {

  const BackGroundColor = "#151516";
  const BackGroundColorButton = "#1E1E1F";

  // useEffect(() => {
  //   console.log("wallet");
  //   console.log(wallet);
  // }, [wallet]);

  {
    /* BUTTON CHANGE SIZE */
  }
  const [isCollapsed, setCollapsed] = useState(false);
  const buttonText = isCollapsed ? ">>" : "<<";

  const toggleWidth = () => {
    setCollapsed(!isCollapsed);
  };
  {
    /* END BUTTON CHANGE SIZE */
  }

  return (
    /* BUTTON CHANGE SIZE */
    <div
      className={`${
        isCollapsed
          ? "collapsed w-[50px] transition-width duration-300 ease-in-out"
          : "w-[240px] transition-width duration-300 ease-in-out"
      }
    h-full border[0.5px-solid-blue] rounded-r-lg`}
    >
      <div
        className={`${
          isCollapsed
            ? "collapsed w-[50px] transition-width duration-300 ease-in-out"
            : "w-[200px] transition-width duration-300 ease-in-out"
        } 
        h-screen bg-[${BackGroundColor}] fixed border-r border-gray-600`}
      > <div onClick={toggleWidth} style={{ cursor: 'pointer' }} className={`bg-[${BackGroundColorButton}] absolute top-[45%] pr-[5px] pl-[2px] py-[25px] border-gray-600 border rounded-r-lg border-bg -right-[22px]`}>
              <p className={`text-xs text-gray-600`}>{buttonText}</p>
        </div>
        {/* END BUTTON CHANGE SIZE */}
        <div className="h-full overflow-x-hidden flex flex-col overflow-y-auto">
          <div className="h-full flex flex-col mt-[50px] ">
            <Logo />
            <SearchBar isButtonActivated={isCollapsed} />
            {isCollapsed ? <div className="pb-[5px]"></div> : <div className="pb-[20px]"></div>}
            <Profile wallet={wallet} isButtonActivated={isCollapsed} />
            {/* <Tokens wallet={wallet} isButtonActivated={isCollapsed} /> */}
          </div>
          <Wallet
            wallet={wallet}
            setWallet={setWallet}
            isButtonActivated={isCollapsed}
          />
          {/* <Footer isButtonActivated={isCollapsed} /> */}
        </div>
      </div>
    </div>
  );
}
