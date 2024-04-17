import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import Explorer_chart from "../../components/Explorer/Explorer_chart";
import Modalv2 from "../../components/Explorer/Modalv2";
import DataToken from "./DataTokenComponent";
import Charts_Tradingview from "../../components/Chart/Charts_Tradingview";
import ChartTradingView from "../../components/Chart/ChartTradingView";
import ChartPrepare from "../../components/Chart/ChartPrepare";
import NavButtons from "../../components/Navbars/NavButtons";

export default function Condition_explorer(tokenData) {
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
      <div className="mt-[40px]">
        <NavButtons />
      </div>
      <div className="ml-[1.85%]">
        <div className="w-full flex h-full gap-[60px] mt-5">
          <div className="flex flex-col w-3/4 gap-5">
            <div
              id="chartmescouilles"
              className="explorer_token_charts rounded-lg h-[610px]"
            >
              <ChartPrepare Token={tokenData} />
            </div>
            <div className="flex">
              <div className="explorer_token_data rounded-lg h-[190px] overflow-y-auto">
                {/* {showNFTContent ? (
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
            )} */}
                <table className="text-left ml-[2.5%] w-[95%] text-sm">
                  <thead className="  border-[#FFFFFF] border-opacity-20 border-b">
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Total</th>
                  </thead>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <tbody
                      key={index}
                      className="semi   border-[#FFFFFF] border-opacity-20 border-b"
                    >
                      <td className="">d</td>
                      <td className="">d</td>
                      <td className="">d</td>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="explorer_token_data rounded-lg h-[190px] overflow-y-auto">
                {/* {showNFTContent ? (
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
            )} */}
                <table className="text-left ml-[2.5%] w-[95%] text-sm">
                  <thead className="  border-[#FFFFFF] border-opacity-20 border-b">
                    <th>Date</th>
                    <th>Type</th>
                    <th>Total </th>
                  </thead>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <tbody
                      key={index}
                      className="semi   border-[#FFFFFF] border-opacity-20 border-b"
                    >
                      <td className="">d</td>
                      <td className="">d</td>
                      <td className="">d</td>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[20%] ">
            {/* DataToken */}

            <DataToken Token={tokenData} />

            {/* DataToken end*/}
          </div>
        </div>
      </div>
    </>
  );
}
