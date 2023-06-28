import React from "react";
import "./Nouvellelanding.css";
import stars from "./Stars.svg";
import Background from "./Background.svg";
import Planet from "./Planet.svg";

export default function Nouvellelanding() {
  return (
    <>
      <div className="nouvellemax">
        <img src={stars} alt="" className="stars" />
        <div className="nouvelleflex">
          <div className="ellipseglobal">
            <div className="ellipse"></div>
            <div className="ellipse2"></div>
          </div>
          <img src={Planet} alt="" className="planet" />
        </div>
        <div className="nouvelle_landing_content">
          <div>
            <h1>Proof of Participation</h1>
            <p>
              Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis.
            </p>
          </div>
          <button type="button">Tweet Now</button>
        </div>
        <div className="nouvellelanding_footer">
          <p>Find us on</p>
          <div>
            <button type="button"></button>
            <button type="button"></button>
            <button type="button"></button>
            <button type="button"></button>
            <button type="button"></button>
          </div>
        </div>
      </div>
    </>
  );
}
