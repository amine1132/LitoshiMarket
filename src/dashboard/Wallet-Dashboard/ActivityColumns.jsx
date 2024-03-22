import Activity from "../../Data/Activity.json";

function ActivityColumns({ data, currentPage, itemsPerPage, backgroundColor }) {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage * itemsPerPage;
    const currentData = Activity.slice(startIdx, endIdx);

    return (
        <div className="mt-2">
            <table className="w-full">
                <tbody className="">
                    {currentData.map((item, index) => (
                        <tr key={index} className={index === 0 ? null : "border-t"}>
                            <td className={"w-[150px]"} style={{ color: "rgb(107, 106, 109)" }}>
                                <p>{item.ts}</p>
                                <p>{item.from_wallet}</p>
                            </td>
                            <td className="flex text-left ml-4" style={{ color: "rgb(107, 106, 109)" }}>
                                <img src="/src/assets/notification.svg" className="h-[45px] w-[45px]" />
                                <div>
                                    <p>{item.sale_price}</p>
                                    <p>{item.to_wallet}</p>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ActivityColumns;
