import React, { useState, useEffect } from 'react';
import './bandeaudefilant.css'
import axios from 'axios';


const DataDisplay = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Récupération du taux de change BTC/USDC
          const changeData = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot', {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_PUBLIC_KEY}`,
            },
          });
          const change = changeData.data.data.amount;
          
          // Récupération du top 10 des tokens classés par ordre décroissant des volumes sur les dernières 24h
          const response = await axios.get('https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/0/1');
          var data = response.data.items.slice(0, 10);
          const updatedData = await Promise.all(
            data.map(async (token) => {
              token['marketcap'] = parseFloat((token.marketcap)*Math.pow(10, -8)*change);
              token['price'] = token.marketcap/token.max_supply;
              return token;
            })
          );
          setData(updatedData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='defilante'>
        <ul className='slide'>
        {data.map((item, index) => (
            <li key={index}>
              <span className='titre'>${item.tick}</span>
              <span>${parseFloat(item.price).toFixed(2)}</span>
              ${Math.floor(item.marketcap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className={parseFloat(item.change_24h).toFixed(2) < 0 ? 'red' : 'green'}>
              <span className="arrow">
              <p className="percentage">{Math.abs(parseFloat(item.change_24h)).toFixed(2)}%</p>
              {item.change_24h != undefined && parseFloat(item.change_24h).toFixed(2) < 0 ? (
              <p className="arrow-down">&#9660;</p>
              ) : (
              <p className="arrow-up">&#9650;</p>
                )}
              </span>
              </span>
            </li>
          ))}
        {data.map((item, index) => (
            <li key={index}>
              <span className='titre'>${item.tick}</span>
              <span>${parseFloat(item.price).toFixed(2)}</span>
              ${Math.floor(item.marketcap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className={parseFloat(item.change_24h).toFixed(2) < 0 ? 'red' : 'green'}>
              <span className="arrow">
              <p className="percentage">{Math.abs(parseFloat(item.change_24h)).toFixed(2)}%</p>
              {parseFloat(item.change_24h).toFixed(2) < 0 ? (
              <p className="arrow-down">&#9660;</p>
              ) : (
              <p className="arrow-up">&#9650;</p>
                )}
              </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default DataDisplay;