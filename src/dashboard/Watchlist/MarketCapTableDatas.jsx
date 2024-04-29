import FromatBalance from "./FormatBalance";
import Wallet from "../../Data/WalletData.json";
export default function MarketCapTableDatas({ token, index }) {
    return (
        <tr className="h-[40px]">
            <td className="iconoutline">{token.star}</td>
            {/* <td className="number_table">{token.index}</td> */}
            <td className="border_bottom">{token.tick.toUpperCase()}</td>

            <td className={token.price ? "text-white-500" : "text-gray-500"}>
                {token.price ? parseFloat(token.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 8 }) : "N/A"}
            </td>

            <td className={token.change_24h && parseFloat(token.change_24h) < 0 ? "text-red-500" : token.change_24h && parseFloat(token.change_24h) > 0 ? "text-green-500" : "text-gray-500"}>
                {token.change_24h ? (parseFloat(token.change_24h) >= 0 ? "+" : "") + parseFloat(token.change_24h).toFixed(2) + "%" : "N/A"}
            </td>

            <td className="border_bottom">{Number(token.vol_24h).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</td>

            <td className={token.marketcap ? "text-white-500" : "text-gray-500"}>
                {token.marketcap ? Number(token.marketcap).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "N/A"}
            </td>
            <td className="border_bottom">{FromatBalance(token.max_supply)}</td>
        </tr>
    );
}
