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



const address = 'bc1pq4esrv5qkfpxahw8789j0yz2ymfzkq63qd4dluq2j08exca6um4skewgrv';


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
  const [chartData, setChartData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [overall_balance, setOverallBalance] = useState(0.0);
  const [available_balance, setAvailableBalance] = useState(0.0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [showMarketCapContent, setShowMarketCapContent] = useState(true);
  const [show24hVolContent, setShow24hVolContent] = useState(false);
  const [box4Content, setBox4Content] = useState("Market Cap");
  const [isGraphContent, setIsGraphContent] = useState(false);
  const [box3Content, setBox3Content] = useState("Token Content");
  const [loading, setLoading] = useState(false);
  const [isFilled, setIsFilled] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('https://brc20api.bestinslot.xyz/v1/get_brc20_balance/'+address); 
        var jsonData = response.data;
        // on récupère que les tokens qui ont une overall balance strictement positive
        jsonData = jsonData.filter(token => token.overall_balance > 0)
          .map(token => ({
            ...token,
            overall_balance: parseFloat(token.overall_balance),
            available_balance: parseFloat(token.available_balance)
        }));

        // Récupération des données étoffées pour chaque token
        // const sortedData = await axios.get('https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/1/1');
        var tokenData = [];
        try {
          tokenData = await getTokenData(jsonData);
        } catch (error) {
          console.error('Error while requesting API', error);
        }
        console.log(tokenData);
        // on trie les tokens en fonction de leurs overall_balances
        tokenData = tokenData.sort((a, b) => {
          return b['overall_balance'] - a['overall_balance'];
        });
        // Fusionner les données étoffées avec les données précédentes
        setData(tokenData);

        // Calculer la valeur possédée pour chaque token et la valeur totale
        
        // Formatage des données pour le graphique
        const labels = tokenData.map(token => token.tick);
        const overallBalances = tokenData.map(token => token.overall_usdc_balance);
        const numericOverallBalances = overallBalances.filter(balance => typeof balance === 'number');
        const totalOverallBalance = numericOverallBalances.reduce((acc, val) => acc+val, 0);
        console.log(totalOverallBalance);
        setOverallBalance(totalOverallBalance);
        const availableBalances = tokenData.map(token => token.available_usdc_balance);
        const numericAvailableBalances = availableBalances.filter(balance => typeof balance === 'number');
        const totalAvailableBalance = numericAvailableBalances.reduce((acc, val) => acc+val, 0);
        setAvailableBalance(totalAvailableBalance);
        //const percentages = overallBalances.map(balance => parseInt((balance / totalOverallBalance) * 100, 10));
  
        const chartData = {
          labels: labels,
          datasets: [
            {
              data: overallBalances,
              borderWidth: 0.1,
              backgroundColor: ['#C46161','#7AB75D','#C6C85C','#50439D']
            },
          ],
        };
        // Création du graphique en forme de donut
        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
          options: chartOptions,
        });

        // Mise à jour de l'état du graphique
        setChartData(chart);

        setShowTokenContent(true);

        setInitialChartData(chart);

        // Nettoyage du graphique lors de la désactivation du composant
        return () => {
          chart.destroy();
        };
    };

  
      const handleCopyAddress = () => {
        const addressElement = document.getElementById('address')
        const MySwal = withReactContent(Swal);
  
        addressElement.addEventListener('click', () => {
          // Sélectionne le contenu de l'élément <span>
          const range = document.createRange();
          range.selectNode(addressElement);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
        
          // Copie le contenu sélectionné
          document.execCommand('copy');
        
          // Désélectionne le contenu
          window.getSelection().removeAllRanges();

          const MySwal = withReactContent(Swal)
          MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Copy!',
            showConfirmButton: false,
          })
        });
      };
  
      handleCopyAddress();
    
      fetchData();
    }, []);

  const getTokenData = async (jsonData) => {
    var currentPage = 1;
    const tokenData = new Set();

    const tokens = jsonData.map(token => token.tick);
    var remainingTokens = tokens;

    const apiKey = 'd5zQSpuvj2JO3vFD';
    const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot', {
      headers: {
          'Authorization': `Bearer ${apiKey}`,
      },
      });
    const btc_price = response.data.data.amount;

    while (true) {
      try {
        const sortedData = await axios.get('https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/0/'+currentPage);

        if (sortedData.length === 0){
          break; // Sortir de la boucle while si on a atteint le nombre maximal de pages
        }

        // Récupération des data pour les tokens possédés
        const filteredData = sortedData.data.items.filter(token => tokens.includes(token.tick));
        filteredData.forEach(token => {
          const tickData = jsonData.find(obj => obj.tick === token.tick)
          token.star = <BsStar className='iconoutline'/>;
          token.overall_balance = tickData.overall_balance;
          token.available_balance = tickData.available_balance;
          token.market_cap = token.marketcap*Math.pow(10, -8)*btc_price;
          token.price = token.market_cap/token.max_supply;
          token.overall_usdc_balance = parseFloat(tickData.overall_balance)*token.price;
          token.available_usdc_balance = parseFloat(tickData.available_balance)*token.price;
          tokenData.add(token);
        });

        // Mise à jour de la liste de tokens manquants
        const retrievedTokens = [...tokenData].map(token => token.tick);
        remainingTokens = tokens.filter(token => !retrievedTokens.includes(token));

        if (remainingTokens.length === 0) {
          break; // Sortir de la boucle while si toutes les données ont été récupérées
        }

        currentPage += 1;
      } catch (error) {
        console.error('Error while requesting API', error);
        break;
      }
    }

    return [...tokenData, ...jsonData.filter(token => remainingTokens.includes(token.tick))]; // Conversion du set en tableau et ajout des tokens pour lesquels on n'a pas trouvé de data étoffé
  }

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
          <h1>Welcome Back <span id="address">{formatAddress(address)} !</span></h1>
          <p>I hope everything is fine today...</p>
        </div>
        <div className="input">
          <button>Connect your wallet</button>
          <div className="notif">
          </div>
        </div>
      </div>
    </header>
          <div className="groupe1">
            <div className="box_1">
              <div className='group_v1'>
                <div className='group1_'>
                <p>Total</p>
                  {showMarketCapContent ? (
                    <h1>Market Cap: {overall_balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
                  ) : show24hVolContent ? (
                    <h1>24h Vol : {overall_balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
                  ) : null}
                <button type="button" onClick={handleMarketCapButtonClick}>Market cap</button>
                <button type="button" onClick={handle24hVolButtonClick}>24h Vol</button>
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
              </div>
              {showNFTContent ? (
              <div className='comingsoon_'>Coming Soon..</div>
              ) : data.length > 0  ? (
              <nav className="topline_1">
                  <table>
                  <thead >
                    <th></th>
                    <th className='super'>Token</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                    <th>Supply</th>
                  </thead>
                  <tbody  className='semi'>
                    {data.map(token => (
                      <TickComponent tokenData={token}/>
                    ))}
                  </tbody>
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
              <Link to="/Dashboard"><button><img src={Vector} alt=""/>Dashboard</button></Link>
                <button><img src={globalsearch} alt=""/>Explorer</button>
                <button><img src={ouai} alt=""/>Watchlist</button>
                <button><img src={notification} alt=""/>Alerts</button>
                <button><img src={element3} alt=""/>Multicharts</button>
              </div>
              <div className='menuv1'>
                <button className='BRC'>Bitcoin</button>
                <button className='LTC'>Litecoin</button>
                <button className='DRC'>Dogechain</button>
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

function TickComponent({ tokenData }) {

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
      <td>{tokenData.star}</td>
      <div className='super'>
      <td>{tokenData.tick.toUpperCase()}</td>
      </div>
      <td>{tokenData.price ? parseFloat(tokenData.price).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 8}) : 'N/A'}</td>
      <td className={tokenData.change_24h && parseFloat(tokenData.change_24h) < 0 ? 'negative' : (tokenData.change_24h ? 'positive' : 'na')}>
      {tokenData.change_24h ? parseFloat(tokenData.change_24h).toFixed(2) + '%' : 'N/A'}
      </td>
      <td>{formatBalance(tokenData.available_balance)}</td>
      <td>{tokenData.marketcap ? Number(tokenData.marketcap).toLocaleString('en-US', { style: 'currency', currency: 'USD'}) : 'N/A'}</td>
      <td>{formatBalance(tokenData.overall_balance-tokenData.available_balance)}</td>
    </tr></>
  );
}

export default Explorer;