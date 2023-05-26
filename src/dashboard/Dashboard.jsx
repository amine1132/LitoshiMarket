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
  const [overall_balance, setOverallBalance] = useState(0);
  const [available_balance, setAvailableBalance] = useState(0);
  const [showNFTContent, setShowNFTContent] = useState(false);
  const [showTokenContent, setShowTokenContent] = useState(false);
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
            overall_balance: parseInt(token.overall_balance),
            available_balance: parseInt(token.available_balance)
        }));
        // on trie les tokens en fonction de leurs overall_balances
        jsonData = jsonData.sort((a, b) => {
          return b['overall_balance'] - a['overall_balance'];
        });
        setData(jsonData);
        
        // Formatage des données pour le graphique
        const labels = jsonData.map(token => token.tick);
        const overallBalances = jsonData.map(token => token.overall_balance);
        const totalOverallBalance = overallBalances.reduce((acc, val) => acc+val, 0);
        setOverallBalance(totalOverallBalance);
        const availableBalances = jsonData.map(token => token.available_balance);
        const totalAvailableBalance = availableBalances.reduce((acc, val) => acc+val, 0);
        setAvailableBalance(totalAvailableBalance);
        //const percentages = overallBalances.map(balance => parseInt((balance / totalOverallBalance) * 100, 10));
  
        const chartData = {
          labels: labels,
          datasets: [
            {
              data: availableBalances,
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

        // Nettoyage du graphique lors de la désactivation du composant
        return () => {
          chart.destroy();
        };
      };

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
  
  return (
    <>
    <div className="max">
      <div className="colone">
        <div className="idk">
        <header>
      <div className="top">
        <div className="style">
          <h1>Welcome Back <span>Jhon.LTC!</span></h1>
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
              <button><img src={chartcircle} alt=""/></button>
              </div>
              <div className='graph'>
                <canvas id="myChart"></canvas>
              </div>
            </div>
          </div>
          <div className="groupe2">
            <div className="box3">
              <div className='topv1'>
              <p className='semi'>My Assets</p>
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
                      <TickComponent tick={token.tick} overall_balance={parseInt(token.overall_balance, 10)} available_balance={parseInt(token.available_balance, 10)}/>
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

function TickComponent({ tick, overall_balance, available_balance }) {
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
    return ;
  }

  return (
    <><tr>
      <td>{tickData.tick.toUpperCase()}</td>
      <td>Positions</td>
      <td>Price</td>
      <td>Change 24h</td>
      <td>{available_balance}</td>
      <td>{overall_balance-available_balance}</td>
      <td>{Number(tickData.max_supply).toLocaleString()}</td>
    </tr></>
  );
}

export default Dashboard;
