import formatBalance from "./F_formatBalance";

function TickComponent({ tokenData }) {

  
    return (
      <>
        <tr>
          <td className="border_bottom">{tokenData.ticker.toUpperCase()}</td>
          <td className="border_bottom">
            {formatBalance(tokenData.overall_balance)}
          </td>
          <td className="border_bottom">
            {tokenData.price ? "$" + formatPrice(tokenData.price) : "N/A"}
          </td>
          <td className="border_bottom">
            {tokenData.vol_24h ? "$" + formatPrice(tokenData.vol_24h) : "N/A"}
          </td>
          <td className="border_bottom">
            {formatBalance(tokenData.available_balance)}
          </td>
          <td className="border_bottom">
            {formatBalance(
              tokenData.overall_balance - tokenData.available_balance
            )}
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
        </tr>
      </>
    );
  }
export default TickComponent;