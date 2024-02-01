import Filtre from '../../utils/Filtre';
import React from "react";
import FromatBalance from "./FormatBalance"
import Pagination from './Pagination';

function MarketCapTable({ data, setData, BackGroundColor}){
    // FILTRE
    const [sortOrder,setSortOrder] = React.useState(null);

    let tokenName = "token";
    let priceName = "price";
    let marketCapName = "marketcap";
    let volumeName = "vol_24h";
    let supplyName = "max_supply";
    let _24hName = "change_24h";
    let indexToken = "index";
  
    const [Arrows, setArrows] = React.useState([
      { name: tokenName, arrow: "" },
      { name: priceName, arrow: "" },
      { name: marketCapName, arrow: "" },
      { name: volumeName, arrow: "" },
      { name: supplyName, arrow: "" },
      { name: _24hName, arrow: "" },
      { name: indexToken, arrow: "" },
    ]);
    // FIN FILTRE

    // PAGINATION
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    // END PAGINATION

    return(
    <> 
    <nav className="overflow-y-auto overflow-x-hidden h-[535px]">
      <table className="w-full">

        <thead className="text-xs text-left h-[40px]">
          <th></th>
          {/* <th className="hoverable" name={indexToken} onClick={() => Filtre(indexToken, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[6].arrow}</th> */}
          <th className="hoverable" name={tokenName} onClick={() => Filtre(tokenName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{/*{Arrows[0].arrow}Token*/}</th>
          <th className="hoverable" name={priceName} onClick={() => Filtre(priceName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[1].arrow}Price</th>
          <th className="hoverable" name={_24hName} onClick={() => Filtre(_24hName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[5].arrow}24h</th>
          <th className="hoverable" name={volumeName} onClick={() => Filtre(volumeName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[3].arrow}24h Volume</th>
          <th className="hoverable" name={marketCapName} onClick={() => Filtre(marketCapName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[2].arrow}Market Cap</th>
          <th className="hoverable" name={supplyName} onClick={() => Filtre(supplyName, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[4].arrow}Supply</th>
        </thead>


        <tbody className="semi">

          {currentItems.map((token, index) => (
            <tr className="h-[40px]">
              <td className="iconoutline">{token.star}</td>
              {/* <td className="number_table">{token.index}</td> */}
              <td className="border_bottom">{token.tick.toUpperCase()}</td>

              <td className={token.price ? "text-white-500" : "text-gray-500"}>
                {token.price
                  ? parseFloat(token.price).toLocaleString("en-US", {  style: "currency",  currency: "USD",  minimumFractionDigits: 2,  maximumFractionDigits: 8,  })
                  : "N/A"}
              </td>

              <td
                className={
                  token.change_24h && parseFloat(token.change_24h) < 0  
                  ? "text-red-500" 
                  : token.change_24h && parseFloat(token.change_24h) > 0  
                    ? "text-green-500"  
                    : "text-gray-500"
                }
              >
                {token.change_24h ? (parseFloat(token.change_24h) >= 0 ? "+" : "") +    parseFloat(token.change_24h).toFixed(2) + "%"
                  : "N/A"}
              </td>

              <td className="border_bottom">
                {Number(token.vol_24h).toLocaleString("en-US", {  style: "currency",  currency: "USD",  maximumFractionDigits: 0, })}
              </td>

              <td className={token.marketcap ? "text-white-500" : "text-gray-500"}>
                {token.marketcap
                ? Number(token.marketcap).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0, })
                : "N/A"}
              </td>
              <td className="border_bottom">{FromatBalance(token.max_supply)}</td>
            </tr>
          ))}

        </tbody>   
      </table>
    </nav>

    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} backgroundColor={BackGroundColor} />
    </>
  )
};

export default MarketCapTable;