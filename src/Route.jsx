import React from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom'
import App from './App'
import Dashboard from './dashboard/Dashboard';
import Explorer from './dashboard/Explorer/Explorer';
import Navgauche from './dashboard/navgauche';
import Dashboardv2 from './dashboard/Dashboardv2';
import Dashboardlitecoin from './dashboard/Dashboardlitecoin'

function Routerv2() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path='/dashboard' element={<Dashboardv2/>}/>
        <Route path='/explorer' element={<Explorer/>}/>
        <Route path='/dashboard/litecoin' element={<Dashboardlitecoin/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
};
export default Routerv2;