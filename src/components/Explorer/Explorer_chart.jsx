import React, { useEffect, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://brc20api.bestinslot.xyz/v1/get_brc20_tickers_info/vol_24h/desc/0/1"
        );
        const jsonData = await response.json();
        // Filtrer les données pour inclure uniquement deploy_ts et holder_cnt
        const filteredData = jsonData.map((item) => ({
          deploy_ts: item.deploy_ts,
          holder_cnt: item.holder_cnt,
        }));

        setData(filteredData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const container = document.getElementById("chart-container");

    if (data.length > 0 && container) {
      const chart = createChart(container, {
        width: container.offsetWidth,
        height: 300,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
      });

      const lineSeries = chart.addLineSeries();
      lineSeries.setData(data);

      return () => {
        chart.remove();
      };
    }
  }, [data]);

  return <div id="chart-container" />;
};

export default ChartComponent;
