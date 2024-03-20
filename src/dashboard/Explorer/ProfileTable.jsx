import React from "react";
import Pagination from "./Pagination";

function Profiletable({ data, BackGroundColor }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
                <td className="">{token.tick.toUpperCase()}</td>
                <td className="">25 May 2023 22:38:40</td>
                <td
                  className={
                    token.change_24h && parseFloat(token.change_24h) < 0
                      ? "negative"
                      : token.change_24h && parseFloat(token.change_24h) > 0
                      ? "positive"
                      : "na"
                  }
                >
                  {token.change_24h
                    ? (parseFloat(token.change_24h) >= 0 ? "+" : "") +
                      parseFloat(token.change_24h).toFixed(2) +
                      "%"
                    : "N/A"}
                </td>
                <td className="">
                  {Number(token.vol_24h).toLocaleString("en-US", {
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

export default Profiletable;
