function TopButtons({ BackGroundColor, SecondColor, additem, addwatch, arrowright, notification, Share, toggleSetShowShareWatchList, toggleSetShowManageList, toggleSetShowShareWatchListSM}) {
    return(
        <div className={`w-full rounded-lg bg-[${SecondColor}] mb-8`}>
            <div className={`flex justify-between`}>
            <button type="" className={`m-1.5 flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}>
                <p className="ml-2 my-2">My BRC</p>
                <img className="mr-2 my-2" src={arrowright} alt=""/>
            </button>
            <button type="" className={`flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}>
                <p className="ml-2 my-2">New Watchlist</p>
                <img className="mr-2 my-2" src={addwatch} alt="" />
            </button>
            <button type="" className={`m-1.5 flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}>
                <p className="ml-2 my-2">Add pair</p>
                <img className="mr-2 my-2" src={additem} alt="" />
            </button>
            <button type="" onClick={toggleSetShowManageList} className={`flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}>
                <p className="ml-2 my-2">Add an alert</p>
                <img className="mr-2 my-2" src={notification} alt="" />
            </button>
            <button type="" onClick={toggleSetShowShareWatchList} className={`m-1.5 flex self-center justify-between rounded-lg w-full bg-[${BackGroundColor}]`}>
                <p className="ml-2 my-2">Share this watchlist</p>
                <img className="mr-2 my-2" src={Share} alt="" />
            </button>
            </div>
        </div>
    )
}

export default TopButtons;