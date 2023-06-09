import { MenuLink } from "#components/Elements";

import explorer from "#assets/globalsearch.svg";
import BTC from "#assets/BitcoinBTC.svg";
import DRC from "#assets/DogecoinDRC.svg";

export function Tokens() {
  // Constants
  const links = [
    {
      url: "explorer",
      text: "Explorer",
      img: explorer,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 px-3">
      <div className="w-full border-b border-[#5b5b5c]">
        <p className="text-[#6b6a6d] text-xs font-bold uppercase">
          Tokens and chains
        </p>
      </div>
      <ul className="w-full flex flex-col justfy-center items-center gap-2">
        {links.map((item, index) => (
          <MenuLink url={item?.url} active={true} key={index}>
            <img src={item?.img} alt="" />
            {item?.text}
          </MenuLink>
        ))}
      </ul>
    </div>
  );
}
