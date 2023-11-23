import React from "react";

export default function TickComponent3({ tokenData, index }) {
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
        <td className="border_bottomprofil">
          {" "}
          <img src={homme} alt="" />
          <span>bc1pq4es...4skewgrv</span>
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
        <td className="border_bottomtoptoken">
          {" "}
          <img src={Bitcoin} alt="" />
          99%{" "}
        </td>
      </tr>
    </>
  );
}
