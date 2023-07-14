import React, { useEffect, useState } from "react";
import logofooter from "#assets/logofooter.svg";
import test1 from "#assets/test1.svg";
import test2 from "#assets/test2.svg";
import test3 from "#assets/test3.svg";

export function Footer() {
  // Constants
  const links = [
    {
      url: "https://medium.com/@litebitmarket",
      img: test3,
    },
    {
      url: "https://medium.com/@litebitmarket",
      img: test2,
    },
    {
      url: "https://medium.com/@litebitmarket",
      img: test1,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 p-4">
      <a href="https://sale.litoshi.app/" target="_blank">
        <div className="w-5/6 flex justify-center items-center gap-3 cursor-pointer ">
          <img src={logofooter} alt="" className="logofooter" />
          <p className="text-[#ffffffc0] text-lg font-semibold">Buy $LTSI</p>
        </div>
      </a>
      <ul className="w-full flex justify-evenly items-center gap-2">
        {links.map((item, index) => (
          <li
            className={`
                              text-white
                              cursor-pointer
                              p-3
                              border
                              border-[#00000000]
                              hover:bg-[#563aff33]
                              hover:border-[#563aff]
                          `}
            key={index}
            onClick={() => navigate(item?.url)}
          >
            <a href={item?.url}>
              <img src={item?.img} alt="" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
