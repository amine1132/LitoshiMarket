import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import Group_427319828 from "#assets/dashboard/Group_427319828.svg";
import map from "#assets/dashboard/map.svg";
import web from "#assets/dashboard/Web.svg";
import newgraph from "#assets/dashboard/newgraph.svg";
import search from "#assets/dashboard/search.svg";
import profile from "#assets/dashboard/Profile.svg";
import test3 from "#assets/dashboard/test3.svg";
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
import Bitcoin from "#assets/dashboard/BitcoinBTC.svg";
import dogecoindogelogo from "#assets/dashboard/DogecoinDRC.svg";
import litecoinltclogo from "#assets/dashboard/LitecoinLTC.svg";
import { FaRegCopy } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import Agreecookies from "./Cookies";
import NFT from "#assets/dashboard/Nft.png";
import "./Mont/Mont-Bold.otf";
import "./Mont/Mont-Regular.otf";
import "./Mont/Mont-SemiBold.otf";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
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

function Dashboard({ wallet }) {
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
  const [isLoading, setIsLoading] = useState(true);
  const [uniSatAvailable, setUniSatAvailable] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [address, setAddress] = useState(null);
  const [dataFetched, setDataFetched] = useState();
  const [filteredBlockchain, setFilteredBlockchain] = useState();
  const [isOver1000Px, setIsOver1000Px] = useState(true);

  useEffect(() => {
    setFilteredBlockchain(dataFetched);
    console.log("filter");
    console.log(filteredBlockchain);
  }, [dataFetched]);

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

  const nftImageUrl =
    "https://ordinalslite.com/content/e43b3f3f1c88468127196f46909b1be7fde7d3d173c4c4ceb94abcbceea542d7i0";
  const nftImageUrl2 =
    "https://ordinalslite.com/content/78e5fc19ef198cb37d430075fa226a11ed9df72a3513b262ddd8b07792725112i0";
  const nftImageUrl3 =
    "https://ordinalslite.com/content/a883bd5330b441d537deb4340431d37890425e38f1411c69a46b516eea8d0aa0i0";
  const nftImageUrl4 =
    "https://ordinalslite.com/content/e43b3f3f1c88468127196f46909b1be7fde7d3d173c4c4ceb94abcbceea542d7i0";

  useEffect(() => {
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

    //fetchData();
  }, []);

  const getTokenData = async (walletBalances) => {
    const response = await axios.get(
      "https://api.coinbase.com/v2/prices/BTC-USD/spot",
      {
        headers: {},
      }
    );
    const btc_price = response.data.data.amount;

    //let totalOverallBalance = 0;
    //let totalAvailableBalance = 0;

    let newWalletBalances = [];
    for (let i = 0; i < walletBalances.length; i++) {
      let token = walletBalances[i];

      const responseMarketData = await axios.get(
        "https://tokensapi.litoshi.app/brc20/market_info?ticker=" + token.ticker
      );
      const tokenMarketData = responseMarketData.data.data;

      const responseSalesData = await axios.get(
        "https://tokensapi.litoshi.app/brc20/sales_info?ticker=" + token.ticker
      );
      const tokenSalesData = responseSalesData.data.data;
      s;

      const responseInfoData = await axios.get(
        "https://tokensapi.litoshi.app/brc20/ticker_info?ticker=" + token.ticker
      );
      const tokenData = responseInfoData.data.data;

      if (
        tokenMarketData !== undefined &&
        tokenMarketData.marketcap !== undefined
      ) {
        token.marketcap =
          tokenMarketData.marketcap * Math.pow(10, -8) * btc_price;
        token.price = token.marketcap / tokenData.max_supply;
        token.vol_24h = tokenSalesData.vol_1d * Math.pow(10, -8) * btc_price;
        token.overall_usdc_balance =
          parseFloat(token.overall_balance) * token.price;
        //totalOverallBalance += token.overall_usdc_balance;
        token.available_usdc_balance =
          parseFloat(token.available_balance) * token.price;
        //totalAvailableBalance += parseFloat(token.available_balance);
      } else {
        token.overall_usdc_balance = 0;
        token.available_usdc_balance = 0;
      }
      newWalletBalances.push(token);
    }

    /*walletBalances.forEach(async (token) => {
      const responseMarketData = await axios.get(
        "https://brc20.litoshi.app/brc20/market_info?ticker=" + token.ticker
      );
      const tokenMarketData = responseMarketData.data.data;
      const responseSalesData = await axios.get(
        "https://brc20.litoshi.app/brc20/sales_info?ticker=" + token.ticker
      );
      const tokenSalesData = responseSalesData.data.data;
      const responseInfoData = await axios.get(
        "https://brc20.litoshi.app/brc20/ticker_info?ticker=" + token.ticker
      );
      const tokenData = responseInfoData.data.data;

      if (
        tokenMarketData !== undefined &&
        tokenMarketData.marketcap !== undefined
      ) {
        token.marketcap =
          tokenMarketData.marketcap * Math.pow(10, -8) * btc_price; // marketcap (en btc)
        token.price = token.marketcap / tokenData.max_supply;
        token.vol_24h = tokenSalesData.vol_1d * Math.pow(10, -8) * btc_price;
        token.overall_usdc_balance = parseFloat(token.overall_balance) * token.price;
        totalOverallBalance += token.overall_usdc_balance;
        token.available_usdc_balance = parseFloat(token.available_balance) * token.price;
        totalAvailableBalance += token.available_balance;
      } else {
        token.overall_usdc_balance = 0;
        token.available_usdc_balance = 0;
      }
    });*/
    //setOverallBalance(totalOverallBalance);
    //setAvailableBalance(totalAvailableBalance);

    return newWalletBalances;
  };

  const fetchData = async () => {
    const cookieSessionResponse = await axios.get(
      "https://tokensapi.litoshi.app/"
    );

    if (cookieSessionResponse.status === 200) {
      console.log("Cookie Session Created");
      const walletAddress = await requestAccounts();
      console.log(walletAddress);

      const cookie = cookieSessionResponse.headers["set-cookie"];
      console.log(cookieSessionResponse.headers);
      console.log("Cookie Session :");
      console.log(cookie);

      const response = await axios.get(
        "https://tokensapi.litoshi.app/brc20/wallet_balances?address=" +
          walletAddress,
        {
          headers: {
            // Ajout du cookie à l'en-tête de la deuxième requête
            Cookie: cookie,
          },
        }
      );
    } else {
      console.log("Error while creating cookie session. ");
    }

    var walletBalances = response.data.data;
    console.log(walletBalances);

    // only tokens with a strictly positive overall balance are recovered
    walletBalances = walletBalances
      .filter((token) => parseFloat(token.overall_balance) > 0)
      .map((token) => ({
        ...token,
        overall_balance: parseFloat(token.overall_balance),
        available_balance: parseFloat(token.available_balance),
        blockchain: "bitcoin",
      }));

    setDataFetched(walletBalances);
    setFilteredBlockchain(walletBalances);
    setIsLoading(false);

    // Extensive data recovery for each token
    //try {
    walletBalances = await getTokenData(walletBalances);
    //} catch (error) {
    //console.error("Error while requesting API", error);
    //}

    // tokens are sorted according to their overall_balances
    let sortedWalletBalances = walletBalances.sort((a, b) => {
      return b["overall_balance"] - a["overall_balance"];
    });

    setDataFetched(sortedWalletBalances);
    setFilteredBlockchain(sortedWalletBalances);

    // Formatting data for graphics
    // Sorting balances for the doughnut
    /*sortedWalletBalances = walletBalances.sort((a, b) => {
      return b["overall_usdc_balance"] - a["overall_usdc_balance"];
    });*/
    //const definedWalletBalances = sortedWalletBalances.filter(token => token.overall_usdc_balance !== undefined);
    //console.log(definedWalletBalances);

    const labels = sortedWalletBalances.map((token) => token.ticker);
    const overallBalances = sortedWalletBalances.map(
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
    const availableBalances = sortedWalletBalances.map(
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
    const percentages = overallBalances.map((balance) =>
      parseInt((balance / totalOverallBalance) * 100, 10)
    );

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

  const handleNFTButtonClick = () => {
    setShowNFTContent(true);
    setBox3Content("Initial Content");
  };

  const handleTokenButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(true);
    fetchData();
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
      setAddress(accounts[0]);
      return accounts[0];
    } catch (e) {
      console.log("connect failed");
      setIsLoggedOut(true);
    }
  };
  function formatAddress(address) {
    return address.substr(0, 5) + "..." + address.substr(address.length - 3);
  }

  const donnees = [
    { chiffre: 1, image: "chemin/image1.png" },
    { chiffre: 2, image: "chemin/image2.png" },
    // Add more table entries
  ];
  const moitieSuperieure = donnees.slice(0, Math.ceil(donnees.length / 2));
  const moitieInferieure = donnees.slice(Math.ceil(donnees.length / 2));

  function handleFilterClick(blockchain) {
    // console.log("dataFetched");
    console.log(blockchain);
    console.log(dataFetched);
    if (blockchain === "") {
      setFilteredBlockchain(dataFetched);
    } else {
      const filteredData = dataFetched.filter(
        (token) => token.blockchain === blockchain
      );
      setFilteredBlockchain(filteredData);
    }
    console.log(filteredBlockchain);
  }

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
                      {/* MESSAGE WELCOME BACK */}
                      {/* MESSAGE WELCOME BACK */}
                      {/* MESSAGE WELCOME BACK */}
                      {/* MESSAGE WELCOME BACK */}
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
                    placeholder="Token, pair, address..."
                    className="formulaire_2"
                  />
                  {/* <button onClick={requestAccounts}>Connect your wallet</button> */}
                  <div className="notif"></div>
                </div>
              </div>
            </header>
            <div className="scroll_contenu_1">
              {wallet && (
                <div className="groupe_profile">
                  <img src={profile} alt="" className="profile-image" />
                  <div className="groupe2_profile">
                    <div className="profile_adress">
                      <p>{formatAddress(wallet)}</p>
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
                        {wallet && (
                          <>
                            Total:{" "}
                            {overall_balance.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </>
                        )}
                      </h1>
                    </div>
                    <div className="group2">
                      <p className="blanc">Available</p>
                      <p className="semi">
                        {wallet && (
                          <>
                            {available_balance.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </>
                        )}
                      </p>
                      {/*product amount data*/}
                    </div>
                    <div className="group3">
                      <p className="blanc">Transferable</p>
                      <p className="semi">
                        {wallet && (
                          <>
                            {(
                              overall_balance - available_balance
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </>
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
                        <div className="legendChart">
                          {filteredBlockchain &&
                            filteredBlockchain.map((e) => (
                              <div className="itemLegendChart">{e.tick}</div>
                            ))}
                        </div>
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
                    {/*<button type="button" onClick={handleNFTButtonClick}>
                      NFT
                    </button>
                    <button
                      type="button"
                      onClick={handleTransactionButtonClick}
                    >
                      Transaction
                    </button>*/}
                  </div>
                  {wallet && (
                    <>
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
                                <th>Vol. 24h</th>
                                <th>Available</th>
                                <th>Transferable</th>
                                <th>Marketcap</th>
                              </tr>
                            </thead>
                            <tbody className="semi">
                              {isLoading ? (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                  }}
                                >
                                  Loading ...
                                </div>
                              ) : (
                                <>
                                  {filteredBlockchain.map((token, index) => (
                                    <TickComponent
                                      key={index}
                                      tokenData={token}
                                    />
                                  ))}
                                </>
                              )}
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
                              {filteredBlockchain.map((token, index) => (
                                <TickComponent3 key={index} tokenData={token} />
                              ))}
                            </tbody>
                          </table>
                        </nav>
                      ) : (
                        <div></div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
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
        <td className="border_bottom">{tokenData.ticker.toUpperCase()}</td>
        <td className="border_bottom">
          {formatBalance(tokenData.overall_balance)}
        </td>
        <td className="border_bottom">
          {tokenData.price ? "$" + formatPrice(tokenData.price) : "N/A"}
        </td>
        <td className="border_bottom">
          {tokenData.vol_24h ? "$" + formatPrice(tokenData.vol_24h) : "N/A"}
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
