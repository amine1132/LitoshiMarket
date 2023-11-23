import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import Explorer_chart from "../../components/Explorer_yanis/Explorer_chart";
import Modalv2 from "../../components/Explorer_yanis/Modalv2";

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
      <div className="hidden">
        Nom du token sélectionné : {selectedTokenName.toUpperCase()}
      </div>
      <div className="flex gap-1 items-center mt-2.5">
        <BsArrowLeftShort
          className="text-2xl cursor-pointer"
          onClick={() => setIsContentCleared("")}
        />
        <p>Bitcoin</p>
        <BsArrowRightShort className="text-2xl" />
        <p>Explorer</p>
        <BsArrowRightShort className="text-2xl" />
        {selectedTokenName.toUpperCase()}
      </div>
      <div className="w-full flex gap-6">
        <div className="flex flex-col w-3/4 gap-10">
          <div className="explorer_token_charts">
            <Explorer_chart />
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
        <div className="explorer_token_table">
          <p>LITS/LITE</p>
          <div className="explorer_token_flex1">
            <p>Price USD</p>
            <p>Marketcap{totalMarketCap}</p>
          </div>
          <div className="explorer_token_flex1">
            <p>5M</p>
            <p>1H</p>
            <p>24H</p>
          </div>
          <div className="explorer_token_flex2">
            <div className="flex justify-around	">
              <p>TXNS</p>
              <p>Volume</p>
            </div>
            <div className="flex justify-around">
              <p>Buys</p>
              <p>SELLS</p>
            </div>
            <div className="flex justify-around">
              <p>BUY VOL</p>
              <p>SELL VOL</p>
            </div>
          </div>
          <div className="flex_justify-content">
            <div className="flex flex-col w-full items-center gap-2">
              <button>Watchlist</button>
              <Modalv2 />
              <button>Trade on unilit</button>
            </div>
          </div>
          <div className="token_created">
            <p>Token created</p>
          </div>
          <div className="flex flex-col gap-5">
            <input type="text" className="border-solid border-3" />
            <input type="text" className="border-solid" />
          </div>
          <div className="flex justify-around">
            <button>discord</button>
            <button>twitter</button>
            <button>github</button>
            <button>medium</button>
          </div>
        </div>
      </div>
    </>
  );
}
