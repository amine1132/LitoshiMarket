function TickComponent3({ tokenData }) {
    return (
      <>
        <tr>
          <td className="border_bottom">
            <span>bc1pq4es...4skewgrv</span>
          </td>
          <td className="border_bottom">25 May 2023 22:38:40</td>
          <td className="border_bottom">
            {tokenData.price ? (
              <>
                <span className="green">+1 HOGS</span>
                <span className="green"> ($</span>
                <span className="green"> {formatPrice(tokenData.price)}) </span>
              </>
            ) : (
              <>
                <div className="nfttable">
                  <img src={NFT} alt="" />
                  <p className="green"> +1 Orbiter Trainee Pilot NFT</p>
                  <div className="enlarged-image">
                    <img src={NFT} alt="" />
                  </div>
                </div>
              </>
            )}
          </td>
          <td className="border_bottom">bc1pq4es...4skewgrv </td>
          <td className="border_bottom">bc1pq4es...4skewgrv </td>
        </tr>
      </>
    );
  }
  
  export default Dashboard;
  