import React from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom'
import App from './App'

function Routerv2() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
        <Route path="/" element={<App/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
};
export default Routerv2;