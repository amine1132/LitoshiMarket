import React, { useEffect, useState } from "react";
import logofooter from "#assets/logofooter.svg";
import test1 from "#assets/test1.svg";
import test2 from "#assets/test2.svg";
import test3 from "#assets/test3.svg";

export function Footer() {
  // Constants
  const links = [
    {
      url: "https://twitter.com/Litoshimarket",
      img: test3,
    },
    {
      url: "https://discord.com/invite/JZKcaxAeeU",
      img: test2,
    },
    {
      url: "https://medium.com/@litebitmarket",
      img: test1,
    },
  ];

  return (
    <div className="w-[85%] mx-auto flex flex-col gap-3 h-[17%]">
        <a className="w-[85%] mx-auto flex items-center">
          <img className="mr-2" src="/src/assets/dashboard/BitcoinBTC.svg" /> Buy test
        </a>
      <div className="border-b border-[#5b5b5c]"></div>
      <ul className="w-full flex justify-evenly items-center gap-2">
        {links.map((item, index) => (
          <li
            className={`      
                              h-[10%]
                              text-white
                              cursor-pointer
                              p-0
                              border
                              border-[#00000000]
                              hover:bg-[#563aff33]
                              hover:border-[#563aff]
                          `}
            key={index}
            onClick={() => navigate(item?.url)}
          >
            <a href={item?.url} target="_blank">
              <img src={item?.img} alt="" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
