//  Dependencies
// ===========================================================

import React from "react";
import { useNavigate } from "react-router-dom";

//  Navbar
// ===========================================================

export function MenuLink({ url, children, active }) {
  // Hooks
  const BackGroundColor = "#151516";
  const BackGroundColorButton = "#1E1E1F";
  const navigate = useNavigate();
  return (
    <li
      className={`
                w-full
                flex justfy-center items-center gap-3
                text-white
                cursor-pointer
                p-1
                border
                border-[#00000000]
                hover:bg-[${BackGroundColorButton}]
                hover:border-[${BackGroundColorButton}]
            `}
      onClick={() => navigate(url)}
    >
      {children}
    </li>
  );
  return (
    <li
      className={`
            w-full
            flex justfy-center items-center gap-3
            text-white
            cursor-pointer
            p-1
            border
            border-[#00000000]
            opacity-20
        `}
    >
      {children}
    </li>
  );
}
