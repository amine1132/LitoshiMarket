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
        <NavbarApp wallet={wallet} setWallet={setWallet} />
      <div className="w-[100%] h-full ">
        <Outlet
          context={{
            user,
          }}
        />
      </div>
    </div>
  );
};
