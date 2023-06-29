import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { DashboardLayout } from "./layouts";
import Dashboardv2 from "./dashboard/Dashboardv2";
import Dashboardlitecoin from "./dashboard/Dashboardlitecoin";
import Watchlist from "./dashboard/Watchlist/Watchlist";
import Tokens from "./dashboard/Tokens/Tokens";
import Explorer from "./dashboard/Explorer/Explorer";
import Nouvellelanding from "./Nouvellelanding/Nouvellelanding";
import Nouvellelanding2 from "./Nouvellelanding/Nouvellelanding2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/nouvellelanding"
          element={
            <DashboardLayout>
              <Nouvellelanding />
            </DashboardLayout>
          }
        />
        <Route
          path="/nouvellelanding2"
          element={
            <DashboardLayout>
              <Nouvellelanding2 />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard"
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
          path="/watchlist"
          element={
            <DashboardLayout>
              <Watchlist />
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
