import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tokens.css";
import litoshi from "./litoshi.svg";
import cercle from "./Cercle.svg";
import Vector from "./Vector.svg";
import element3 from "./element3.svg";
import Footer from "./Footer.svg";
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
import Bitcoin from "./Bitcoin.svg";
import litecoinltclogo from "./litecoinltclogo.svg";
import dogecoindogelogo from "./dogecoindogelogo.svg";
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

  return (
    <div className="max">
      <div className="colone">
        <div className="idk">
          <header>
            <div className="top">
              <div className="style"></div>
              <div className="input">
                <button onClick={requestAccounts}>Connect your wallet</button>
                <div className="notif"></div>
              </div>
            </div>
          </header>
          <div className="scroll_contenu">
            <div className="groupeflextokens">
              <div className="groupetotaltokens">
                <div className="groupe1">
                  <div className="box_1tokens"></div>
                </div>
                <div className="groupe2">
                  <div className="box3tokens">
                    <div></div>
                    {showNFTContent ? (
                      <nav className="topline_1tokens">
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
                      <nav className="topline_1tokens">
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
                              <TickComponent
                                tokenData={token}
                                index={index + 1}
                              />
                            ))}
                          </tbody>
                        </table>
                      </nav>
                    ) : showTransactionContent ? (
                      <nav className="topline_1tokens">
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
              <div className="groupe3tokens">
                <div className="groupe3tokens_title">
                  <p>LITS/LITE</p>
                </div>
                <div className="donneestokens">
                  <p>Price USD</p>
                  <p>Marketcap</p>
                </div>
                <div className="donneestokens">
                  <p>5M</p>
                  <p>1H</p>
                  <p>24H</p>
                </div>
                <div className="groupedonnee_tokensflex">
                  <div className="groupedonnee_tokens">
                    <p></p>
                  </div>
                </div>
                <div className="donneestokensbutton">
                  <button type="button">Watchlist</button>
                  <button type="button">Alerts</button>
                  <button type="button">Trade on Unilit</button>
                </div>
                <div className="day_tokens">
                  <p>Token created</p>
                  <p>9month ago</p>
                </div>
                <div className="tokens_input">
                  <input type="text" name="" value="" />
                  <img src={chartcircle} alt="" />
                  <input type="text" name="" value="" />
                </div>
                <div className="tokens_button">
                  <button type="button">
                    <img src={test3} alt="" />
                  </button>
                  <button type="button">
                    <img src={test2} alt="" />
                  </button>
                  <button type="button">
                    <img src={test1} alt="" />
                  </button>
                  <button type="button">
                    <img src={test1} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gauche">
          <div className="chain">
            <img src={litoshi} alt="" />
          </div>
          <div className="menu">
            <div className="menutop">
              <button className="connect" onClick={requestAccounts}>
                {" "}
                <img src={Footer} alt="" />
                Wallet login
              </button>
              <p className="section">Your profile</p>
              <div className="menu2">
                <Link to="/dashboard">
                  <button className="dashboard">
                    <img src={Vector} alt="" />
                    Dashboard
                  </button>
                </Link>
                <Link to="/explorer">
                  <button className="explorer">
                    <img src={globalsearch} alt="" />
                    Explorer
                  </button>
                </Link>
                <button className="watchlist">
                  <img src={ouai} alt="" />
                  Watchlist
                </button>
                <button className="alerts">
                  <img src={notification} alt="" />
                  Alerts
                </button>
                <button className="multicharts">
                  <img src={element3} alt="" />
                  Multicharts
                </button>
              </div>
              <p className="section">Tokens and chains</p>
              <div className="menuv1">
                <button className="BRC">
                  <img src={globalsearch} alt="" />
                  Overview
                </button>
                <button className="BRC2">
                  <img src={Bitcoin} alt="" />
                  BRC-20
                </button>
                <button className="LTC">
                  <img src={litecoinltclogo} alt="" />
                  LTC-20
                </button>
                <button className="DRC">
                  <img src={dogecoindogelogo} alt="" />
                  DRC-20
                </button>
              </div>
            </div>
            <div className="menufooter">
              <div className="ltsi">
                <a href="https://sale.litoshi.app">
                  <img src={logofooter} alt="" />
                  <p>Buy $LTSI</p>
                </a>
              </div>
              <div className="Logoicon">
                <a href="https://twitter.com/Litoshimarket">
                  <img src={test3} alt="" />
                </a>
                <a href="https://discord.gg/cJ6aGnPM">
                  <img src={test2} alt="" />
                </a>
                <a href="https://medium.com/@litebitmarket">
                  <img src={test1} alt="" />
                </a>
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
        <td className="iconoutlinetokens">{tokenData.star}</td>
        <td className="number_tabletokens">{index}</td>
        <td className="border_bottomtokens">{tokenData.tick.toUpperCase()}</td>
        <td className="border_bottomtokens">
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
              ? "negativetokens"
              : tokenData.change_24h && parseFloat(tokenData.change_24h) > 0
              ? "positivetokens"
              : "natokens"
          }
        >
          {tokenData.change_24h
            ? (parseFloat(tokenData.change_24h) >= 0 ? "+" : "") +
              parseFloat(tokenData.change_24h).toFixed(2) +
              "%"
            : "N/A"}
        </td>
        <td className="border_bottomtokens">
          {Number(tokenData.vol_24h).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </td>
        <td className="border_bottomtokens">
          {tokenData.marketcap
            ? Number(tokenData.marketcap).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })
            : "N/A"}
        </td>
        <td className="border_bottomtokens">
          {formatBalance(tokenData.max_supply)}
        </td>
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
