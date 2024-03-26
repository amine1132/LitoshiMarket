import React from "react";
import Pagination from "./Pagination";
import datamarket from "../../Data/Explorer/Marketdata.json";

function MintTable({ data, BackGroundColor }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datamarket.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  // END PAGINATION

  return (
    <>
      <nav className="overflow-y-auto overflow-x-hidden h-[600px]">
        <table className="w-full">
          <thead className="text-xs text-left h-[40px]">
            <th>Token</th>
            <th>Deploy Time</th>
            <th>Holders</th>
            <th>Transaction</th>
            <th>Progress%</th>
          </thead>
          <tbody className="semi">
            {currentItems.map((token) => (
              <tr className="h-[40px]">
                <td className="">{token.ticker}</td>
                <td className="">{token.deploy_ts}</td>
                <td
                  className={
                    token.holder_count && parseFloat(token.holder_count) < 0
                      ? "negative"
                      : token.holder_count && parseFloat(token.holder_count) > 0
                      ? "positive"
                      : "na"
                  }
                >
                  {token.holder_count
                    ? (parseFloat(token.holder_count) >= 0 ? "+" : "") +
                      parseFloat(token.holder_count).toFixed(2) +
                      "%"
                    : "N/A"}
                </td>
                <td className="">
                  {Number(token.vol_1d).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="">
                  <div>100%</div>
                  <div className="progressbar"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </nav>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        backgroundColor={BackGroundColor}
      />
    </>
  );
}

export default MintTable;
