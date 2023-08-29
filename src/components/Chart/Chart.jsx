import Chart, { Chart as ChartJS, defaults } from "chart.js/auto";
import axios from "axios";
import React from "react";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "left",
      family: "MontRegular",
      labels: {
        color: "white",
        usePointStyle: true,
        pointStyle: "rect",
        padding: 17, // Spacing between labels
        borderWidth: 10,
        font: {
          size: 16, // Change the size of caption text
          family: "MontRegular",
        },
      },
    },
    layout: {
      padding: {
        left: 200, // Doughnut left spacing
      },
    },
  },
  cutout: 80,
  elements: {
    arc: {
      borderWidth: 2, // Edge thickness
    },
  },
};

let sortedWalletBalances = walletBalances.sort((a, b) => {
  return b["overall_balance"] - a["overall_balance"];
});

setDataFetched(sortedWalletBalances);
setFilteredBlockchain(sortedWalletBalances);

// Formatting data for graphics
// Sorting balances for the doughnut
/*sortedWalletBalances = walletBalances.sort((a, b) => {
    return b["overall_usdc_balance"] - a["overall_usdc_balance"];
  });*/
//const definedWalletBalances = sortedWalletBalances.filter(token => token.overall_usdc_balance !== undefined);
//console.log(definedWalletBalances);

const labels = sortedWalletBalances.map((token) => token.ticker);
const overallBalances = sortedWalletBalances.map(
  (token) => token.overall_usdc_balance
);
const numericOverallBalances = overallBalances.filter(
  (balance) => typeof balance === "number"
);
const totalOverallBalance = numericOverallBalances.reduce(
  (acc, val) => acc + val,
  0
);
setOverallBalance(totalOverallBalance);
const availableBalances = sortedWalletBalances.map(
  (token) => token.available_usdc_balance
);
const numericAvailableBalances = availableBalances.filter(
  (balance) => typeof balance === "number"
);
const totalAvailableBalance = numericAvailableBalances.reduce(
  (acc, val) => acc + val,
  0
);
setAvailableBalance(totalAvailableBalance);
const percentages = overallBalances.map((balance) =>
  parseInt((balance / totalOverallBalance) * 100, 10)
);

const chartData = {
  labels: labels,
  datasets: [
    {
      data: overallBalances,
      borderWidth: 0.1,
      backgroundColor: ["#C46161", "#7AB75D", "#C6C85C", "#50439D"],
    },
  ],
};

// Creating the doughnut graphic
const ctx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(ctx, {
  type: "doughnut",
  data: chartData,
  options: chartOptions,
});

// Chart status update
setChartData(chart);
setShowTokenContent(true);

export default function Chart() {
  return (
    <div className="graph">
      <canvas id="myChart"></canvas>
      <div className="legendChart">
        {filteredBlockchain &&
          filteredBlockchain.map((e) => (
            <div className="itemLegendChart">{e.tick}</div>
          ))}
      </div>
    </div>
  );
}
