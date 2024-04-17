import twitter from "../assets/dashboard/Twitter.svg";
import globe from "../assets/dashboard/globe.svg";
import location from "../assets/dashboard/location.svg";
import defaultavatar from "../assets/default-avatar.png";
import colorpencil from "../assets/color-pencil.png";
import copy from "../assets/copy.png";

export function getToken() {
  const tokenElement = document.getElementById("adress");
  if (tokenElement) {
    return tokenElement.textContent;
  } else {
    return null; // Retourne null si l'élément n'est pas trouvé
  }
}

function ProfileDashBoard({ isBiggerButtonClicked }) {
  const Copied = () => {
    let copyText = document.querySelector("#adress");
    let range = document.createRange();
    range.selectNode(copyText);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
      let successful = document.execCommand("copy");
      if (successful) {
        // Affichage de la fenêtre d'alerte personnalisée
        document.querySelector(".custom-alert").style.display = "block";
        // Masquage de la fenêtre d'alerte après quelques secondes
        setTimeout(() => {
          document.querySelector(".custom-alert").style.display = "none";
        }, 2500);
      }
    } catch (err) {
      console.error("Erreur lors de la copie", err);
    } finally {
      window.getSelection().removeAllRanges();
    }
  };

  return (
    <div
      className={`mr-10 p-10 w-[45%] h-[300px] justify-center rounded-3xl bg-[#1E1E1F] ${
        isBiggerButtonClicked ? "hidden" : ""
      }`}
    >
      <div className={`flex`}>
        <img src={defaultavatar} className="rounded-full h-[100px]" alt="" />
        <div className="pl-5 self-center">
          <h1 className="pb-2 text-2xl flex">
            Yaugourt
            <img src={colorpencil} className="pl-3 pt-2 h-[30px]" alt="" />
          </h1>
          <p className="pl-1 mb-10 flex items-center">
            <small id="adress">
              bc1par0t76nmjf55wp0rpzu58p97mzz6tf3cd67js077a2qx5ez8knlqfnccjq
            </small>
            <img
              src={copy}
              className="pl-2 pb-1 h-[24px] cursor-pointer opacity-50"
              alt=""
              onClick={Copied}
            />
          </p>
        </div>
      </div>
      <div className="pt-[2%] h-[80px] text-sm overflow-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="flex pt-5 justify-between gap-x-[5%] w-full">
        <button
          className={`w-[220px] py-2 rounded-lg bg-[#151516] flex justify-center items-center gap-3`}
        >
          <img src={twitter} alt="" />
          Twitter
        </button>

        <button
          className={`w-[220px] py-2 rounded-lg bg-[#151516] flex justify-center items-center  gap-3`}
        >
          {" "}
          <img src={globe} alt="" /> Website
        </button>

        <button
          className={`w-[220px] py-2 rounded-lg bg-[#151516] flex justify-center items-center gap-3`}
        >
          {" "}
          <img src={location} alt="" /> Add Location
        </button>
      </div>
    </div>
  );
}
export default ProfileDashBoard;
