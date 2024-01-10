import React from "react";
import Filtre from "#utils/Filtre.jsx"

export default function TickComponent({ tokenData, index, onTableRowClick }) {
  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + "M";
    } else {
      return balance.toString();
    }
  };

  function CallFiltre() {
    
  }

  return (
    <>
      <tr
        onClick={() => onTableRowClick(tokenData.tick)}
        className="cursor-pointer"
      >
        <td className="iconoutline" >{tokenData.star}</td>
        <td className="number_table">{index}</td>
        <td className="border_bottom">{tokenData.tick.toUpperCase()}</td>
        <td  onClick={() => CallFiltre } className="border_bottom">
          {tokenData.price
            ? parseFloat(tokenData.price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })
            : "N/A"}
        </td>
        <td
          className={
            tokenData.change_24h && parseFloat(tokenData.change_24h) < 0
              ? "negative"
              : tokenData.change_24h && parseFloat(tokenData.change_24h) > 0
              ? "positive"
              : "na"
          }
        >
          {tokenData.change_24h
            ? (parseFloat(tokenData.change_24h) >= 0 ? "+" : "") +
              parseFloat(tokenData.change_24h).toFixed(2) +
              "%"
            : "N/A"}
        </td>
        <td className="border_bottom">
          {Number(tokenData.vol_24h).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </td>
        <td className="border_bottom">
          {tokenData.marketcap
            ? Number(tokenData.marketcap).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })
            : "N/A"}
        </td>
        <td className="border_bottom">{formatBalance(tokenData.max_supply)}</td>
      </tr>
    </>
  );
}
