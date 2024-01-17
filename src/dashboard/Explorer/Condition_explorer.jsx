import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import Explorer_chart from "../../components/Explorer/Explorer_chart";
import Modalv2 from "../../components/Explorer/Modalv2";
import DataToken from "./DataTokenComponent";
import Charts_Tradingview from "../../components/Chart/Charts_Tradingview";

export default function Condition_explorer({ Explorer }) {
  const [selectedTokenName, setSelectedTokenName] = useState("");
  const [showTransactionContent, setShowTransactionContent] = useState(false);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [isContentCleared, setIsContentCleared] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [totalMarketCap, setTotalMarketCap] = useState(0.0);

  function handleTableRowClick(tokenName) {
    setSelectedTokenName(tokenName);
    setIsContentCleared(false);
    setShowNFTContent(true);
    setShowTransactionContent(true);
    setShowTokenContent(true);
  }
  return (
    <>
      {/* <div className="hidden">
        Nom du token sélectionné : {selectedTokenName.toUpperCase()}
      </div> */}
      <div className="flex gap-1 items-center mt-2.5 pt-[3%]">
        {/* <BsArrowLeftShort
          className="text-2xl cursor-pointer"
          onClick={() => setIsContentCleared("")}
        />
        <p>Bitcoin</p>
        <BsArrowRightShort className="text-2xl" />
        <p>Explorer</p>
        <BsArrowRightShort className="text-2xl" />
        {selectedTokenName.toUpperCase()} */}
      </div>
      <div className="w-full flex gap-6">
        <div className="flex flex-col w-3/4 gap-10">
          <div className="explorer_token_charts">
            <Charts_Tradingview />
          </div>
          <div className="explorer_token_data">
            {showNFTContent ? (
              <nav className="topline_1">
                <table>
                  <thead>
                    <th>Token</th>
                    <th>Deploy Time</th>
                    <th>Holders</th>
                    <th>Transaction</th>
                    <th>Progress%</th>
                  </thead>
                  <tbody className="semi">
                    {data.map((token, index) => (
                      <TickComponent2 tokenData={token} index={index + 1} />
                    ))}
                  </tbody>
                </table>
              </nav>
            ) : showTokenContent ? (
              <nav className="topline_1">
                <table>
                  <thead>
                    <th>Date</th>
                    <th></th>
                    <th>Type</th>
                    <th>USD</th>
                    <th>$LITE</th>
                    <th>Price</th>
                    <th>TXN</th>
                    <th>Supply</th>
                  </thead>
                  <tbody className="semi">
                    {data.map((token, index) => (
                      <TickComponent tokenData={token} index={index + 1} />
                    ))}
                  </tbody>
                </table>
              </nav>
            ) : showTransactionContent ? (
              <nav className="topline_1">
                <table>
                  <thead>
                    <tr>
                      <th className="user">User</th>
                      <th>Net worth</th>
                      <th>Top token</th>
                    </tr>
                  </thead>
                  <tbody className="semi">
                    {data.map((token, index) => (
                      <TickComponent3 key={index} tokenData={token} />
                    ))}
                  </tbody>
                </table>
              </nav>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-[40%]">
          <div className="w-[25%] mb-[5%] ml-[70%] border bg-[#2F207C] justify-items-end border-[#2F207C] p-[1%] rounded">
            <input
              type="text"
              placeholder="Search"
              className="text-right pr-[5%]"
            />
          </div>
          {/* DataToken */}

          <DataToken />

          {/* DataToken end*/}
        </div>
      </div>
    </>
  );
}
