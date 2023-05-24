import React from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom'
import App from './App'
import Dashboard from './dashboard/Dashboard';

function Routerv2() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
};
export default Routerv2;