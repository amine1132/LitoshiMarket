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
            <tr
              key={index}
              className={
                index === 0 ? null : `border-t border-t-[${backgroundColor}]`
              }
            >
              <td className={"text-gray-600 w-[150px]"}>
                <p>{item.ts}</p>
                <p>{item.inscription_id}</p>
              </td>
              <td className="flex text-gray-600 text-left">
                <img
                  src="/src/assets/notification.svg"
                  className="h-[45px] w-[45px]"
                />
                <div>
                  <p>{item.sale_price}</p>
                  <p>{item.to_wallet}</p>
                </div>
              </td>
              <td className="py-4 text-right">{item.data3}</td>
              <td className="py-4 text-right">
                <p className="inline text-gray-600">{item.data4} </p>
                {item.data5}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityColumns;
