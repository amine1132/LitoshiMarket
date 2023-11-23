import React from "react";

export default function TickComponent2({ tokenData, index }) {
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
      <tr>
        <td className="border_bottom">{tokenData.tick.toUpperCase()}</td>
        <td className="border_bottom">25 May 2023 22:38:40</td>
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
        <td className="border_bottombar">
          <div>100%</div>
          <div className="progressbar"></div>
        </td>
      </tr>
    </>
  );
}
