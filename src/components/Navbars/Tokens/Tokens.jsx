import { MenuLink } from "#components/Elements";

import explorer from "#assets/globalsearch.svg";
import BTC from "#assets/BitcoinBTC.svg";
import DRC from "#assets/DogecoinDRC.svg";
import bitcoinconvert from "#assets/bitcoin-convert.png";
import directinbox from "#assets/direct-inbox.png";
import textblock from "#assets/text-block.png";

export function Tokens({ wallet, isButtonActivated }) {
  // Constants
  const links = [
    {
      text: "BRC-20",
      img: "/src/assets/dashboard/BitcoinBTC.svg",
    },
    {
      text: "LTC-20",
      img: "/src/assets/dashboard/LitecoinLTC.svg",
    },
    {
      text: "DRC-20",
      img: "/src/assets/dashboard/DogecoinDRC.svg",
    },
  ];

  return (
    <div className="w-[85%] mx-auto flex flex-col gap-3">
      <div className="w-full border-b border-[#5b5b5c]">
        <p className="text-[#6b6a6d] text-xs font-bold uppercase">
        {isButtonActivated ? null : "Tokens and chains"}
        </p>
      </div>
    <ul className="ml-0.5 w-full flex flex-col justfy-center items-center gap-2">
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
