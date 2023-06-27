import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import litoshi from "./litoshi.svg";
import cercle from "./Cercle.svg";
import Vector from "./Vector.svg";
import element3 from "./element3.svg";
import Footer from "./Footer.svg";
import footer2 from "./footer2.svg";
import footer3 from "./footer3.svg";
import globalsearch from "./globalsearch.svg";
import Group_427319828 from "./Group_427319828.svg";
import notification from "./notification.svg";
import Group5333 from "./Group5333.svg";
import ouai from "./ouai.svg";
import wallet from "./wallet.svg";
import map from "./map.svg";
import web from "./Web.svg";
import newgraph from "./newgraph.svg";
import search from "./search.svg";
import homme from "./homme.svg";
import profile from "./Profile.svg";
import test3 from "./test3.svg";
import chartcircle from "./chartcircle.svg";
import Chart, { Chart as ChartJS, defaults } from "chart.js/auto";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Explorer from "./Explorer/Explorer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useMatch,
} from "react-router-dom";
import Bitcoin from "./BitcoinBTC.svg";
import litecoinltclogo from "./litecoinLTC.svg";
import dogecoindogelogo from "./DogecoinDRC.svg";
import Ethereum from "./Ethereum.svg";
import { FaRegCopy } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import Agreecookies from "./Cookies";
import NFT from "./Nft.png";
import "./Mont/Mont-Bold.otf";
import "./Mont/Mont-Regular.otf";
import "./Mont/Mont-SemiBold.otf";

const address =
  "bc1pq4esrv5qkfpxahw8789j0yz2ymfzkq63qd4dluq2j08exca6um4skewgrv";

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
        padding: 17, // Spacing between labels
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

function Dashboard() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [overall_balance, setOverallBalance] = useState(0.0);
  const [available_balance, setAvailableBalance] = useState(0.0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [showTransactionContent, setShowTransactionContent] = useState(false);
  const [isGraphContent, setIsGraphContent] = useState(false);
  const [box3Content, setBox3Content] = useState("Token Content");
  const [loading, setLoading] = useState(false);
  const [uniSatAvailable, setUniSatAvailable] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const nftImageUrl =
    "https://ordinalslite.com/content/e43b3f3f1c88468127196f46909b1be7fde7d3d173c4c4ceb94abcbceea542d7i0";
  const nftImageUrl2 =
    "https://ordinalslite.com/content/78e5fc19ef198cb37d430075fa226a11ed9df72a3513b262ddd8b07792725112i0";
  const nftImageUrl3 =
    "https://ordinalslite.com/content/a883bd5330b441d537deb4340431d37890425e38f1411c69a46b516eea8d0aa0i0";
  const nftImageUrl4 =
    "https://ordinalslite.com/content/e43b3f3f1c88468127196f46909b1be7fde7d3d173c4c4ceb94abcbceea542d7i0";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://brc20api.bestinslot.xyz/v1/get_brc20_balance/" + address
      );
      var jsonData = response.data;
      // only tokens with a strictly positive overall balance are recovered
      jsonData = jsonData
        .filter((token) => token.overall_balance > 0)
        .map((token) => ({
          ...token,
          overall_balance: parseFloat(token.overall_balance),
          available_balance: parseFloat(token.available_balance),
        }));

      // Extensive data recovery for each token
      // const sortedData = await axios.get('https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/1/1');
      var tokenData = [];
      try {
        tokenData = await getTokenData(jsonData);
      } catch (error) {
        console.error("Error while requesting API", error);
      }
      // tokens are sorted according to their overall_balances
      tokenData = tokenData.sort((a, b) => {
        return b["overall_balance"] - a["overall_balance"];
      });
      // Merge enhanced data with previous data
      setData(tokenData);

      // Calculate the value owned for each token and the total value

      // Formatting data for graphics
      const labels = tokenData.map((token) => token.tick);
      const overallBalances = tokenData.map(
        (token) => token.overall_usdc_balance
      );
      const numericOverallBalances = overallBalances.filter(
        (balance) => typeof balance === "number"
      );
      const totalOverallBalance = numericOverallBalances.reduce(
        (acc, val) => acc + val,
        0
      );
      setOverallBalance(totalOverallBalance);
      const availableBalances = tokenData.map(
        (token) => token.available_usdc_balance
      );
      const numericAvailableBalances = availableBalances.filter(
        (balance) => typeof balance === "number"
      );
      const totalAvailableBalance = numericAvailableBalances.reduce(
        (acc, val) => acc + val,
        0
      );
      setAvailableBalance(totalAvailableBalance);
      //const percentages = overallBalances.map(balance => parseInt((balance / totalOverallBalance) * 100, 10));

      const chartData = {
        labels: labels,
        datasets: [
          {
            data: overallBalances,
            borderWidth: 0.1,
            backgroundColor: ["#C46161", "#7AB75D", "#C6C85C", "#50439D"],
          },
        ],
      };

      // Creating the doughnut graphic
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: chartOptions,
      });

      // Chart status update
      setChartData(chart);
      setShowTokenContent(true);

      // Cleans up graphics when component is deactivated
      return () => {
        chart.destroy();
        if (chart) {
          chart.update();
        }
      };
    };

    const checkUniSatAvailability = () => {
      if (typeof window.unisat !== "undefined") {
        setUniSatAvailable(true);
      } else {
        setUniSatAvailable(false);
      }
    };
    checkUniSatAvailability();

    const checklitescribeAvailability = () => {
      if (typeof window.litescribe !== "undefined") {
        setUniSatAvailable(true);
      } else {
        setUniSatAvailable(false);
      }
    };
    checklitescribeAvailability();

    const handleCopyAddress = () => {
      const MySwal = withReactContent(Swal);

      const copyAddress = () => {
        navigator.clipboard
          .writeText(address)
          .then(() => {
            MySwal.fire({
              width: 200,
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 1500,
              icon: "success",
              title: "Copied",
            });
          })
          .catch((error) => {
            // Managing copy errors
            console.error("Copy failed:", error);
          });
      };

      const copyButtonElement = document.getElementById("copyAddress");
      copyButtonElement.addEventListener("click", copyAddress);
    };

    handleCopyAddress();

    fetchData();
  }, []);

  const getTokenData = async (jsonData) => {
    var currentPage = 1;
    const tokenData = new Set();

    const tokens = jsonData.map((token) => token.tick);
    var remainingTokens = tokens;

    const response = await axios.get(
      "https://api.coinbase.com/v2/prices/BTC-USD/spot",
      {
        headers: {},
      }
    );
    const btc_price = response.data.data.amount;

    while (true) {
      try {
        const sortedData = await axios.get(
          "https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/0/" +
            currentPage
        );

        if (sortedData.length === 0) {
          break; // Exit the while loop if the maximum number of pages has been reached
        }

        // Data recovery for owned tokens
        const filteredData = sortedData.data.items.filter((token) =>
          tokens.includes(token.tick)
        );
        filteredData.forEach((token) => {
          const tickData = jsonData.find((obj) => obj.tick === token.tick);
          token.overall_balance = tickData.overall_balance;
          token.available_balance = tickData.available_balance;
          token.marketcap = token.marketcap * Math.pow(10, -8) * btc_price; // marketcap (en btc), martket_cap (en usdc)
          token.price = token.marketcap / token.max_supply;
          token.overall_usdc_balance =
            parseFloat(tickData.overall_balance) * token.price;
          token.available_usdc_balance =
            parseFloat(tickData.available_balance) * token.price;
          tokenData.add(token);
        });

        // Update list of missing tokens
        const retrievedTokens = [...tokenData].map((token) => token.tick);
        remainingTokens = tokens.filter(
          (token) => !retrievedTokens.includes(token)
        );

        if (remainingTokens.length === 0) {
          break; // Exit while loop if all data has been retrieved
        }

        currentPage += 1;
      } catch (error) {
        console.error("Error while requesting API", error);
        break;
      }
    }
    var chart = Chart.getChart("0"); // Retrieve existing graphic with ID '0
    if (chart) {
      chart.destroy(); // Destroy existing graphics
    }

    return [
      ...tokenData,
      ...jsonData.filter((token) => remainingTokens.includes(token.tick)),
    ]; // Convert set to array and add tokens for which no data has been found
  };

  const handleNFTButtonClick = () => {
    setShowNFTContent(true);
    setBox3Content("Initial Content");
  };

  const handleTokenButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(true);
    setBox3Content("Token Content");
  };

  const handleTransactionButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(false);
    setShowTransactionContent(true);
  };

  const requestAccounts = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      console.log("connect success", accounts);
      setIsConnected(true);
    } catch (e) {
      console.log("connect failed");
      setIsLoggedOut(true);
    }
  };

  function formatAddress(address) {
    const length = address.length;
    const firstChars = address.substring(0, 8);
    const lastChars = address.substring(length - 8, length);
    return `${firstChars}...${lastChars}`;
  }
  function formatAddress_(address) {
    const length = address.length;
    const firstChars = address.substring(0, 8);
    const lastChars = address.substring(length - 2, length);
    return address;
  }

  const donnees = [
    { chiffre: 1, image: "chemin/image1.png" },
    { chiffre: 2, image: "chemin/image2.png" },
    // Add more table entries
  ];
  const moitieSuperieure = donnees.slice(0, Math.ceil(donnees.length / 2));
  const moitieInferieure = donnees.slice(Math.ceil(donnees.length / 2));

  return (
    <>
      <div className="max_1">
        <div className="colone">
          <div className="idk_1">
            <header>
              <div className="top">
                <div className="style">
                  <div className="stylev2">
                    <div className="filtre-dashboard">
                      <p>Chains filter</p>
                      <button>ALL</button>
                      <button type="button" className="btc">
                        <img src={Bitcoin} alt="" />
                        Bitcoin
                      </button>
                      <Link to="/dashboard/litecoin">
                        <button type="button">
                          <img src={litecoinltclogo} alt="" />
                          Litecoin
                        </button>
                      </Link>
                      <button type="button">
                        <img src={dogecoindogelogo} alt="" />
                        Dogechain
                      </button>
                      <Tooltip title="Copy address">
                        <div className="copy" id="copyAddress">
                          <FaRegCopy />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="input">
                  <div className="loupe_">
                    <img src={search} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Token,pair,address..."
                    className="formulaire_2"
                  />
                  <button onClick={requestAccounts}>Connect your wallet</button>
                  <div className="notif"></div>
                </div>
              </div>
            </header>
            <div className="scroll_contenu_1">
              {isConnected && (
                <div className="groupe_profile">
                  <img src={profile} alt="" className="profile-image" />
                  <div className="groupe2_profile">
                    <div className="profile_adress">
                      <p>{formatAddress_(address)}</p>
                    </div>
                    <div className="profile_button">
                      <button type="button">
                        {" "}
                        <img src={test3} alt="" />
                        Add Twitter
                      </button>
                      <button type="button">
                        {" "}
                        <img src={web} alt="" />
                        Add website
                      </button>
                      <button type="button">
                        {" "}
                        <img src={map} alt="" />
                        Add localisation
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="groupe1">
                <div className="box1">
                  <div className="groupv1">
                    <div className="group1">
                      <p>My Wallet</p>
                      <h1>
                        Total:{" "}
                        {overall_balance.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h1>
                    </div>
                    <div className="group2">
                      <p className="blanc">Available</p>
                      <p className="semi">
                        {available_balance.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                      {/*product amount data*/}
                    </div>
                    <div className="group3">
                      <p className="blanc">Transferable</p>
                      <p className="semi">
                        {(overall_balance - available_balance).toLocaleString(
                          "en-US",
                          { style: "currency", currency: "USD" }
                        )}
                      </p>
                      {/*product amount data*/}
                    </div>
                  </div>
                  <div>
                    <img src={Group_427319828} alt="" />
                  </div>
                </div>
                <div className="box2_">
                  <div className="donnees">
                    <p>Average of your wallet</p>
                  </div>
                  {isGraphContent ? (
                    <>
                      <div className="comingsoon"> Coming Soon..</div>
                      <div className="blur">
                        <div className="argent">$243,600</div>
                        <img src={newgraph} alt="" className="graph533" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="graph">
                        <canvas id="myChart"></canvas>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="groupe2">
                <div className="box3_">
                  <div className="topv1">
                    <p className="semi">My Assets</p>
                    <button type="button" onClick={handleTokenButtonClick}>
                      Token
                    </button>
                    <button type="button" onClick={handleNFTButtonClick}>
                      NFT
                    </button>
                    <button
                      type="button"
                      onClick={handleTransactionButtonClick}
                    >
                      Transaction
                    </button>
                  </div>
                  {showNFTContent ? (
                    <div className="nft">
                      <div className="box">
                        <div>
                          <img src={nftImageUrl} alt="" />
                        </div>
                        <div className="text_8">
                          <p className="desc">Moonbird#3688</p>
                          <p className="desc">0,1 LTC</p>
                        </div>
                      </div>
                      <div className="box">
                        <div>
                          <img src={nftImageUrl2} alt="" />
                        </div>
                        <div className="text_8">
                          <p className="desc">Moonbird#3689</p>
                          <p className="desc">0,1 LTC</p>
                        </div>
                      </div>
                      <div className="box">
                        <div>
                          <img src={nftImageUrl3} alt="" />
                        </div>
                        <div className="text_8">
                          <p className="desc">Moonbird#3690</p>
                          <p className="desc">0,1 LTC</p>
                        </div>
                      </div>
                    </div>
                  ) : showTokenContent ? (
                    <nav className="topline">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Positions</th>
                            <th>Price</th>
                            <th>24h</th>
                            <th>Available</th>
                            <th>Transferable</th>
                            <th>Marketcap</th>
                          </tr>
                        </thead>
                        <tbody className="semi">
                          {data.map((token, index) => (
                            <TickComponent key={index} tokenData={token} />
                          ))}
                        </tbody>
                      </table>
                    </nav>
                  ) : showTransactionContent ? (
                    <nav className="topline">
                      <table>
                        <thead>
                          <tr>
                            <th>Transaction ID</th>
                            <th>Time</th>
                            <th>Content</th>
                            <th>From</th>
                            <th>To</th>
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
    </>
  );
}

function TickComponent({ tokenData }) {
  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + "M";
    } else {
      return balance.toString();
    }
  };

  function formatPrice(price) {
    // Check if the price is greater than 1
    if (price > 1) {
      return price.toFixed(2); // Display price to 4 decimal places
    } else {
      return price.toFixed(4); // Return the original price unchanged
    }
  }

  return (
    <>
      <tr>
        <td className="border_bottom">{tokenData.tick.toUpperCase()}</td>
        <td className="border_bottom">
          {formatBalance(tokenData.overall_balance)}
        </td>
        <td className="border_bottom">
          {tokenData.price ? "$" + formatPrice(tokenData.price) : "N/A"}
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
          {formatBalance(tokenData.available_balance)}
        </td>
        <td className="border_bottom">
          {formatBalance(
            tokenData.overall_balance - tokenData.available_balance
          )}
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
      </tr>
    </>
  );
}

function TickComponent3({ tokenData }) {
  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + "M";
    } else {
      return balance.toString();
    }
  };

  function formatPrice(price) {
    if (price > 1) {
      const formattedPrice = price.toFixed(2);
      return <>{formattedPrice}</>;
    } else {
      return <>{price.toFixed(4)}</>;
    }
  }

  return (
    <>
      <tr>
        <td className="border_bottom">
          <span>bc1pq4es...4skewgrv</span>
        </td>
        <td className="border_bottom">25 May 2023 22:38:40</td>
        <td className="border_bottom">
          {tokenData.price ? (
            <>
              <span className="green">+1 HOGS</span>
              <span className="green"> ($</span>
              <span className="green"> {formatPrice(tokenData.price)}) </span>
            </>
          ) : (
            <>
              <div className="nfttable">
                <img src={NFT} alt="" />
                <p className="green"> +1 Orbiter Trainee Pilot NFT</p>
                <div className="enlarged-image">
                  <img src={NFT} alt="" />
                </div>
              </div>
            </>
          )}
        </td>
        <td className="border_bottom">bc1pq4es...4skewgrv </td>
        <td className="border_bottom">bc1pq4es...4skewgrv </td>
      </tr>
    </>
  );
}

export default Dashboard;
