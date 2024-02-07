export default function ShareWatchListSM({SecondColor, toggleSetShowShareWatchList, handleMyBRCButtonClick}) {
    return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex z-10">
        <div className={`h-[320px] w-[720px] ml-[14%] mt-[11%] p-8 rounded-xl bg-[${SecondColor}]`}>
            <div className="flex justify-between">
                <p className="">Share my list</p>
                <button onClick={toggleSetShowShareWatchList} className={`rounded-lg`}>
                    <img src="/src/assets/cross.png" alt="" className="self-center opacity-50 w-[12px] h-[12px] mr-2"/>
                </button>
            </div>

            <div className="mt-2">
                <button className="w-full px-10 bg-[#151516] mt-2 rounded-lg h-[64px]" onClick={() => handleMyBRCButtonClick("My BRC")}>
                    <div className="flex justify-between">
                        <div className="w-[70%]">
                            <p className="text-left">My BRC</p>
                            <small><p className="text-left text-white text-opacity-50">1 pair updated 1 day ago</p></small>
                        </div>
                        <img src="/src/assets/share.png" alt="" className="self-center opacity-50 w-[26px] h-[30px]"/>
                    </div>
                </button>

                <button className="w-full px-10 bg-[#151516] mt-2 rounded-lg h-[64px]" onClick={() => handleMyBRCButtonClick("My BRC")}>
                    <div className="flex justify-between">
                        <div className="w-[70%]">
                            <p className="text-left">My BRC</p>
                            <small><p className="text-left text-white text-opacity-50">1 pair updated 1 day ago</p></small>
                        </div>
                        <img src="/src/assets/share.png" alt="" className="self-center opacity-50 w-[26px] h-[30px]"/>
                    </div>
                </button>

                <button className="w-full px-10 bg-[#151516] mt-2 rounded-lg h-[64px]" onClick={() => handleMyBRCButtonClick("My BRC")}>
                    <div className="flex justify-between">
                        <div className="w-[70%]">
                            <p className="text-left">My BRC</p>
                            <small><p className="text-left text-white text-opacity-50">1 pair updated 1 day ago</p></small>
                        </div>
                        <img src="/src/assets/share.png" alt="" className="self-center opacity-50 w-[26px] h-[30px]"/>
                    </div>
                </button>
            </div>
        </div>
    </div>
    )
}