import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explorer.css";
import Group5333 from "#assets/explorer/Group5333.svg";
import { BsStar } from "react-icons/bs";
import TickComponent from "./TickComponent";
import TickComponent2 from "./TickComponent2";
import TickComponent3 from "./TickComponent3";
import Condition_explorer from "./Condition_explorer";
import Filtre from '../../utils/Filtre';
import WelcomeMessage from '../../components/Elements/WelcomeBack'

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "left",
      family: "MontRegular",
      labels: {
        color: "white",
        usePointStyle: true,
        pointStyle: "rect",
        padding: 15, // Spacing between labels
        borderWidth: 10,
        font: {
          size: 16, // Change the size of caption text
          family: "MontRegular",
        },
      },
    },
    layout: {
      padding: {
        left: 200, // Doughnut left spacing
      },
    },
  },
  cutout: 80,
  elements: {
    arc: {
      borderWidth: 2, // Edge thickness
    },
  },
};

function Explorer({ tokenData }) {
  const [data, setData] = useState([]);
  const [totalMarketCap, setTotalMarketCap] = useState(0.0);
  const [totalVols24h, setTotalVols24h] = useState(0.0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [isContentCleared, setIsContentCleared] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showTransactionContent, setShowTransactionContent] = useState(false);
  const [showMarketCapContent, setShowMarketCapContent] = useState(true);
  const [show24hVolContent, setShow24hVolContent] = useState(false);
  const [isGraphContent, setIsGraphContent] = useState(false);
  const [box3Content, setBox3Content] = useState("Token Content");
  const [loading, setLoading] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [uniSatAvailable, setUniSatAvailable] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // BTC/USDC exchange recovery
      const response = await axios.get(
        "https://api.coinbase.com/v2/prices/BTC-USD/spot",
        {
          headers: {},
        }
      );
      const btc_price = response.data.data.amount;

      // Sort by flight_24h and retrieve extended data for each token
      const sortedData = await axios.get(
        "https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/0/1"
      );
      const data = sortedData.data.items;
      let compteur = 1;
      data.forEach((token) => {
        token.star = <BsStar />;
        token.vol_24h = token.vol_24h * Math.pow(10, -8) * btc_price;
        token.marketcap = token.marketcap * Math.pow(10, -8) * btc_price;
        token.price = token.marketcap / token.max_supply;
        token.index = compteur;
        compteur += 1 ;
      });
      // Merge enhanced data with previous data
      setData(data);

      const marketCaps = data.map((token) => token.marketcap);
      const totalMarketCap = marketCaps.reduce((acc, val) => acc + val, 0);
      setTotalMarketCap(totalMarketCap);

      const vols24h = data.map((token) => token.vol_24h);
      const totalVols24h = vols24h.reduce((acc, val) => acc + val, 0);
      setTotalVols24h(totalVols24h);
    };

    const checkUniSatAvailability = () => {
      if (typeof window.unisat !== "undefined") {
        setUniSatAvailable(true);
      } else {
        setUniSatAvailable(false);
      }
    };
    checkUniSatAvailability();

    setShowTokenContent(true);

    fetchData();
  }, []);

  const handleNFTButtonClick = () => {
    setShowNFTContent(true);
    setBox3Content("Initial Content");
  };

  const handleTokenButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(true);
    setBox3Content("Token Content");
  };

  const handleGraphButtonClick = () => {
    setIsGraphContent(!isGraphContent);
  };

  const handleMarketCapButtonClick = () => {
    setShowMarketCapContent(true);
    setShow24hVolContent(false);
  };

  const handle24hVolButtonClick = () => {
    setShowMarketCapContent(false);
    setShow24hVolContent(true);
  };

  function handleTableRowClick(token) {
    setSelectedToken(token);
    setIsContentCleared(true);
  }

  const handleTransactionButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(false);
    setShowTransactionContent(true);
  };

  const requestAccounts = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      setAccounts(accounts);
      console.log("Connect success", accounts);
      setIsConnected(true);
    } catch (e) {
      console.log("Connect failed");
      setIsLoggedOut(true);
    }
  };

  function formatAddress(address) {
    const length = address.length;
    const firstChars = address.substring(0, 8);
    const lastChars = address.substring(length - 8, length);
    return `${firstChars}...${lastChars}`;
  }

  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  // FILTRE

  const [sortOrder,setSortOrder] = useState(null);

  let tokenName = "token";
  let priceName = "price";
  let marketCapName = "marketcap";
  let volumeName = "vol_24h";
  let supplyName = "max_supply";
  let _24hName = "change_24h";
  let indexToken = "index";

  const [Arrows, setArrows] = useState([
    { name: tokenName, arrow: "" },
    { name: priceName, arrow: "" },
    { name: marketCapName, arrow: "" },
    { name: volumeName, arrow: "" },
    { name: supplyName, arrow: "" },
    { name: _24hName, arrow: "" },
    { name: indexToken, arrow: "" },
  ]);

  // FIN FILTRE

  const buttonsTailWindCssTOP = "tokens pb-[35px] p-[10px] pr-[15px] pl-[15px] whitespace-nowrap"
  const buttonsTailWindCss2ND = "tokens pb-[35px] p-[10px] pr-[15px] pl-[15px]"

  return (
    <div className="max">
      {isContentCleared ? (
        selectedToken ? (
          <>
            <Condition_explorer Token={selectedToken}/>
          </>
        ) : (
          <></>
        )
      ) : (
        <div className="colone">
          <div className="idk">
            <header>
              <div className="top">
                <div className="style">
                  <WelcomeMessage/>
                </div>
              </div>
            </header>
            <div className="scroll_contenu">
              <div className="groupe1">
                <div className="box_1 ">
                  <div className="group_v1">
                    <div className="group1_">
                      <p>Total</p>

                      <div className="flex">

                      {showMarketCapContent ? (
                        <>
                          <h1 className="text-2xl">
                            Market Cap :{" "}
                            {Number(totalMarketCap).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 0,
                            })}
                          </h1>
                        </>
                      ) : show24hVolContent ? (
                        <div></div>
                      ) : null}
                      
                      {/* <h1 className="text-xl">$250,000</h1> */}
                      </div>

                        <div className="flex pt-[2%]">
                          <button
                            type="button"
                            onClick={handleTokenButtonClick}
                            className={buttonsTailWindCssTOP}
                          >
                            Market Cap
                          </button>
                          <button
                            type="button"
                            onClick={handleTokenButtonClick}
                            className={buttonsTailWindCssTOP}
                          >
                            24h Vol
                          </button>
                          <button
                            type="button"
                            onClick={handleTokenButtonClick}
                            className={buttonsTailWindCssTOP}
                          >
                            Dominance
                          </button>
                          <button
                            type="button"
                            onClick={handleTokenButtonClick}
                            className={buttonsTailWindCssTOP}
                          >
                            Coins
                          </button>
                        </div>

                    </div>
                    <div className="group2_">
                      <div className="blur">
                        <div className="argent_">$243,600</div>
                        <img src={Group5333} alt="" className="graph533" />
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="groupe2">
                <div className="box3">
                  <div className="topv1_">
                    <p className="semi">
                      Top Market Cap / Cryptocurrency Prices
                    </p>
                    <button
                      type="button"
                      onClick={handleTokenButtonClick}
                      className={buttonsTailWindCss2ND}
                    >
                      Market Cap
                    </button>
                    <button
                      type="button"
                      onClick={handleTokenButtonClick}
                      className={buttonsTailWindCss2ND}
                    >
                      Mint
                    </button>
                    {/*<button
                    type="button"
                    onClick={handleNFTButtonClick}
                    className="mint"
                  >
                    Mint
                  </button>
                  <button type="button" onClick={handleTransactionButtonClick}>
                    Profile
                  </button>*/}
                  </div>
                  <div></div>
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
                            <TickComponent2
                              tokenData={token}
                              index={index + 1}
                            />
                          ))}
                        </tbody>
                      </table>
                    </nav>
                  ) : showTokenContent ? (
                    <nav className="topline_1">
                      <table>
                        <thead className="text-xs">
                          <th></th>
                          {/* <th className="hoverable" name={indexToken} onClick={() => Filtre(indexToken, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[6].arrow}</th> */}
                          <th className="hoverable" name={tokenName} onClick={() => Filtre(tokenName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{/*{Arrows[0].arrow}Token*/}</th>
                          <th className="hoverable" name={priceName} onClick={() => Filtre(priceName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[1].arrow}Price</th>
                          <th className="hoverable" name={_24hName} onClick={() => Filtre(_24hName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[5].arrow}24h</th>
                          <th className="hoverable" name={volumeName} onClick={() => Filtre(volumeName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[3].arrow}24h Volume</th>
                          <th className="hoverable" name={marketCapName} onClick={() => Filtre(marketCapName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[2].arrow}Market Cap</th>
                          <th className="hoverable" name={supplyName} onClick={() => Filtre(supplyName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[4].arrow}Supply</th>
                        </thead>
                        <tbody className="semi">
                          {data.map((token, index) => (
                            <TickComponent
                              onTableRowClick={handleTableRowClick}
                              tokenData={token}
                              index={index + 1}
                            />
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
<TickComponent />;
<TickComponent2 />;
<TickComponent3 />;

export default Explorer;
