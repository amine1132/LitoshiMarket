import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useNavigate,
    Outlet,
    useMatch,
  } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import Bitcoin from "#assets/BitcoinBTC.svg";
import litecoinltclogo from "#assets/LitecoinLTC.svg";
import dogecoindogelogo from "#assets/DogecoinDRC.svg";
import AlertsPage from "../../components/Explorer/AlertsPage";
import WelcomeBack from "../../components/Elements/WelcomeBack";
import axios from "axios";
import arrowright from "#assets/arrowright2.svg";
import search from "#assets/search.svg";
import scroll from "#assets/scroll.svg";



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
                {/* <div className="style"></div>
                <div className="input">
                  <div className="loupe_">
                    <img src={search} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Token, pair, address..."
                    className="formulaire_2"
                  /> */}
                  {/* <button onClick={requestAccounts}>Connect your wallet</button> */}
                  {/* <div className="notif"></div>
                </div> */}
              </div>
            </header>
            {/* <div className="scroll_contenu">
              <div className="watchlist-flexbutton flex flex-col justify-center">
                <div className="watchlist-buttontop">
                  {/* <button type="">
                    {" "}
                    <img src={scroll} alt="" />
                    Recently created
                  </button> */}
                {/* </div>
              </div> */}
              <CaseAlert SecondColor={SecondColor} notification={notification} edit={edit} trash={trash}/>
            {/* </div> */}

            <AddCaseAlert SecondColor={SecondColor}/>


          </div>
          <div className="ellipse"></div>
        </div>
      </div>
    </>
  );