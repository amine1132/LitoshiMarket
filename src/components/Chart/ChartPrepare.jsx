import React, { useEffect, useState } from 'react';
import ChartTradingView from './ChartTradingView';
import axios from 'axios';
import API_KEY from "../../utils/config"

function CharPrepare(data) {
    const TokenData = data.Token.Token;
    console.log(TokenData)
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.bestinslot.xyz/v3/brc20/activity',
          {
            params: {
              ticker: 'ordi',
              activity_filter: 7,
              sort_by: 'ts',
              order: 'desc',
              offset: 1000,
              count: 100,
              last_new_satpoint: 'a47f806f7fa622a44bc77bc886c8e0646cc61878d412285aa4a297cf2a5ce296:0:0',
            },
            headers: {
              'x-api-key': '7baf026f-47c6-46e4-aa71-b11d032de9b9',
            },
          }
        );
  
        console.log(response);
        // Formate les données
        const formattedData = response.data.data.map(activity => ({
          time: new Date(activity.ts).getTime(),
          ts: activity.ts, 
          unit_price: parseFloat(activity.unit_price) || 0, 
        }));
  
        setCryptoData(formattedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
  <>
  <ChartTradingView data={cryptoData} />
  </>
  )
}

export default CharPrepare;
