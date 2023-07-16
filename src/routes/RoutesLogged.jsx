//  Dependencies
// ===========================================================

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavbarApp } from "#components/Navbars";

//  Route
// ===========================================================

export const RoutesLogged = ({ wallet, setWallet }) => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.settings.user);

  useEffect(() => {
    // User is not connected
    if (!user?.address) navigate("");
  }, [user]);

  return (
    <div className="w-full h-full flex overflow-hidden">
      <div className="w-[240px] h-full bg-gradient-to-t from-[rgba(86,58,255,0.1)] to-[rgba(255,255,255,0.2)] border[0.5px-solid-blue] rounded-r-lg ">
        <NavbarApp wallet={wallet} setWallet={setWallet} />
      </div>
      <div className="w-[100%] h-full bg-[#666]">
        <Outlet
          context={{
            user,
          }}
        />
      </div>
    </div>
  );
};
