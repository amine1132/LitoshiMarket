import React, { useEffect, useState } from "react";
import axios from "axios";
import additem from "#assets/watchlist1.svg";
import Share from "#assets/watchlist2.svg";
import arrowright from "#assets/arrowright2.svg";
import addwatch from "#assets/additem.svg";
import notification from "#assets/notification.svg";
import useless_1 from "./useless_1";
import useless_2 from "./useless_2";
import { BsStar } from "react-icons/bs";
import NavButtons from "../../components/Navbars/NavButtons";
import TopButtons from "./TopButtons";
import CategoryButtons from "./CategoryButtons";
import MarketCapTable from "./MarketCapTable";
import TransactionTable from "./TransactionTable";
import MintTable from "./MintTable";
import ShareWatchList from "./ShareMyList";
import NewList from "./NewList";
import ShareWatchListSM from "./ShareMyListSMnext";

function Watchlist({setBlurState, blurState}) {
  const [data, setData] = useState([]);
  const [totalMarketCap, setTotalMarketCap] = useState(0.0);
  const [totalVols24h, setTotalVols24h] = useState(0.0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [showTransactionContent, setShowTransactionContent] = useState(false);
  const [box3Content, setBox3Content] = useState("Token Content");
  const [uniSatAvailable, setUniSatAvailable] = useState(false);
  
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
    setButtonActive("Mint");
  };

  const handleTokenButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(true);
    setBox3Content("Token Content");
    setButtonActive("Market Cap");
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

  const SecondColor = "#1E1E1F";
  const BackGroundColor = "#151516";
  const [buttonActive, setButtonActive] = React.useState("Market Cap");



  {/* pop ups */}
  const [showShareWatchList, setShowShareWatchList] = useState(false);
  const [showManageList, setShowManageList] = useState(false);

  const toggleSetShowShareWatchList = () => {
    const state = !showShareWatchList
    setShowShareWatchList(state);
    setBlurState(state);

    setShowManageList(false);
  };

  const toggleSetShowManageList = () => {
    const state = !showManageList
    setShowManageList(state);
    setBlurState(state);

    setShowShareWatchList(false);
  };
  {/* end pop ups */}



  return (
    <>
    {/* pop ups */}
    {showShareWatchList && (
      <ShareWatchList toggleSetShowShareWatchList={toggleSetShowShareWatchList} SecondColor={SecondColor}/>
    )}
    {showManageList && (
      <NewList toggleSetShowManageList={toggleSetShowManageList} SecondColor={SecondColor}/>
    )}

    {/* end pop ups */}

    <div className="max">
      <div className={`px-[30px] duration-300 ${blurState && "blur"}`}>
        <div className="idk">
          <header>
            <div className="top">
              <div className="style">
                <div className="stylev2">
                  <NavButtons SecondColor={SecondColor}/>
                </div>
              </div>
              <useless_2/>
            </div>
          </header>
          <div className="scroll_contenu">
            <useless_1/>

            <TopButtons BackGroundColor={BackGroundColor} SecondColor={SecondColor} 
            additem={additem} addwatch={addwatch} arrowright={arrowright} notification={notification} Share={Share} 
            toggleSetShowShareWatchList={toggleSetShowShareWatchList} toggleSetShowManageList={toggleSetShowManageList}/>

            <div className={`w-full h-[700px] rounded-lg bg-[${SecondColor}] mb-8`}>
              <div className="m-8">
                <CategoryButtons BackGroundColor={BackGroundColor} buttonActive={buttonActive} SecondColor={SecondColor} handleTokenButtonClick={handleTokenButtonClick} handleNFTButtonClick={handleNFTButtonClick}/>
                <div></div>
                {buttonActive === "Mint" && <MintTable data={data} BackGroundColor={BackGroundColor}/>}
                {buttonActive === "Market Cap" && <MarketCapTable data={data} setData={setData} BackGroundColor={BackGroundColor}/>}
                {showTransactionContent && <TransactionTable data={data} />}
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

export default Watchlist;
