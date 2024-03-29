import React, { useState, useEffect } from "react";
import { getToken } from "../ProfileDashboard";

import Activity from "../../Data/Activity.json";

import sendIcon from "../../assets/wallets/send.svg";
import receiveIcon from "../../assets/wallets/receive.svg";
import executeIcon from "../../assets/wallets/execute.svg";
import contractIcon from "../../assets/wallets/contract.svg";

export function useTransactionCount() {
    const [transactionCount, setTransactionCount] = useState(0);

    useEffect(() => {
        setTransactionCount(Activity.length);
    }, []);

    return transactionCount;
}

function ActivityColumns({ data, currentPage, itemsPerPage, backgroundColor }) {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage * itemsPerPage;
    const currentData = Activity.slice(startIdx, endIdx);

    return (
        <div className="mt-2">
            <table className="w-full">
                <tbody>
                    {currentData.map((item, index) => {
                        // Determine which icon to display based on sale_price and wallet comparison
                        let iconToShow = null;
                        let transactionType = null;

                        if (item.sale_price === null) {
                            iconToShow = contractIcon;
                            transactionType = "Inscription";
                        } else if (item.sale_price < 0) {
                            iconToShow = executeIcon;
                            transactionType = "Transfer";
                        } else {
                            if (item.from_wallet === getToken()) {
                                iconToShow = sendIcon;
                                transactionType = "Send";
                            } else if (item.to_wallet === getToken()) {
                                iconToShow = receiveIcon;
                                transactionType = "Receive";
                            }
                        }

                        return (
                            <tr key={index} className={index === 0 ? null : "transaction border-t"}>
                                <td className={"w-[150px]"} style={{ color: "rgb(107, 106, 109)" }}>
                                    <p>{item.ts}</p>
                                    <p>{item.from_wallet.substring(0, 4) + "[...]" + item.from_wallet.slice(-5)}</p>
                                </td>
                                <td className="flex text-left ml-8 g-1" style={{ color: "rgb(107, 106, 109)" }}>
                                    {iconToShow ? (
                                        <img src={iconToShow} className="h-[40px] w-[40px] mr-4" alt="" />
                                    ) : (
                                        <img src="/src/assets/notification.svg" className="h-[45px] w-[45px]" alt="" />
                                    )}

                                    <div>
                                        <p>{transactionType}</p>
                                        <p>{item.to_wallet.substring(0, 4) + "[...]" + item.from_wallet.slice(-5)}</p>
                                    </div>
                                </td>
                                <td className="py-4 text-right">{item.data3}</td>
                                <td className="py-4 text-right">
                                    <p className="inline" style={{ color: "rgb(107, 106, 109)" }}>
                                        {item.type_of_money}{" "}
                                    </p>
                                    {item.Gas}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ActivityColumns;
