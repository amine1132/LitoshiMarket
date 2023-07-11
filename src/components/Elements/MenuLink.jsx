//  Dependencies
// ===========================================================

import React from "react";
import { useNavigate } from "react-router-dom";

//  Navbar
// ===========================================================

export function MenuLink({ url, children, active }) {
  // Hooks
  const navigate = useNavigate();
  if (active)
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
                hover:bg-[#563aff33]
                hover:border-[#563aff]
            `}
        onClick={() => navigate(url)}
      >
        {children}
      </li>
    );
  else
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
