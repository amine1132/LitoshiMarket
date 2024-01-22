import logo from "#assets/Calque_1.svg";

export function Logo() {
    return(
        <div className="w-full flex justify-center items-center mb-10">
            <img src={logo} alt="Logo" className="w-[80%] absolute" />
        </div>
    )
}