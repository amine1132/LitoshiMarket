import React, { useEffect, useState } from "react";
import axios from "axios";
import litoshi from "./litoshi.svg";
import cercle from "./Cercle.svg";
import Vector from "./Vector.svg";
import element3 from "./element3.svg";
import Footer from "./Footer.svg";
import "./Watchlist.css";
import footer2 from "./footer2.svg";
import footer3 from "./footer3.svg";
import globalsearch from "./globalsearch.svg";
import logofooter from "./logofooter.svg";
import notification from "./notification.svg";
import Group5333 from "./Group5333.svg";
import test1 from "./test1.svg";
import test2 from "./test2.svg";
import test3 from "./test3.svg";
import ouai from "./ouai.svg";
import search from "./search.svg";
import homme from "./homme.svg";
import chartcircle from "./chartcircle.svg";
import Chart, { Chart as ChartJS, defaults } from "chart.js/auto";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useMatch,
} from "react-router-dom";
import { BsStar } from "react-icons/bs";
import Bitcoin from "./BitcoinBTC.svg";
import dogecoindogelogo from "./DogecoinDRC.svg";
import Ethereum from "./Ethereum.svg";

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

function Explorer() {
  const [data, setData] = useState([]);
  const [totalMarketCap, setTotalMarketCap] = useState(0.0);
  const [totalVols24h, setTotalVols24h] = useState(0.0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
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
      data.forEach((token) => {
        token.star = <BsStar />;
        token.vol_24h = token.vol_24h * Math.pow(10, -8) * btc_price;
        token.marketcap = token.marketcap * Math.pow(10, -8) * btc_price;
        token.price = token.marketcap / token.max_supply;
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

  const [isOver1000Px, setIsOver1000Px] = useState(true);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth > 1000) {
      setIsOver1000Px(true);
    } else {
      setIsOver1000Px(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="max">
      <div className="colone">
        <div className="idk">
          <header>
            <div className="top">
              <div className="style">
                <div className="stylev2">
                  <div className="filtre-dashboard">
                    <p>Chains filter</p>
                    <button onClick={() => handleFilterClick("")}>ALL</button>
                    <button
                      type="button"
                      className="btc"
                      onClick={() => handleFilterClick("bitcoin")}
                    >
                      <img src={Bitcoin} alt="" />
                      {isOver1000Px && <div>Bitcoin</div>}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFilterClick("litecoin")}
                    >
                      <img src={litecoinltclogo} alt="" />
                      {isOver1000Px && <div>Litecoin</div>}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFilterClick("dogechain")}
                    >
                      <img src={dogecoindogelogo} alt="" />
                      {isOver1000Px && <div>Dogechain</div>}
                    </button>
                  </div>
                </div>
              </div>
              <div className="style"></div>
              <div className="input">
                {/* <button onClick={requestAccounts}>Connect your wallet</button> */}
                <div className="notif"></div>
              </div>
            </div>
          </header>
          <div className="scroll_contenu">
            <div className="groupe_watchlisttotal">
              <div className="groupe1">
                <div className="box_1">
                  <div className="group_v1">
                    <div className="group1_">
                      <p>Total</p>
                      {showMarketCapContent ? (
                        <>
                          <h1>
                            24h Vol :{" "}
                            {Number(totalVols24h).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 0,
                            })}
                          </h1>
                        </>
                      ) : show24hVolContent ? (
                        <div></div>
                      ) : null}
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="groupe2">
                <div className="box_1">
                  <div className="group_v1">
                    <div className="group1_">
                      <p>Total</p>
                      {showMarketCapContent ? (
                        <>
                          <h1>
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
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="watchlist-flexbutton">
              <div className="watchlist-buttontop">
                <button type="">My BRC</button>
                <button type="">New Watchlist</button>
                <button type="">Add pair</button>
              </div>
              <div className="watchlist-buttontop2">
                <button type="">Add an alert</button>
                <button type="">Share this watchlist</button>
              </div>
            </div>
            <div className="groupe2">
              <div className="box3">
                <div className="topv1_">
                  <p className="semi">Watchlist</p>
                  <button
                    type="button"
                    onClick={handleTokenButtonClick}
                    className="tokens"
                  >
                    Market Cap
                  </button>
                  <button
                    type="button"
                    onClick={handleNFTButtonClick}
                    className="mint"
                  >
                    Mint
                  </button>
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
                          <TickComponent2 tokenData={token} index={index + 1} />
                        ))}
                      </tbody>
                    </table>
                  </nav>
                ) : showTokenContent ? (
                  <nav className="topline_1">
                    <table>
                      <thead>
                        <th></th>
                        <th></th>
                        <th>Token</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>24h Volume</th>
                        <th>Market Cap</th>
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
          </div>
        </div>
        <div className="ellipse"></div>
      </div>
    </div>
  );
}

function TickComponent({ tokenData, index }) {
  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + "M";
    } else {
      return balance.toString();
    }
  };

  return (
    <>
      <tr>
        <td className="iconoutline">{tokenData.star}</td>
        <td className="number_table">{index}</td>
        <td className="border_bottom">{tokenData.tick.toUpperCase()}</td>
        <td className="border_bottom">
          {tokenData.price
            ? parseFloat(tokenData.price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })
            : "N/A"}
        </td>
        <td
          className={
            tokenData.change_24h && parseFloat(tokenData.change_24h) < 0
              ? "negative"
              : tokenData.change_24h && parseFloat(tokenData.change_24h) > 0
              ? "positive"
              : "na"
          }
        >
          {tokenData.change_24h
            ? (parseFloat(tokenData.change_24h) >= 0 ? "+" : "") +
              parseFloat(tokenData.change_24h).toFixed(2) +
              "%"
            : "N/A"}
        </td>
        <td className="border_bottom">
          {Number(tokenData.vol_24h).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </td>
        <td className="border_bottom">
          {tokenData.marketcap
            ? Number(tokenData.marketcap).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })
            : "N/A"}
        </td>
        <td className="border_bottom">{formatBalance(tokenData.max_supply)}</td>
      </tr>
    </>
  );
}

function TickComponent2({ tokenData, index }) {
  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + "M";
    } else {
      return balance.toString();
    }
  };

  return (
    <>
      <tr>
        <td className="border_bottom">{tokenData.tick.toUpperCase()}</td>
        <td className="border_bottom">25 May 2023 22:38:40</td>
        <td
          className={
            tokenData.change_24h && parseFloat(tokenData.change_24h) < 0
              ? "negative"
              : tokenData.change_24h && parseFloat(tokenData.change_24h) > 0
              ? "positive"
              : "na"
          }
        >
          {tokenData.change_24h
            ? (parseFloat(tokenData.change_24h) >= 0 ? "+" : "") +
              parseFloat(tokenData.change_24h).toFixed(2) +
              "%"
            : "N/A"}
        </td>
        <td className="border_bottom">
          {Number(tokenData.vol_24h).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </td>
        <td className="border_bottombar">
          <div>100%</div>
          <div className="progressbar"></div>
        </td>
      </tr>
    </>
  );
}

function TickComponent3({ tokenData, index }) {
  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + "M";
    } else {
      return balance.toString();
    }
  };

  return (
    <>
      <tr>
        <td className="border_bottomprofil">
          {" "}
          <img src={homme} alt="" />
          <span>bc1pq4es...4skewgrv</span>
        </td>
        <td className="border_bottom">
          {tokenData.marketcap
            ? Number(tokenData.marketcap).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })
            : "N/A"}
        </td>
        <td className="border_bottomtoptoken">
          {" "}
          <img src={Bitcoin} alt="" />
          99%{" "}
        </td>
      </tr>
    </>
  );
}

export default Explorer;
