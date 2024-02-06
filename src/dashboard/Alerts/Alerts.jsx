import React, { useEffect, useState } from "react";
import trash from "#assets/trushsquare.svg";
import edit from "#assets/edit.svg";
import notification from "#assets/notificationgreen.svg";
import "./Alerts.css";
import NavButtons from "../../components/Navbars/NavButtons";
import CaseAlert from "./CaseAlert";
import AddCaseAlert from "./AddCaseAlert";

export default function Alerts({ wallet }) {
  const [isOver1000Px, setIsOver1000Px] = useState(true);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth > 1000) {
      setIsOver1000Px(true);
    } else {
      setIsOver1000Px(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const SecondColor = "#1E1E1F";
  const BackGroundColor = "#151516";

  return (
    <>
      <div className="max_1">
        <div className="px-[30px]">
          <div className="idk_1">
            <header>
              <div className="top">
                <div className="style">
                  <div className="stylev2">
                    <NavButtons SecondColor={SecondColor}/>
                  </div>
                </div>
              </div>
            </header>
            <CaseAlert SecondColor={SecondColor} notification={notification} edit={edit} trash={trash}/>
            <AddCaseAlert SecondColor={SecondColor}/>
          </div>
          <div className="ellipse"></div>
        </div>
      </div>
    </>
  );
}
