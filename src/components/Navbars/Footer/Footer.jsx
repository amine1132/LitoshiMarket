import React, { useEffect, useState } from "react";
import logofooter from "#assets/logofooter.svg";
import test1 from "#assets/test1.svg";
import test2 from "#assets/test2.svg";
import test3 from "#assets/test3.svg";

export function  Footer({ isButtonActivated }) {
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
    <div className={`w-[85%] mx-auto flex flex-col gap-3 pt-[10%] ${isButtonActivated ? 'h-[25%]' : 'h-[17%]'}`}>
      {
        isButtonActivated ?
        <div className="border-b border-[#5b5b5c]"></div> 
        :
        null
      }
      <ul className={`${isButtonActivated ? 'flex-wrap gap-2' : 'gap-2'} flex justify-evenly items-center`}>
        {links.map((item, index) => (
          <li
            className={`      
              text-white
              cursor-pointer
              p-0
              border
              border-[#00000000]
              hover:bg-[#563aff33]
              hover:border-[#563aff]
              ${isButtonActivated ? 'mb-2' : ''}
            `}
            key={index}
            onClick={() => navigate(item?.url)}
          >
            <a href={item?.url} target="_blank">
              <img src={item?.img} alt="" />
              {isButtonActivated ? null : item?.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
