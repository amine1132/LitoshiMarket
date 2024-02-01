import React, { useEffect, useState } from "react";
import axios from "axios";
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
import WelcomeMessage from "../components/Elements/WelcomeBack";
import WalletSection from "./Wallet-Dashboard/Wallet-Dashboard"
import NavButtons from "../components/Navbars/NavButtons";

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

  const SecondColor = "#1E1E1F";
  const BackGroundColor = "#151516";
  const [isBiggerButtonClicked, setIsBiggerButtonClicked] = React.useState(false);
  

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
                      <Tooltip title="Copy address">
                        <div className="copy" id="copyAddress">
                          <FaRegCopy />
                        </div>
                      </Tooltip>
                    </div>
                    {/* BOUTON EN HAUT */}
                    <NavButtons SecondColor={SecondColor}/>
                    {/* FIN BOUTON EN HAUT */}


                  </div>

                  <div className="flex justify-center mt-10">
                    {/* PROFIL SECTION */}

                    <div className={`mr-10 p-10 w-[45%] h-[300px] justify-center rounded-3xl bg-[${SecondColor}] ${isBiggerButtonClicked ? 'hidden' : ''}`}>
                      <div className={`flex`}>
                        <img src="/src/assets/default-avatar.png" className="rounded-full h-[100px]" alt="" />
                        <div className="pl-5 self-center">
                          <h1 className="pb-2 text-2xl flex">Yaugourt<img src="/src/assets/color-pencil.png" className="pl-3 pt-2 h-[30px]" alt="" /></h1>
                          <p className="pl-1 mb-10 flex items-center">
                            <small>
                              0x35a6c3ff826406fb7a060c6a1f4896b910680ceb
                            </small>
                          <img src="/src/assets/copy.png" className="pl-2 pb-1 h-[24px]" alt="" />
                          </p>
                        </div>
                      </div>
                      <div className="pt-[2%] h-[80px] text-sm overflow-auto">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      </div>
                      <div className="flex pt-5 justify-between gap-x-[5%] w-full">
                        <button className={`w-[220px] py-2 rounded-lg bg-[${BackGroundColor}]`}>
                          Twitter
                        </button>

                        <button className={`w-[220px] py-2 rounded-lg bg-[${BackGroundColor}]`}>
                          Website
                        </button>

                        <button className={`w-[220px] py-2 rounded-lg bg-[${BackGroundColor}]`}>
                          Add Location
                        </button>
                      </div>
                    </div>
                    {/* END PROFIL SECTION */}
                    {/* CHART SECTION */}
                    <div className={`overflow-auto p-10 w-[45%] justify-center rounded-3xl bg-[${SecondColor}] ${isBiggerButtonClicked ? 'hidden' : ''}`}>
                      
                    </div>
                    {/* END CHART SECTION */}

                  </div>

                    {/* WALLET SECTION */}
                    <WalletSection secondColor={SecondColor} backGroundColor={BackGroundColor} isBiggerButtonClicked={isBiggerButtonClicked} setIsBiggerButtonClicked={setIsBiggerButtonClicked}/>
                    {/* END WALLET SECTION */}
                </div>
              </div>
            </header>
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
