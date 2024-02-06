////////////////////////////////////////////////////////////////////////////////////////////////

const moitieSuperieure = donnees.slice(0, Math.ceil(donnees.length / 2));
const moitieInferieure = donnees.slice(Math.ceil(donnees.length / 2));

////////////////////////////////////////////////////////////////////////////////////////////////
// !! INSIDE DASHBOARD FUNCTION
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

////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////

function formatAddress(address) {
    return address.substr(0, 5) + "..." + address.substr(address.length - 3);
}

////////////////////////////////////////////////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////////////////////////////////////////////


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


////////////////////////////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////////////////////////////

const donnees = [
{ chiffre: 1, image: "chemin/image1.png" },
{ chiffre: 2, image: "chemin/image2.png" },
// Add more table entries
];

////////////////////////////////////////////////////////////////////////////////////////////////

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