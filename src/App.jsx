import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesLogged } from "#routes/RoutesLogged";
import { DashboardLayout } from "./layouts";
import Dashboardv2 from "./dashboard/Dashboardv2";
import Dashboardlitecoin from "./dashboard/Dashboardlitecoin";
import Watchlist from "./dashboard/Watchlist/Watchlist";
import Tokens from "./dashboard/Tokens/Tokens";
import Explorer from "./dashboard/Explorer/Explorer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboardv2 />
            </DashboardLayout>
          }
        />
        <Route
          path="/explorer"
          element={
            <DashboardLayout>
              <Explorer />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/litecoin"
          element={
            <DashboardLayout>
              <Dashboardlitecoin />
            </DashboardLayout>
          }
        />
        <Route
          path="/tokens"
          element={
            <DashboardLayout>
              <Tokens />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
