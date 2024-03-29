import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { MenuLink } from "#components/Elements";

import vector from "#assets/Vector.svg";
import star from "#assets/ouai.svg";
import FooterLogo from "#assets/Footer.svg";
import notification from "#assets/notification.svg";
import multichart from "#assets/element3.svg";
import explorer from "#assets/globalsearch.svg";

export function Profile({ wallet, isButtonActivated }) {
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
      url: "explorer",
      text: "Explorer",
      img: explorer,
    },
    {
      url: "watchlist",
      text: "Watchlist",
      img: star,
    },
    {
      url: "alerts",
      text: "Alerts",
      img: notification,
    },
    {
      url: "multicharts",
      text: "Multicharts",
      img: multichart,
    },
  ];

  return (
    <div className="w-[85%] mx-auto flex flex-col gap-3">
      <div className="w-full border-b border-[#5b5b5c]">
        <p className="text-[#6b6a6d] text-xs font-bold uppercase">
          {isButtonActivated ? null : "Your profile"}
        </p>
      </div>
      <ul
        className={`${
          isButtonActivated ? "ml-1.5" : "ml-0.5"
        } w-full flex flex-col justfy-center items-center gap-2`}
      >
        {links.map((item, index) => (
          <MenuLink url={item?.url} active={wallet} key={index}>
            <img src={item?.img} alt="" />
            {isButtonActivated ? null : item?.text}
          </MenuLink>
        ))}
      </ul>
    </div>
  );
}
