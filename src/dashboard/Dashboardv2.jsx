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
import { RoutesLogged } from "#routes/RoutesLogged";

export default function Dashboardv2() {
  const [wallet, setWallet] = useState();

  useEffect(() => {
    console.log("wallet");
    console.log(wallet);
  }, [wallet]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={<RoutesLogged wallet={wallet} setWallet={setWallet} />}
          >
            <Route path="/" element={<Dashboard wallet={wallet} />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
