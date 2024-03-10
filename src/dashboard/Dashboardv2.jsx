import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useMatch,
  BrowserRouter,
} from "react-router-dom";
import { NavbarApp } from "#components/Navbars";
import Explorer from "./Explorer/Explorer";
import Dashboard from "./Dashboard";
import Dashboardlitcoin from "./Dashboardlitecoin";
import Watchlist from "./Watchlist/Watchlist";
import Multicharts from "./Multicharts/Multicharts";
import Alerts from "./Alerts/Alerts";
import { AlertProvider } from "../components/Explorer/AlertContext";
import { RoutesLogged } from "#routes/RoutesLogged";

export default function Dashboardv2() {
  const [wallet, setWallet] = useState();
  const [blurState, setBlurState] = useState(false);
  const [searchState, setSearchState] = useState(false);

  useEffect(() => {
    // console.log("wallet");
    // console.log(wallet);
  }, [wallet]);

  return (
    <>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={<RoutesLogged wallet={wallet} setWallet={setWallet} setBlurState={setBlurState} blurState={blurState} setSearchState={setSearchState} />}
            >
              <Route path="/*" element={<Dashboard wallet={wallet} blurState={blurState} searchState={searchState} setBlurState={setBlurState} setSearchState={setSearchState}/>} />
              <Route path="/explorer" element={<Explorer setBlurState={setBlurState} blurState={blurState} searchState={searchState} setSearchState={setSearchState} />} />
              <Route path="/watchlist" element={<Watchlist setBlurState={setBlurState} blurState={blurState} searchState={searchState} setSearchState={setSearchState}/>} />
              <Route path="/multicharts" element={<Multicharts setBlurState={setBlurState} blurState={blurState} searchState={searchState} setSearchState={setSearchState} />} />
              <Route path="/alerts" element={<Alerts setBlurState={setBlurState} blurState={blurState} searchState={searchState} setSearchState={setSearchState} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </>
  );
}
