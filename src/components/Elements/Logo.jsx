import smalllogo from "../../assets/Logo.ico";
import biglogo from "../../assets/Calque_1.svg";

export function Logo({ isCollapsed }) {
  return (
    <div className="w-full flex justify-center items-center mb-10">
      <img
        src={isCollapsed ? smalllogo : biglogo}
        alt="Logo"
        className="w-[80%] absolute"
      />
    </div>
  );
}
