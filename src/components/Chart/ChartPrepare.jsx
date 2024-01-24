import React, { useEffect, useState } from 'react';
import ChartTradingView from './ChartTradingView';
import axios from 'axios';

function CharPrepare(data) {
    const TokenData = data.Token.Token;
    console.log(TokenData)
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/ethereum/market_chart',
          {
            params: {
              vs_currency: 'usd',
              days: '30',
            },
          }
        );

        // console.log('Réponse de l\'API:', response.data);
        setCryptoData(response.data || []);
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
