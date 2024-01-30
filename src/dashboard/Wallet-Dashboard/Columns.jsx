function Columns({ data, currentPage, itemsPerPage, backgroundColor }) {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage * itemsPerPage;
    const currentData = data.slice(startIdx, endIdx);
  
    return (
      <div className="mt-4">
        <table className="w-full">
          <thead className={``}>
            <tr className="text-left">
              <th className={`pl-10 py-2 bg-[${backgroundColor}] rounded-l-md`}><small>Colonne 1</small></th>
              <th className={`pl-10 py-2 bg-[${backgroundColor}]`}><small>Colonne 2</small></th>
              <th className={`pl-10 py-2 bg-[${backgroundColor}]`}><small>Colonne 3</small></th>
              <th className={`pl-10 py-2 bg-[${backgroundColor}]`}><small>Colonne 4</small></th>
              <th className={`pl-10 py-2 bg-[${backgroundColor}]`}><small>Colonne 5</small></th>
              <th className={`pl-10 py-2 bg-[${backgroundColor}]`}><small>Colonne 6</small></th>
              <th className={`pl-10 py-2 bg-[${backgroundColor}] rounded-r-md`}><small>Colonne 7</small></th>
            </tr>
          </thead>
          <tbody className="">
            {currentData.map((item, index) => (
              <tr key={index} className={index === 0 ? null : `border-t border-t-[${backgroundColor}]`}>
                <td className="pl-10 py-4">{item.data1}</td>
                <td className="pl-10 py-4">{item.data2}</td>
                <td className="pl-10 py-4">{item.data3}</td>
                <td className="pl-10 py-4">{item.data4}</td>
                <td className="pl-10 py-4">{item.data5}</td>
                <td className="pl-10 py-4">{item.data6}</td>
                <td className="pl-10 py-4">{item.data7}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default Columns;