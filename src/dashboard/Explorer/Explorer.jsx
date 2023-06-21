import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Explorer.css';
import litoshi from './litoshi.svg'
import cercle from './Cercle.svg'
import Vector from './Vector.svg'
import element3 from './element3.svg'
import Footer from './Footer.svg'
import footer2 from './footer2.svg'
import footer3 from './footer3.svg'
import globalsearch from './globalsearch.svg'
import notification from './notification.svg' 
import Group5333 from './Group5333.svg'
import ouai from './ouai.svg'
import search from './search.svg'
import homme from './homme.svg'
import chartcircle from './chartcircle.svg'
import Chart, { Chart as ChartJS,defaults} from 'chart.js/auto';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Outlet,useMatch } from 'react-router-dom';
import { BsStar } from 'react-icons/bs';
import Bitcoin from './Bitcoin.svg'
import litecoinltclogo from './litecoinltclogo.svg'
import dogecoindogelogo from './dogecoindogelogo.svg'
import Ethereum from './Ethereum.svg'

const chartOptions = {
            responsive: true, 
            maintainAspectRatio:false,
            plugins: {
              legend: {
                position: 'left',
                family:'MontRegular',
                labels: {
                  color: 'white',
                  usePointStyle: true,
                  pointStyle: 'rect',
                  padding: 15, // Espacement entre les étiquettes
                  borderWidth: 10,
                  font: {
                    size: 16, // Changer la taille du texte des légendes
                    family: 'MontRegular',
                  },
                },
                },
                layout: {
                  padding: {
                    left: 200, // Espacement à gauche du Doughnut
                  },
                },
            },
            cutout:80,
            elements: {
              arc: {
                borderWidth: 2, // Épaisseur de la bordure
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
        // Récupération du change BTC/USDC
        const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot', {
          headers: {
          },
          });
        const btc_price = response.data.data.amount;

        // Tri par vol_24h et Récupération des données étoffées pour chaque token
        const sortedData = await axios.get('https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/0/1');
        const data = sortedData.data.items;
        data.forEach(token => {
          token.star= <BsStar/>;
          token.vol_24h = token.vol_24h*Math.pow(10, -8)*btc_price;
          token.marketcap = token.marketcap*Math.pow(10, -8)*btc_price;
          token.price = token.marketcap/token.max_supply;
        });
        // Fusionner les données étoffées avec les données précédentes
        setData(data);

        const marketCaps = data.map(token => token.marketcap);
        const totalMarketCap = marketCaps.reduce((acc, val) => acc+val, 0);
        setTotalMarketCap(totalMarketCap);

        const vols24h = data.map(token => token.vol_24h);
        const totalVols24h = vols24h.reduce((acc, val) => acc+val, 0);
        setTotalVols24h(totalVols24h);
    };

    const checkUniSatAvailability = () => {
      if (typeof window.unisat !== 'undefined') {
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
          console.log('Connect success', accounts);
          setIsConnected(true);
        } catch (e) {
          console.log('Connect failed');
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
        <div className="style">
        </div>
        <div className="input">
          <button onClick={requestAccounts}>Connect your wallet</button>
          <div className="notif">
          </div>
        </div>
      </div>
    </header>
    <div className='scroll_contenu'>
          <div className="groupe1">
            <div className="box_1">
              <div className='group_v1'>
                <div className='group1_'>
                <p>Total</p>
                  {showMarketCapContent ? (
                    <><h1>Market Cap : {Number(totalMarketCap).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</h1>
                    <h1>24h Vol : {Number(totalVols24h).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</h1></>
                  ) : show24hVolContent ? (
                    <div></div>
                  ) : null}
                </div>
                <div className='group2_'>
                <div className='blur'>
                <div className='argent_'>$243,600</div>
              <img src={Group5333} alt="" className='graph533'/>
              </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div className="groupe2">
            <div className="box3">
              <div className='topv1_'>
              <p className='semi'>Top Market Cap / Cryptocurrency Prices</p>
              <button type="button" onClick={handleTokenButtonClick} className='tokens'>Tokens</button>
              <button type="button" onClick={handleNFTButtonClick} className='mint'>Mint</button>
              <button type='button' onClick={handleTransactionButtonClick}>Profile</button>
              </div>
              <div>
                
              </div>
              {showNFTContent ? (
              <nav className="topline_1">
              <table>
              <thead >
                <th>Token</th>
                <th>Deploy Time</th>
                <th>Holders</th>
                <th>Transaction</th>
                <th>Progress%</th>
              </thead>
              <tbody  className='semi'>
                {data.map((token, index) => (
                  <TickComponent2 tokenData={token} index={index+1}/>
                ))}
              </tbody>
            </table>
          </nav>
            ) : showTokenContent ? (
              <nav className="topline_1">
                  <table>
                  <thead >
                    <th></th>
                    <th></th>
                    <th>Token</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                    <th>Supply</th>
                  </thead>
                  <tbody  className='semi'>
                    {data.map((token, index) => (
                      <TickComponent tokenData={token} index={index+1}/>
                    ))}
                  </tbody>
                </table>
              </nav>
                ) : showTransactionContent ? (
                  <nav className="topline_1">
                  <table>
                  <thead>
                    <tr>
                    <th className='user'>User</th>
                    <th>Net worth</th>
                    <th>Top token</th>
                    </tr>
                  </thead>
                  <tbody className='semi'>
                    {data.map((token, index) => (
                      <TickComponent3 key={index} tokenData={token}/>
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
        <div className="gauche">
          <div className="chain">
            <img src={litoshi} alt="" />
          </div>
          <div className="menu">
          <div className='menutop'>
              <div className='menu2'>
              <Link to="/dashboard"><button className='dashboard_'><img src={Vector} alt=""/>Dashboard</button></Link>
                <button className='explorer_'><img src={globalsearch} alt=""/>Explorer</button>
                <button className='watchlist'><img src={ouai} alt=""/>Watchlist</button>
                <button className='alerts'><img src={notification} alt=""/>Alerts</button>
                <button className='multicharts'><img src={element3} alt=""/>Multicharts</button>
              </div>
              <div className='menuv1'>
              <button className='BRC'><img src={Bitcoin} alt=""/>Bitcoin</button>
                <button className='LTC'><img src={litecoinltclogo} alt=""/>Litecoin</button>
                <button className='DRC'><img src={dogecoindogelogo} alt=""/>Dogechain</button>
              </div>
          </div>
            <div className="menufooter">
              <button className='profile'><img src={Footer} alt=""/>Profile</button>
              <button><img src={footer2} alt=""/>Settings</button>
              <button><img src={footer3} alt=""/>Log Out</button>
          </div>
          </div>
        </div>
        <div className="ellipse">
        </div>
      </div>
    </div>
  );
}

function TickComponent({ tokenData, index }) {

  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + 'M';
    } else {
      return balance.toString();
    }
  };

  return (
    <><tr>
      <td className='iconoutline'>{tokenData.star}</td>
      <td className='number_table'>{index}</td>
      <td className='border_bottom'>{tokenData.tick.toUpperCase()}</td>
      <td className='border_bottom'>{tokenData.price ? parseFloat(tokenData.price).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 8}) : 'N/A'}</td>
      <td className= {tokenData.change_24h && parseFloat(tokenData.change_24h) < 0 ? 'negative' : (tokenData.change_24h && parseFloat(tokenData.change_24h) > 0 ? 'positive' : 'na')}>
      {tokenData.change_24h ? (parseFloat(tokenData.change_24h) >= 0 ? '+' : '') + parseFloat(tokenData.change_24h).toFixed(2) + '%' : 'N/A'}
      </td>
      <td className='border_bottom'>{Number(tokenData.vol_24h).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0})}</td>
      <td className='border_bottom'>{tokenData.marketcap ? Number(tokenData.marketcap).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0}) : 'N/A'}</td>
      <td className='border_bottom'>{formatBalance(tokenData.max_supply)}</td>
    </tr></>
  );
}

function TickComponent2({ tokenData, index }) {

  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + 'M';
    } else {
      return balance.toString();
    }
  };

  return (
    <><tr>
      <td className='border_bottom'>{tokenData.tick.toUpperCase()}</td>
      <td className='border_bottom'>25 May 2023 22:38:40</td>
      <td className= {tokenData.change_24h && parseFloat(tokenData.change_24h) < 0 ? 'negative' : (tokenData.change_24h && parseFloat(tokenData.change_24h) > 0 ? 'positive' : 'na')}>
      {tokenData.change_24h ? (parseFloat(tokenData.change_24h) >= 0 ? '+' : '') + parseFloat(tokenData.change_24h).toFixed(2) + '%' : 'N/A'}
      </td>
      <td className='border_bottom'>{Number(tokenData.vol_24h).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0})}</td>
      <td className='border_bottombar'><div>100%</div><div className='progressbar'></div></td>
    </tr></>
  );
}

function TickComponent3({ tokenData, index }) {

  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + 'M';
    } else {
      return balance.toString();
    }
  };

  return (
    <><tr>
      <td className='border_bottomprofil'> <img src={homme} alt=""/><span>bc1pq4es...4skewgrv</span></td>
      <td className='border_bottom'>{tokenData.marketcap ? Number(tokenData.marketcap).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0}) : 'N/A'}</td>
      <td className='border_bottomtoptoken'> <img src={Bitcoin} alt=""/>99% </td>
    </tr></>
  );
}

export default Explorer;