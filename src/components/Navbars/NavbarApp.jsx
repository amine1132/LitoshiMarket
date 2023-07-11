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
  return (
    <div className="w-scree h-screen fixed bg-gradient-to-t from-[rgba(86,58,255,0.1)] to-[rgba(255,255,255,0.2)] border-2 border-solid border-indigo-600 rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-none">
      <div className="w-full h-full flex flex-col overflow-y-auto">
        <div className="w-full h-full flex flex-col justify-evenly">
          <Wallet wallet={wallet} setWallet={setWallet} />
          <Profile wallet={wallet} />
          <Tokens />
        </div>
        <Footer />
      </div>
    </div>
  );
}
