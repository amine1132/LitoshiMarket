export function SearchBar({isButtonActivated}){
    return(
        <div className="mx-auto flex w-[90%] border bg-[#2F207C] border-[#2F207C] p-[10px] rounded">
            <img src="/src/assets/search.svg" className="" alt="" />
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