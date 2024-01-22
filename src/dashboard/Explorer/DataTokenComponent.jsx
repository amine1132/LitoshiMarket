export default function DataToken(){
    return(
        <>

          <div className="pl-[5%] mr-[5%] pr-[5%] h-[840px] bg-gradient-to-b from-[rgba(86,58,255,0.35)] via-transparent to-[rgba(128,128,128,0.0735)] rounded-lg overflow-y-auto">

          <h1 className="pt-[5%]">LITS/LITE</h1>
          <div className="border mt-[1%]"></div>


          <div className="flex justify-between mt-[3%]">
            <button className="border rounded-lg px-4 py-2">1</button>
            <button className="border rounded-lg px-4 py-2">2</button>
            <button className="border rounded-lg px-4 py-2">3</button>
            <button className="border rounded-lg px-4 py-2">4</button>
          </div>


          <div className="flex justify-between mt-[3%]">
            <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%] mr-[2%]">
              <small className="text-[#563AFF]">Price USD</small>
              <p>$xx</p>
            </div>
            <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%] ml-[2%]">
              <small className="text-[#563AFF]">Marketcap</small>
              <p>$0M</p>
            </div>
          </div>


          <div className="flex justify-between mt-[3%]">
            <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%]">
              <small className="text-[#563AFF]">5M</small>
              <p>-X%</p>
            </div>
            <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%] mx-[4%]">
              <small className="text-[#563AFF]">1H</small>
              <p>-X%</p>
            </div>
            <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%]">
              <small className="text-[#563AFF]">24H</small>
              <p>-X%</p>
            </div>
          </div>


          <div className="flex justify-between mt-[3%]">
              <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%]">
                <small className="text-[#563AFF]">Holders</small>
                <p>4500</p>
              </div>
              <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%] mx-[4%]">
                <small className="text-[#563AFF]">TXNS</small>
                <p>2.50</p>
              </div>
              <div className="border rounded-lg pl-[2%] w-full pr-[8%] py-[2%]">
                <small className="text-[#563AFF]">Volume</small>
                <p>$2.50M</p>
              </div>
          </div>


          <div className="border rounded-lg px-[5%] w-full py-[2%] mt-[3%]">
            <div className="flex justify-between">
            </div>

            <div className="flex justify-between pt-[2%]">
              <div>
                <small className="text-[#563AFF]">Buys</small>
                <p>2.50</p>
              </div>
              <div className="text-end">
                <small className="text-[#563AFF] ">SELLS</small>
                <p>2.50</p>
              </div>
            </div>
            
            <div className="flex justify-between">
            <div className="border w-[50%] py-[0.5%] border-green-500 bg-green-500"></div>
            <div className="border w-[50%] py-[0.5%] border-red-500 bg-red-500"></div>
            </div>

            <div className="flex justify-between pt-[2%]">
              <div>
                <small className="text-[#563AFF]">BUY VOL</small>
                <p>$2.50M</p>
              </div>
              <div className="text-end">  
                <small className="text-[#563AFF]">SELL VOL</small>
                <p>$2.50M</p>
              </div>
            </div>

            <div className="flex justify-between pb-[5%]">
            <div className="border w-[50%] py-[0.5%] border-green-500 bg-green-500"></div>
            <div className="border w-[50%] py-[0.5%] border-red-500 bg-red-500"></div>
            </div>
          </div>


          <div className="flex justify-between pt-[2%]">
            <div className="flex flex-col w-full items-center gap-2">
            <div className="flex w-full items-center gap-2">
              <button className="text-center border rounded-lg w-full py-[2%] mt-[1%] bg-[#2F207C]">
                Watchlist
              </button>
              <button className="text-center border rounded-lg w-full py-[2%] mt-[1%] bg-[#2F207C]">
                Alert
              </button>
            </div>
            <button className="text-center border rounded-lg w-full py-[2%] mt-[1%] bg-[#2F207C]">
              Trade on unilit
            </button>
            </div>
          </div>

          <div className="border mt-[3%]"></div>
          <div className="flex justify-between pt-[2%]">
            <p>Token created</p>
            <p>9 mounth ago</p>
          </div>
          <div className="border mt-[2%]"></div>


          <div className="flex border rounded justify-between mt-[3%]">
            <input type="text" className="mt-[1%] mb-[1%] ml-[1%] mr-[1%]" />
            <div className="border mt-[1%] mb-[1%]"></div>
            <button className="ml-[2%] mr-[3%]">$LITE</button>
          </div>

          <div className="justify-items-center mt-[3%] mb-[5%]">
          <button className="text-center w-full">Trade</button>
          </div>

        </div>
      </>
    )
}