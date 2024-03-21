import React from "react";
import { useNavigate } from "react-router-dom";

function NavButtons() {
  const navigate = useNavigate();

  const handleButtonClick = (url) => {
    const currentPath = location.pathname;

    // Vérifie si l'URL est différente de l'URL actuelle avant de naviguer
    if (url !== currentPath) {
      navigate("/" + url);
    }
  };

  return (
    <div className="flex justify-center gap-x-[5%] w-full">
      <button
        onClick={() => handleButtonClick("explorer")}
        className={`px-5 py-2 rounded-lg hover:bg-[#1E1E1F]`}
      >
        Explorer
      </button>

      <button className="px-5 py-2 rounded-lg hover:bg-[#1E1E1F]">
        Incubator
      </button>

      <button className="px-5 py-2 rounded-lg hover:bg-[#1E1E1F]">Tools</button>

      <button className="px-5 py-2 rounded-lg hover:bg-[#1E1E1F]">
        Early Stage
      </button>
    </div>
  );
}

export default NavButtons;
