function CategoryButtons({BackGroundColor, buttonActive, SecondColor, handleMarketCapButtonClick, handleMintButtonClick}) {
    return(
        <div className={``}>
            <h1 className="text-xl mb-3.5 pt-5">Top Market Cap / Cryptocurrency Prices</h1>
            <div className={`mb-4 bg-[${BackGroundColor}] flex w-[296px] rounded-lg`}>
                <div className={`m-1 rounded ${buttonActive === "Market Cap" ? `bg-[${SecondColor}]`: `hover:bg-[${SecondColor}]`}`}>
                    <button
                    type="button"
                    onClick={handleMarketCapButtonClick}
                    className={`m-1.5 mx-4 w-[110px]`}
                    >
                    Market Cap
                    </button>
                </div>
                <div className={`my-1 rounded ${buttonActive === "Mint" ? `bg-[${SecondColor}]`: `hover:bg-[${SecondColor}]`}`}>
                    <button
                    type="button"
                    onClick={handleMintButtonClick}
                    className={`m-1.5 mx-4 w-[110px]`}
                    >
                    Mint
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryButtons;