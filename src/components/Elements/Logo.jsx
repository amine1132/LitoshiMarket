export function Logo({isCollapsed}) {
    return(
        <div className="w-full flex justify-center items-center mb-10">
            <img src={`${isCollapsed ? "/src/assets/Logo.ico" : "/src/assets/Calque_1.svg" }`} alt="Logo" className="w-[80%] absolute" />
        </div>
    )
}