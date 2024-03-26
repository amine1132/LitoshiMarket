import Wallet from "../../Data/WalletData.json";

function formatMarketCap(value) {
    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(2) + "B";
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + "M";
    } else {
        return value.toString();
    }
}

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
                        <tr key={index} className={index === 0 ? null : `border-t border-t-[#151516]`}>
                            <td className="pl-10 py-4">{item.ticker.toUpperCase()}</td>
                            <td className={`pl-10 py-4 `}>
                                {parseFloat(item.overall_balance) > 1000000
                                    ? `${(parseFloat(item.overall_balance) / 1000000).toFixed(0)}M`
                                    : parseFloat(item.overall_balance).toLocaleString().replace(/\s/g, ",")}
                            </td>

                            <td className="pl-10 py-4">${item.min_listed_unit_price}</td>
                            <td
                                className={`pl-10 py-4 ${
                                    parseFloat(item.vol_1d) > 0
                                        ? "text-green-500"
                                        : parseFloat(item.vol_1d) < 0
                                        ? "text-red-500"
                                        : ""
                                }`}
                            >
                                {parseFloat(item.vol_1d) !== 0
                                    ? (parseFloat(item.vol_1d) / 10000).toFixed(1) + "%"
                                    : "0%"}
                            </td>

                            <td className="pl-10 py-4">
                                $
                                {parseFloat(item.available_balance) > 1000000
                                    ? `${(parseFloat(item.available_balance) / 1000000).toFixed(0)}M`
                                    : parseFloat(item.available_balance).toLocaleString().replace(/\s/g, ",")}
                            </td>
                            <td className="pl-10 py-4">${item.transferrable_balance}</td>
                            <td className="pl-10 py-4">{formatMarketCap(item.marketcap)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Columns;
