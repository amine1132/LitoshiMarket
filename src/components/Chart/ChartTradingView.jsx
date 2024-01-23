import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

function ChartTradingView({ data }) {

  useEffect(() => {
    // Crée une nouvelle instance de charte dans l'élément avec l'id 'chart-container'
    const chart = createChart('theGraph', { 
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

    if (data && data.prices && data.prices.length > 0) {
      // Assurez-vous que les données sont triées par ordre croissant par rapport au temps
      const sortedData = data.prices.sort((a, b) => a[0] - b[0]);
      console.log(sortedData);

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
          color: colorChange
        }
      }

      lineSeries.setData(formattedData);
    } else {
      console.warn('Aucune donnée à afficher.');
    }

    // // Appliquer les options pour le formateur de temps personnalisé
    // chart.applyOptions({
    //   localization: {
    //     timeFormatter: (timestamp) => {
    //       const date = new Date(timestamp);
    //       const day = date.getDate();
    //       const month = date.getMonth() + 1; // Les mois vont de 0 à 11, donc ajoutez 1
    //       const year = date.getFullYear();
    //       return `${day}/${month}/${year}`;
    //     },
    //   },
    // });

    // Définir le formateur de l'axe des x
    chart.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: false, // Vous pouvez ajuster cela en fonction de vos besoins
      tickMarkFormatter: (time, tickMarkType, locale) => {
        const date = new Date(time);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Les mois vont de 0 à 11, donc ajoutez 1
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    });

    chart.autoSizeActive();

    // Changer la couleur du graphique (par exemple, en rouge)
    lineSeries.applyOptions({
      
    });

    // Retour de fonction pour nettoyer la charte précédente lors de la prochaine modification
    return () => {
      chart.remove();
    };
  }, [data]); // Assurez-vous de spécifier toutes les dépendances nécessaires ici

  return<div className="w-[100%]" id="theGraph"/>;
}

export default ChartTradingView;
