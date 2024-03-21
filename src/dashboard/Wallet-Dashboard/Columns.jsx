import Wallet from "../../Data/WalletData.json";

function Columns({ data, currentPage, itemsPerPage, backgroundColor }) {
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const currentData = Wallet.slice(startIdx, endIdx);

  return (
    <div className="mt-4">
      <table className="w-full">
        <thead className={``}>
          <tr className="text-left">
            <th className={`pl-10 py-2 bg-[#151516] rounded-l-md`}>
              <small>Name</small>
            </th>
            <th className={`pl-10 py-2 bg-[#151516]`}>
              <small>Position</small>
            </th>
            <th className={`pl-10 py-2 bg-[#151516]`}>
              <small>Price</small>
            </th>
            <th className={`pl-10 py-2 bg-[#151516]`}>
              <small>24h</small>
            </th>
            <th className={`pl-10 py-2 bg-[#151516]`}>
              <small>Avalaible</small>
            </th>
            <th className={`pl-10 py-2 bg-[#151516]`}>
              <small>Transferable</small>
            </th>
            <th className={`pl-10 py-2 bg-[#151516] rounded-r-md`}>
              <small>Marketcap</small>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {currentData.map((item, index) => (
            <tr
              key={index}
              className={index === 0 ? null : `border-t border-t-[#151516]`}
            >
              <td className="pl-10 py-4">{item.ticker}</td>
              <td className="pl-10 py-4">{item.overall_balance}</td>
              <td className="pl-10 py-4">{item.data3}</td>
              <td className="pl-10 py-4">{item.vol_1d}</td>
              <td className="pl-10 py-4">{item.available_balance}</td>
              <td className="pl-10 py-4">{item.transferrable_balance}</td>
              <td className="pl-10 py-4">{item.marketcap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Columns;
