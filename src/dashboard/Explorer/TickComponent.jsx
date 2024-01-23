import React from "react";

export default function TickComponent({ tokenData, onTableRowClick }) {
  const formatBalance = (balance) => {
    if (balance >= 1000000) {
      const millions = (balance / 1000000).toFixed(0);
      return millions + "M";
    } else {
      return balance.toString();
    }
  };
  
  

  return (
    <>
      <tr
        onClick={() => onTableRowClick(tokenData)}
        className="cursor-pointer"
      >
        <td className="iconoutline" >{tokenData.star}</td>
        {/* <td className="number_table">{tokenData.index}</td> */}
        <td className="">{tokenData.tick.toUpperCase()}</td>
        <td  onClick={() => CallFiltre } className={tokenData.price ? "text-white-500" : "text-gray-500"}>
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
              ? "text-red-500"
              : tokenData.change_24h && parseFloat(tokenData.change_24h) >= 0
              ? "text-green-500"
              : "text-gray-500"
          }
        >
          {tokenData.change_24h
            ? (parseFloat(tokenData.change_24h) >= 0 ? "+" : "") +
              parseFloat(tokenData.change_24h).toFixed(2) +
              "%"
            : "N/A"}
        </td>
        <td className={tokenData.vol_24h ? "text-white-500" : "text-gray-500"}>
          {Number(tokenData.vol_24h).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </td>
        <td className={tokenData.marketcap ? "text-white-500" : "text-gray-500"}>
          {tokenData.marketcap
            ? Number(tokenData.marketcap).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })
            : "N/A"}
        </td>
        <td className="">{formatBalance(tokenData.max_supply)}</td>
      </tr>
    </>
  );
}
