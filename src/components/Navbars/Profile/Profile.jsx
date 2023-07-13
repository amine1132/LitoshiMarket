import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { MenuLink } from "#components/Elements";

import vector from "#assets/Vector.svg";
import star from "#assets/ouai.svg";
import FooterLogo from "#assets/Footer.svg";
import notification from "#assets/notification.svg";
import multichart from "#assets/element3.svg";

export function Profile({ wallet }) {
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
      url: "",
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
    <div className="w-full flex flex-col gap-3 px-3">
      <div className="w-full border-b border-[#5b5b5c]">
        <p className="text-[#6b6a6d] text-xs font-bold uppercase">
          Your profile
        </p>
      </div>
      <ul className="w-full flex flex-col justfy-center items-center gap-2">
        {links.map((item, index) => (
          <MenuLink url={item?.url} active={wallet} key={index}>
            <img src={item?.img} alt="" />
            {item?.text}
          </MenuLink>
        ))}
      </ul>
    </div>
  );
}
