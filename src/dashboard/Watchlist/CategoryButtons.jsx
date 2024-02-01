function CategoryButtons({BackGroundColor, buttonActive, SecondColor, handleTokenButtonClick, handleNFTButtonClick}) {
    return(
        <div className={``}>
            <h1 className="2xl mb-3.5 pt-5">Watchlist</h1>
            <div className={`mb-4 bg-[${BackGroundColor}] flex w-[296px] rounded-lg`}>
                <div className={`m-1 rounded ${buttonActive === "Market Cap" ? `bg-[${SecondColor}]`: `hover:bg-[${SecondColor}]`}`}>
                    <button
                    type="button"
                    onClick={handleTokenButtonClick}
                    className={`m-1.5 mx-4 w-[110px]`}
                    >
                    Market Cap
                    </button>
                </div>
                <div className={`my-1 rounded ${buttonActive === "Mint" ? `bg-[${SecondColor}]`: `hover:bg-[${SecondColor}]`}`}>
                    <button
                    type="button"
                    onClick={handleNFTButtonClick}
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