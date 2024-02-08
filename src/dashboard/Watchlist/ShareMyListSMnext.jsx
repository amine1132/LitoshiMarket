export default function ShareWatchListSMNext({SecondColor, toggleSetShowShareWatchList, handleMyBRCButtonClick}) {
    return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center z-10">
        <div className={`h-[320px] w-[720px] self-center p-8 rounded-xl bg-[${SecondColor}]`}>
            <div className="flex justify-between">
                <div className="flex">
                    <button onClick={() => handleMyBRCButtonClick(null)}>
                        <img src="/src/assets/back.png" alt="" className="self-center opacity-50 w-[20px] h-[20px] mr-2"/>  
                    </button>
                    <p className="">Share my list</p>
                </div>
                <button onClick={toggleSetShowShareWatchList} className={`rounded-lg`}>
                    <img src="/src/assets/cross.png" alt="" className="self-center opacity-50 w-[12px] h-[12px] mr-2"/>
                </button>
            </div>

            <div className="mt-2">
                <button className="w-full px-10 bg-[#151516] mt-2 rounded-lg h-[64px]">
                    <div className="flex justify-between">
                        <div className="w-[70%] self-center">
                            <p className="text-left">Twitter</p>
                        </div>
                        <img src="/src/assets/share.png" alt="" className="self-center opacity-50 w-[26px] h-[30px]"/>
                    </div>
                </button>

                <button className="w-full px-10 bg-[#151516] mt-2 rounded-lg h-[64px]">
                    <div className="flex justify-between">
                        <div className="w-[70%] self-center">
                            <p className="text-left">Telegram</p>
                        </div>
                        <img src="/src/assets/share.png" alt="" className="self-center opacity-50 w-[26px] h-[30px]"/>
                    </div>
                </button>

                <button className="w-full px-10 bg-[#151516] mt-2 rounded-lg h-[64px]">
                    <div className="flex justify-between">
                        <div className="w-[70%] self-center">
                            <p className="text-left">Whatsapp</p>
                        </div>
                        <img src="/src/assets/share.png" alt="" className="self-center opacity-50 w-[26px] h-[30px]"/>
                    </div>
                </button>
            </div>
        </div>
    </div>
    )
}