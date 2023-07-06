import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useMatch,
} from "react-router-dom";
import { NavbarApp } from "#components/Navbars";
import Explorer from "./Explorer/Explorer";
import Dashboard from "./Dashboard";
import Dashboardlitcoin from "./Dashboardlitecoin";
import Watchlist from "./Watchlist/Watchlist";
import { RoutesLogged } from "#routes/RoutesLogged";

export default function Dashboardv2() {
  return (
    <>
      <div className="w-screen h-screen">
        <Routes>
          <Route element={<RoutesLogged />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/explorer2" element={<Explorer />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
