import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
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
                  borderWidth: 40,
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
            hoverOffset: 40, // Surélévation au survol
            elements: {
              arc: {
                borderWidth: 2, // Épaisseur de la bordure
              },
            },
          };

function Dashboard() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [overall_balance, setOverallBalance] = useState(0.0);
  const [available_balance, setAvailableBalance] = useState(0.0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
  const [isGraphContent, setIsGraphContent] = useState(false);
  const [box3Content, setBox3Content] = useState("Token Content");
  const [loading, setLoading] = useState(false);

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

  function formatAddress(address) {
    const length = address.length;
    const firstChars = address.substring(0, 8);
    const lastChars = address.substring(length - 8, length);
    return `${firstChars}...${lastChars}`;
  }
  
  return (
    <>
    <div className="max">
      <div className="colone">
        <div className="idk">
        <header>
      <div className="top">
        <div className="style">
          <h1>Welcome Back <span>{formatAddress(address)} !</span></h1>
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
            <div className="box1">
              <div className='groupv1'>
                <div className='group1'>
                <p>My Wallet</p>
                <h1>Total: ${overall_balance.toLocaleString()}</h1>
                </div>
                <div className='group2'>
                  <p className='blanc'>Available</p>
                  <p className='semi'>${available_balance.toLocaleString()}</p>
                  {/*données du montant du produit*/}
                </div>
                <div className='group3'>
                  <p className='blanc'>Transferable</p>
                  <p className='semi'>${(overall_balance-available_balance).toLocaleString()}</p>
                  {/*données du montant du produit*/}
                </div>
              </div>
              <div>
                <img src={cercle} alt=""/>
              </div>
            </div>
            <div className="box2">
              <div className='donnees'>
              <p>Average of your wallet</p>
              <button type='button' onClick={handleGraphButtonClick} ><img src={chartcircle} alt=""/></button>
              </div>
              {isGraphContent ? (
              <><div className='comingsoon'> Coming Soon..</div>
              <div className='blur'>
                <div className='argent'>$243,600</div>
              <img src={Group5333} alt="" className='graph533'/>
              </div></>
            ) : (
              <div className="graph">
                <canvas id="myChart"></canvas>
              </div>
            )}
            </div>
          </div>
          <div className="groupe2">
            <div className="box3">
              <div className='topv1'>
              <p className='semi'>My Assets</p>
              <button type="button" onClick={handleTokenButtonClick}>Token</button>
              <button type="button" onClick={handleNFTButtonClick}>NFT</button>
              <button type='button' >Transaction</button>
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
                  <thead > 
                    <th>Name</th>
                    <th>Positions</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>Available</th>
                    <th>Transferable</th>
                    <th>Marketcap</th>
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
                <button><img src={Vector} alt=""/>Dashboard</button>
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
              <button><img src={Footer} alt=""/>Profile</button>
              <button><img src={footer2} alt=""/>Settings</button>
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
      <td>{tokenData.tick.toUpperCase()}</td>
      <td>{formatBalance(tokenData.overall_balance)}</td>
      <td>${parseFloat(tokenData.price).toFixed(2)}</td>
      <td>{parseFloat(tokenData.change_24h).toFixed(2)}%</td>
      <td>{formatBalance(tokenData.available_balance)}</td>
      <td>{formatBalance(tokenData.overall_balance-tokenData.available_balance)}</td>
      <td>{Number(tokenData.marketcap)}</td>
    </tr></>
  );
}

export default Dashboard;
