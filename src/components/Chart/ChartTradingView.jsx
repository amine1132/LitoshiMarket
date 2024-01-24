import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

function ChartTradingView({ data }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const chartContainer = chartContainerRef.current;

    // Crée une nouvelle instance de charte dans l'élément avec l'id 'chart-container'
    const chart = createChart(chartContainer, {
      height: 610,
      layout: {
        background: { color: '#222' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
    });

    // Ajoute une série de barres à la charte
    const lineSeries = chart.addLineSeries();

    let formattedData = [];

    const updateChartSize = () => {
      // Ajuster la taille de la chart en fonction de la taille du conteneur
      const containerHeight = chartContainer.clientHeight;
      const containerWidth = chartContainer.clientWidth;

      chart.applyOptions({ width: containerWidth, height: containerHeight });
      chart.timeScale().scrollToPosition(0);
    };

    // Utilisation de ResizeObserver pour détecter les changements de taille du conteneur
    const resizeObserver = new ResizeObserver(updateChartSize);
    resizeObserver.observe(chartContainer);

    // Appeler la fonction de redimensionnement une fois au montage du composant
    updateChartSize();

    if (data && data.prices && data.prices.length > 0) {
      // Assurez-vous que les données sont triées par ordre croissant par rapport au temps
      const sortedData = data.prices.sort((a, b) => a[0] - b[0]);

      // Formate les données
      for (let index = 0; index < sortedData.length - 2; index++) {
        // Changement de couleur
        let colorChange = 'red';
        if (sortedData[index][1] < sortedData[index + 1][1]) {
          colorChange = 'green';
        }

        formattedData[index] = {
          time: sortedData[index][0],
          value: sortedData[index][1],
          color: colorChange,
        };
      }

      lineSeries.setData(formattedData);
    } else {
      console.warn('Aucune donnée à afficher.');
    }

    // Définir le formateur de l'axe des x
    chart.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: false,
      tickMarkFormatter: (time, tickMarkType, locale) => {
        const date = new Date(time);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    });

    // Changer la couleur du graphique (par exemple, en rouge)
    lineSeries.applyOptions({});

    // Enregistrez les références pour pouvoir nettoyer plus tard
    chartRef.current = chart;

    // Retour de fonction pour nettoyer la charte précédente lors de la prochaine modification
    return () => {
      resizeObserver.disconnect();
      chartRef.current.remove();
    };
  }, [data]);

  return <div className="w-[100%]" ref={chartContainerRef} />;
}

export default ChartTradingView;
