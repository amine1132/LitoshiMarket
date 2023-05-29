import React from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom'
import App from './App'
import Dashboard from './dashboard/Dashboard';
import Explorer from './dashboard/Explorer/Explorer';

function Routerv2() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/Explorer' element={<Explorer/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
};
export default Routerv2;