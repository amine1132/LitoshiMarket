//  Dependencies
// ===========================================================

import React, { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
// import { useSelector } from 'react-redux';
import { NavbarApp } from "#components/Navbars";

//  Route
// ===========================================================

export const RoutesLogged = () => {
  // Hooks
  // const navigate = useNavigate();
  // const location  = useLocation();
  const user = null;

  return (
    <div className="w-full h-full flex overflow-hidden">
      <div className="w-[200px] h-full bg-gradient-to-t from-[rgba(86,58,255,0.1)] to-[rgba(255,255,255,0.2)] border[0.5px-solid-blue] border-2 border-[rgba(86,58,255,0.56)] rounded-r-lg">
        <NavbarApp user={user} />
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
