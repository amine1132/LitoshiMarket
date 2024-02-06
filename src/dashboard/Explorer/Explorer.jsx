import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explorer.css";

import { BsStar } from "react-icons/bs";

import Condition_explorer from "./Condition_explorer";

import NavButtons from "../../components/Navbars/NavButtons";
import CategoryButtons from "./CategoryButtons";
import MarketCapTable from "./MarketCapTable";
import MintTable from "./MintTable";


function Explorer({ tokenData }) {
  const [data, setData] = useState([]);
  const [totalMarketCap, setTotalMarketCap] = useState(0.0);
  const [totalVols24h, setTotalVols24h] = useState(0.0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [isContentCleared, setIsContentCleared] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
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

  const handleMintButtonClick = () => {
    setShowNFTContent(true);
    setBox3Content("Initial Content");
    setButtonActive("Mint");
  };

  const handleMarketCapButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(true);
    setBox3Content("Token Content");
    setButtonActive("Market Cap");
  };

  function handleTableRowClick(token) {
    setSelectedToken(token);
    setIsContentCleared(true);
  }

  const SecondColor = "#1E1E1F";
  const BackGroundColor = "#151516";
  const [buttonActive, setButtonActive] = React.useState("Market Cap");

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
                <div className="stylev2">
                  <NavButtons SecondColor={SecondColor}/>
                </div>
              </div>
            </div>
          </header>
            <div className="scroll_contenu">
              <div className={`w-full h-[775px] rounded-lg bg-[${SecondColor}] mb-8`}>
                <div className="mx-8">
                  <CategoryButtons BackGroundColor={BackGroundColor} buttonActive={buttonActive} SecondColor={SecondColor} handleMarketCapButtonClick={handleMarketCapButtonClick} handleMintButtonClick={handleMintButtonClick}/>
                  <div></div>
                  {buttonActive === "Mint" && <MintTable data={data} BackGroundColor={BackGroundColor}/>}
                  {buttonActive === "Market Cap" && <MarketCapTable data={data} setData={setData} BackGroundColor={BackGroundColor} SecondColor={SecondColor} onTableRowClick={handleTableRowClick}/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explorer;
