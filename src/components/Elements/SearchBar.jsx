export function SearchBar({isButtonActivated}){
    const SearchButtonColor = "#1E1E1E";
    const SearchBorderColor = "#404040";
    return(
        <div className={isButtonActivated ? 
            `mx-auto flex w-[90%] bg-[${SearchButtonColor}] border-[${SearchBorderColor}] p-[10px]` 
            : 
            `mx-auto flex w-[90%] bg-[${SearchButtonColor}] border-[${SearchBorderColor}] p-[10px] border rounded`}
        >
            <img src="/src/assets/search.svg" className={isButtonActivated ? "pl-[5px]" : ""} alt="" />
            {
                isButtonActivated ? 
                null
                 : 
                <input
                type="text"
                placeholder="Search"
                className="text-left pl-[5%]"
                />
            }
        </div>
    )
}