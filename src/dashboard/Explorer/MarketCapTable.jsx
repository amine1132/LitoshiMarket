import Filtre from '../../utils/Filtre';
import React from "react";
import FromatBalance from "./FormatBalance"
import Pagination from './Pagination';

function MarketCapTable({ data, setData, BackGroundColor, SecondColor}){
  console.log(data);
    // FILTRE
    const [sortOrder,setSortOrder] = React.useState(null);

    let col_0 = "index";
    let col_1 = "token";
    let col_2 = "minlistedunitprice";
    let col_3 = "price";
    let col_4 = "change_24h";
    let col_5 = "tx_count";
    let col_6 = "vol_24h";
    let col_7 = "marketcap";
  
    const [Arrows, setArrows] = React.useState([
      { name: col_0, arrow: "" },
      { name: col_1, arrow: "" },
      { name: col_2, arrow: "" },
      { name: col_3, arrow: "" },
      { name: col_4, arrow: "" },
      { name: col_5, arrow: "" },
      { name: col_6, arrow: "" },
      { name: col_7, arrow: "" },
    ]);
    // FIN FILTRE

    // PAGINATION
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 14;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    // END PAGINATION

    return(
    <> 
    <nav className="overflow-y-auto overflow-x-hidden h-[600px]">
      <table className="w-full">

        <thead className={` text-xs text-gray-500 text-left h-[40px]`}>
          {/* <th></th> */}
          {/* <th className="hoverable" name={col_0} onClick={() => Filtre(col_0, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[0].arrow}</th> */}
          <th className={`pl-8 hoverable bg-[${BackGroundColor}] rounded-l-lg`} name={col_1} onClick={() => Filtre(col_1, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[1].arrow}Name</th>
          <th className={`hoverable bg-[${BackGroundColor}]`}  name={col_2} onClick={() => Filtre(col_2, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[2].arrow}Position</th>
          <th className={`hoverable bg-[${BackGroundColor}]`}  name={col_3} onClick={() => Filtre(col_3, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[3].arrow}Price</th>
          <th className={`hoverable bg-[${BackGroundColor}]`}  name={col_4} onClick={() => Filtre(col_4, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[4].arrow}24h</th>
          <th className={`hoverable bg-[${BackGroundColor}]`}  name={col_5} onClick={() => Filtre(col_5, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[5].arrow}Available</th>
          <th className={`hoverable bg-[${BackGroundColor}]`}  name={col_6} onClick={() => Filtre(col_6, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[6].arrow}Transferable</th>
          <th className={`hoverable bg-[${BackGroundColor}] rounded-r-lg`}  name={col_7} onClick={() => Filtre(col_7, setData, data, sortOrder,setSortOrder, Arrows, setArrows)}>{Arrows[7].arrow}Market Cap</th>
        </thead>


        <tbody className="semi">

          {currentItems.map((token, index) => (
            <tr className="h-[40px]">
              {/* <td className="iconoutline">{token.star}</td> */}
              {/* <td className="number_table">{token.index}</td> */}
              <td className={`pl-8 ${index != itemsPerPage-1 && `border-b border-[${BackGroundColor}]`}`}>{token.tick.toUpperCase()}</td>

              <td className={`${token.minlistedunitprice ? "text-white-500" : "text-gray-500"} ${index != itemsPerPage-1 && `border-b border-[${BackGroundColor}]`}`}>
                {token.minlistedunitprice
                  ? parseFloat(token.minlistedunitprice).toLocaleString("en-US", {  style: "currency",  currency: "USD",  minimumFractionDigits: 2,  maximumFractionDigits: 8,  })
                  : "N/A"}
              </td>

              <td className={`${token.holder_cnt ? "text-white-500" : "text-gray-500"} ${index != itemsPerPage-1 && `border-b border-[${BackGroundColor}]`}`}>
                {token.holder_cnt
                  ? parseFloat(token.holder_cnt).toLocaleString("en-US", {  style: "currency",  currency: "USD",  minimumFractionDigits: 2,  maximumFractionDigits: 8,  })
                  : "N/A"}
              </td>

              <td
                className={`${
                  token.change_24h && parseFloat(token.change_24h) < 0  
                  ? "text-red-500" 
                  : token.change_24h && parseFloat(token.change_24h) > 0  
                    ? "text-green-500"  
                    : "text-gray-500"}
                    ${index != itemsPerPage-1 && `border-b border-[${BackGroundColor}]`}`
                }
              >
                {token.change_24h ? (parseFloat(token.change_24h) >= 0 ? "+" : "") +    parseFloat(token.change_24h).toFixed(2) + "%"
                  : "N/A"}
              </td>

              <td className={`${token.tx_count ? "text-white-500" : "text-gray-500"} ${index != itemsPerPage-1 && `border-b border-[${BackGroundColor}]`}`}>
                {token.tx_count
                ? Number(token.tx_count).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0, })
                : "N/A"}
              </td>

              <td className={`${token.vol_24h ? "text-white-500" : "text-gray-500"} ${index != itemsPerPage-1 && `border-b border-[${BackGroundColor}]`}`}>
                {token.vol_24h
                ? Number(token.vol_24h).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0, })
                : "N/A"}
              </td>

              <td className={`${token.marketcap ? "text-white-500" : "text-gray-500"} ${index != itemsPerPage-1 && `border-b border-[${BackGroundColor}]`}`}>
                {token.marketcap
                ? Number(token.marketcap).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0, })
                : "N/A"}
              </td>
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