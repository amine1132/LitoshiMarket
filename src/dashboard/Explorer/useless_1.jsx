function useless_1() {
    return(
        <div className="groupe1">
        <div className="box_1 ">
          <div className="group_v1">
            <div className="group1_">
              <p>Total</p>

              <div className="flex">

              {showMarketCapContent ? (
                <>
                  <h1 className="text-2xl">
                    Market Cap :{" "}
                    {Number(totalMarketCap).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </h1>
                </>
              ) : show24hVolContent ? (
                <div></div>
              ) : null}
              
              {/* <h1 className="text-xl">$250,000</h1> */}
              </div>

                <div className="flex pt-[2%]">
                  <button
                    type="button"
                    onClick={handleTokenButtonClick}
                    className={buttonsTailWindCssTOP}
                  >
                    Market Cap
                  </button>
                  <button
                    type="button"
                    onClick={handleTokenButtonClick}
                    className={buttonsTailWindCssTOP}
                  >
                    24h Vol
                  </button>
                  <button
                    type="button"
                    onClick={handleTokenButtonClick}
                    className={buttonsTailWindCssTOP}
                  >
                    Dominance
                  </button>
                  <button
                    type="button"
                    onClick={handleTokenButtonClick}
                    className={buttonsTailWindCssTOP}
                  >
                    Coins
                  </button>
                </div>

            </div>
            <div className="group2_">
              <div className="blur">
                <div className="argent_">$243,600</div>
                <img src={Group5333} alt="" className="graph533" />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    )
}
export default useless_1;