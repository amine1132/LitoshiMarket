import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './Dashboard.css';
import litoshi from './litoshi.svg'
import cercle from './Cercle.svg'
import { json } from 'react-router-dom';
import Vector from './Vector.svg'
import element3 from './element3.svg'
import Footer from './Footer.svg'
import footer2 from './footer2.svg'
import footer3 from './footer3.svg'
import globalsearch from './globalsearch.svg'
import notification from './notification.svg' 
import ouai from './ouai.svg'
import search from './search.svg'
import homme from './homme.svg'

const address = 'bc1p6ed8wca5sjmzvsf92uc2ak2egphj9zw59dghcup2ve95slpvcxlqynsk7j';

function Dashboard() {
  const [data, setData] = useState([]);
  const [overall_balance, setOverallBalance] = useState(0);
  const [available_balance, setAvailableBalance] = useState(0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [box3Content, setBox3Content] = useState("Initial Content");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://brc20api.bestinslot.xyz/v1/get_brc20_balance/'+address); 
      const jsonData = response.data;
      setData(jsonData);
      calculateSums(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateSums = (data) => {
    let overallSum = 0;
    let availableSum = 0;

    data.forEach((item) => {
      overallSum += parseInt(item.overall_balance, 10);
      availableSum += parseInt(item.available_balance, 10);
    });

    setOverallBalance(Number(overallSum));
    setAvailableBalance(Number(availableSum));
  };

  const handleNFTButtonClick = () => {
  setShowNFTContent(true);
  setBox3Content("Initial Content");
  };

  const handleTokenButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(true);
    setBox3Content("Default Token Content");
  };

  return (
    <>
    <div className="max">
      <div className="colone">
        <div className="idk">
        <header>
      <div className="top">
        <div className="style">
          <h1>Welcome Back <span>Jhon!</span></h1>
          <p>I hope everything is fine today...</p>
        </div>
        <div className="input">
          <div className="loupe">
            <img src={search} alt=""/>
          </div>
          <input type="text" placeholder="Search" className="formulaire_1" />
          <div className="notif">
          </div>
        </div>
      </div>
    </header>
          <div className="groupe1">
            <div className="box1">
              <div className='groupv1'>
                <div className='group1'>
                <p>My Wallet</p>
                <h1>Total: ${overall_balance.toLocaleString()}</h1>
                </div>
                <div className='group2'>
                  <p>Available</p>
                  <p>${available_balance.toLocaleString()}</p>
                  {/*données du montant du produit*/}
                </div>
                <div className='group3'>
                  <p>Transferable</p>
                  <p>${(overall_balance-available_balance).toLocaleString()}</p>
                  {/*données du montant du produit*/}
                </div>
              </div>
              <div>
                <img src={cercle} alt=""/>
              </div>
            </div>
            <div className="box2">
              <p>Average of your wallet</p>
              {/*données du montant du produit*/}
              {/*Graph qu'on va importer avec du chart.js*/}
            </div>
          </div>
          <div className="groupe2">
            <div className="box3">
              <div className='topv1'>
              <p>My Assets</p>
              <button type="button" onClick={handleTokenButtonClick}>Token</button>
              <button type="button" onClick={handleNFTButtonClick}>NFT</button>
              </div>
              {showNFTContent ? (
              <div className='nft'>
                <div className='box'>
                  <img src={homme} alt=""/>
                  <div className='text_8'>
                    <p className='desc'>#47856</p>
                    <button type="button" className='buton'>Détails</button>
                  </div>
                </div>
                <div className='box'>
                  <img src={homme} alt=""/>
                  <div className='text_8'>
                    <p className='desc'>#47856</p>
                    <button type="button" className='buton'>Détails</button>
                  </div>
                </div>
                <div className='box'>
                  <img src={homme} alt=""/>
                  <div className='text_8'>
                    <p className='desc'>#47856</p>
                    <button type="button" className='buton'>Détails</button>
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
                    {data.map(token => (
                      <TickComponent tick={token.tick} />
                    ))}
                </table>
              </nav>
                 ) : (
                  <div>{box3Content}</div>
                )}
            </div>
          </div>
        </div>
        <div className="gauche">
          <div className="chain">
            <img src={litoshi} alt="" />
          </div>
          <div className="menu">
              <div className='menu2'>
                <button><img src={Vector} alt=""/>Dashboard</button>
                <button><img src={globalsearch} alt=""/>Explorer</button>
                <button><img src={ouai} alt=""/>Watchlist</button>
                <button><img src={notification} alt=""/>Alerts</button>
                <button><img src={element3} alt=""/>Multicharts</button>
              </div>
              <div className='menuv1'>
                <button className='BRC'>BRC-20</button>
                <button className='LTC'>LTC-20</button>
                <button className='DRC'>DRC-20</button>
              </div>
            <div className="menufooter">
              <button><img src={Footer} alt=""/>Setting</button>
              <button><img src={footer2} alt=""/>Profile</button>
              <button><img src={footer3} alt=""/>Log Out</button>
          </div>
          </div>
        </div>
        <div className="ellipse">
        </div>
      </div>
    </div>
  </>
  );
}

function TickComponent({ tick }) {
  const [tickData, setTickData] = useState(null);

  useEffect(() => {
    fetchTickData();
  }, []);

  const fetchTickData = async () => {
    try {
      const response = await axios.get(`https://brc20api.bestinslot.xyz/v1/get_brc20_ticker/${tick}`); // Remplacez l'URL par l'URL réelle de l'API pour récupérer les caractéristiques du tick
      const tickData = response.data.ticker[0];
      setTickData(tickData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!tickData) {
    return <div>Loading tick data...</div>;
  }

  return (
    <tr>
      <td>{tickData.tick.toUpperCase()}</td>
      <td>Positions</td>
      <td>Price</td>
      <td>Change 24h</td>
      <td>Available</td>
      <td>Transferable</td>
      <td>{Number(tickData.max_supply).toLocaleString()}</td>
    </tr>
  );
}

export default Dashboard;
